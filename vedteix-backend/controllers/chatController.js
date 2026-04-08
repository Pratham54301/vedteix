const ChatConversation = require('../models/ChatConversation');
const Lead = require('../models/Lead');
const {
  isNonEmptyString,
  isValidEmail,
  normalizeString,
} = require('../utils/validation');

async function generateAiReply({ conversation, message, visitor }) {
  if (!process.env.GEMINI_API_KEY) {
    const baseReply =
      'Thanks for reaching out. I can help you with services, timelines, pricing, and project planning. ';
    const missingFields = [];
    if (!visitor.name) missingFields.push('your name');
    if (!visitor.email) missingFields.push('your email');
    if (!visitor.requirement) missingFields.push('your project requirement');

    return `${baseReply}${
      missingFields.length > 0
        ? `To continue, please share ${missingFields.join(', ')}.`
        : 'Our team will review your details and follow up shortly.'
    }`;
  }

  const transcript = conversation.messages
    .slice(-8)
    .map((item) => `${item.role.toUpperCase()}: ${item.content}`)
    .join('\n');

  const prompt = [
    'You are the AI sales and support assistant for Vedteix Technology.',
    'Answer clearly, concisely, and helpfully.',
    'If the visitor has not provided their name, email, or project requirement yet, politely ask for the missing information.',
    'If the visitor asks about services, explain that Vedteix delivers web, mobile, SaaS, AI, and product engineering services.',
    'Keep the tone professional and conversion-focused.',
    visitor.name ? `Visitor name: ${visitor.name}` : 'Visitor name: missing',
    visitor.email ? `Visitor email: ${visitor.email}` : 'Visitor email: missing',
    visitor.requirement ? `Visitor requirement: ${visitor.requirement}` : 'Visitor requirement: missing',
    transcript ? `Conversation history:\n${transcript}` : '',
    `Latest user message: ${message}`,
  ]
    .filter(Boolean)
    .join('\n\n');

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [{ text: prompt }],
          },
        ],
      }),
    }
  );

  const payload = await response.json().catch(() => ({}));
  const generatedText =
    payload?.candidates?.[0]?.content?.parts?.map((part) => part.text).join(' ').trim() || '';

  if (!response.ok || !generatedText) {
    throw new Error(payload?.error?.message || 'Failed to generate chatbot response');
  }

  return generatedText;
}

exports.sendChatMessage = async (req, res) => {
  try {
    const { conversationId, message, name, email, requirement } = req.body || {};

    if (!isNonEmptyString(message, { min: 1, max: 4000 })) {
      return res.status(400).json({ error: 'Please enter a valid message' });
    }

    const visitor = {
      name: normalizeString(name, { max: 120 }),
      email: normalizeString(email, { max: 254 }).toLowerCase(),
      requirement: normalizeString(requirement, { max: 4000 }),
    };

    if (visitor.email && !isValidEmail(visitor.email)) {
      return res.status(400).json({ error: 'Please provide a valid email address' });
    }

    let conversation = conversationId
      ? await ChatConversation.findById(conversationId)
      : null;

    if (!conversation) {
      conversation = await ChatConversation.create({
        visitor,
        messages: [],
      });
    }

    conversation.visitor = {
      name: visitor.name || conversation.visitor?.name || '',
      email: visitor.email || conversation.visitor?.email || '',
      requirement: visitor.requirement || conversation.visitor?.requirement || '',
    };

    conversation.messages.push({
      role: 'user',
      content: normalizeString(message, { max: 4000 }),
    });

    const reply = await generateAiReply({
      conversation,
      message: normalizeString(message, { max: 4000 }),
      visitor: conversation.visitor,
    });

    conversation.messages.push({
      role: 'assistant',
      content: normalizeString(reply, { max: 4000 }),
    });

    const hasQualifiedLead =
      conversation.visitor?.name &&
      conversation.visitor?.email &&
      conversation.visitor?.requirement;

    if (hasQualifiedLead) {
      let lead = conversation.lead
        ? await Lead.findById(conversation.lead)
        : await Lead.findOne({
            email: conversation.visitor.email,
            source: 'chatbot',
          }).sort({ createdAt: -1 });

      if (!lead) {
        lead = await Lead.create({
          name: conversation.visitor.name,
          email: conversation.visitor.email,
          phone: '',
          message: conversation.visitor.requirement,
          status: 'new',
          notes: 'Captured from AI chatbot',
          source: 'chatbot',
        });
      } else {
        lead.name = conversation.visitor.name;
        lead.message = conversation.visitor.requirement;
        if (!lead.notes) {
          lead.notes = 'Captured from AI chatbot';
        }
        await lead.save();
      }

      conversation.lead = lead._id;
      conversation.status = 'qualified';
    }

    await conversation.save();
    await conversation.populate('lead');

    res.json({
      conversationId: conversation._id,
      reply,
      conversation,
      leadCaptured: Boolean(conversation.lead),
    });
  } catch (error) {
    console.error('Failed to process chat message:', error);
    res.status(500).json({ error: error.message || 'Failed to process chat message' });
  }
};

exports.getAllConversations = async (_req, res) => {
  try {
    const conversations = await ChatConversation.find()
      .populate('lead')
      .sort({ updatedAt: -1 });
    res.json(conversations);
  } catch (error) {
    console.error('Failed to load chat conversations:', error);
    res.status(500).json({ error: 'Failed to load chat conversations' });
  }
};
