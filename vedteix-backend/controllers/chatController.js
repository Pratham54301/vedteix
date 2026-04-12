const ChatConversation = require('../models/ChatConversation');
const ChatExchange = require('../models/ChatExchange');
const Lead = require('../models/Lead');
const {
  isNonEmptyString,
  isValidEmail,
  normalizeString,
} = require('../utils/validation');

const FOOTER_BY_LANG = {
  en: '\n\nThank you for your message. If you need further assistance, call or message on +91 77779 67668. We will help you. Thanks again.',
  hi: '\n\nआपके संदेश के लिए धन्यवाद। यदि आपको और सहायता चाहिए, तो +91 77779 67668 पर कॉल या मैसेज करें। हम मदद करेंगे। पुनः धन्यवाद।',
  gu: '\n\nતમારા સંદેશ બદલ આભાર. વધુ મદદ માટે +91 77779 67668 પર કૉલ અથવા મેસેજ કરો. અમે મદદ કરીશું. ફરીથી આભાર.',
};

function normalizeLanguage(raw) {
  const code = String(raw || 'en')
    .toLowerCase()
    .split(/[-_]/)[0];
  if (code === 'hi' || code === 'gu') {
    return code;
  }
  return 'en';
}

function languageDirective(lang) {
  if (lang === 'hi') {
    return 'You must write your entire reply in Hindi (Devanagari script where appropriate).';
  }
  if (lang === 'gu') {
    return 'You must write your entire reply in Gujarati.';
  }
  return 'You must write your entire reply in English.';
}

function buildFallbackCore(visitor, lang) {
  const base =
    lang === 'hi'
      ? 'हम सेवाओं, समयसीमा और योजना में मदद कर सकते हैं। '
      : lang === 'gu'
        ? 'અમે સેવાઓ, સમયરેખા અને યોજનામાં મદદ કરી શકીએ છીએ. '
        : 'I can help with services, timelines, and project planning. ';
  const missing = [];
  if (!visitor.name) {
    missing.push(lang === 'hi' ? 'अपना नाम' : lang === 'gu' ? 'તમારું નામ' : 'your name');
  }
  if (!visitor.email) {
    missing.push(lang === 'hi' ? 'ईमेल' : lang === 'gu' ? 'ઇમેઇલ' : 'your email');
  }
  if (!visitor.requirement) {
    missing.push(
      lang === 'hi'
        ? 'परियोजना आवश्यकता'
        : lang === 'gu'
          ? 'પ્રોજેક્ટ જરૂરિયાત'
          : 'your project requirement'
    );
  }
  if (missing.length > 0) {
    const prefix =
      lang === 'hi'
        ? 'कृपया साझा करें: '
        : lang === 'gu'
          ? 'કૃપા કરીને શેર કરો: '
          : 'Please share ';
    return `${base}${prefix}${missing.join(', ')}.`;
  }
  return `${base}${
    lang === 'hi'
      ? 'हमारी टीम जल्द संपर्क करेगी।'
      : lang === 'gu'
        ? 'અમારી ટીમ ટૂંક સમયમાં સંપર્ક કરશે.'
        : 'Our team will follow up shortly.'
  }`;
}

function appendFooter(text, lang) {
  const footer = FOOTER_BY_LANG[lang] || FOOTER_BY_LANG.en;
  const trimmed = normalizeString(text, { max: 8000 });
  if (trimmed.includes('+91 77779 67668')) {
    return trimmed;
  }
  return `${trimmed}${footer}`;
}

async function generateGeminiReply({ conversation, visitor, language }) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return appendFooter(buildFallbackCore(visitor, language), language);
  }

  const model = process.env.GEMINI_MODEL || 'gemini-2.0-flash';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
    model
  )}:generateContent?key=${encodeURIComponent(apiKey)}`;

  const systemText = [
    'You are the professional business assistant for Vedteix Technology.',
    languageDirective(language),
    'Answer helpfully and concisely. Vedteix offers web, mobile, SaaS, AI, and product engineering.',
    'If name, email, or project requirement is missing, politely ask for what is still needed.',
    'Do not invent fixed pricing; offer to connect the visitor with the team for quotes.',
    'Do not mention API keys or internal systems.',
    visitor.name ? `Visitor name: ${visitor.name}` : 'Visitor name: unknown',
    visitor.email ? `Visitor email: ${visitor.email}` : 'Visitor email: unknown',
    visitor.requirement
      ? `Stated requirement: ${visitor.requirement}`
      : 'Project requirement: not yet provided',
  ].join('\n');

  const contents = conversation.messages.map((m) => ({
    role: m.role === 'user' ? 'user' : 'model',
    parts: [{ text: m.content }],
  }));

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: systemText }] },
      contents,
      generationConfig: {
        temperature: 0.55,
        maxOutputTokens: 1024,
      },
    }),
  });

  const payload = await response.json().catch(() => ({}));
  const generatedText =
    payload?.candidates?.[0]?.content?.parts?.map((p) => p.text).join('').trim() || '';

  if (!response.ok || !generatedText) {
    const errMsg = payload?.error?.message || 'Failed to generate Gemini response';
    throw new Error(errMsg);
  }

  return appendFooter(normalizeString(generatedText, { max: 6000 }), language);
}

exports.sendChatMessage = async (req, res) => {
  try {
    const { conversationId, message, name, email, requirement, language: langRaw } = req.body || {};
    const language = normalizeLanguage(langRaw);

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

    let conversation = conversationId ? await ChatConversation.findById(conversationId) : null;

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

    const userContent = normalizeString(message, { max: 4000 });

    conversation.messages.push({
      role: 'user',
      content: userContent,
    });

    let reply;
    try {
      reply = await generateGeminiReply({
        conversation,
        visitor: conversation.visitor,
        language,
      });
    } catch (aiError) {
      console.error('Gemini chat error:', aiError);
      reply = appendFooter(buildFallbackCore(conversation.visitor, language), language);
    }

    conversation.messages.push({
      role: 'assistant',
      content: normalizeString(reply, { max: 8000 }),
    });

    await ChatExchange.create({
      conversationId: conversation._id,
      userMessage: userContent,
      aiResponse: normalizeString(reply, { max: 8000 }),
      name: conversation.visitor.name || '',
      email: conversation.visitor.email || '',
      language,
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
          notes: 'Captured from AI chatbot (Gemini)',
          source: 'chatbot',
        });
      } else {
        lead.name = conversation.visitor.name;
        lead.message = conversation.visitor.requirement;
        if (!lead.notes) {
          lead.notes = 'Captured from AI chatbot (Gemini)';
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

exports.getChatExchanges = async (_req, res) => {
  try {
    const rows = await ChatExchange.find().sort({ createdAt: -1 }).limit(300).lean();
    res.json(rows);
  } catch (error) {
    console.error('Failed to load chat exchanges:', error);
    res.status(500).json({ error: 'Failed to load chat exchanges' });
  }
};
