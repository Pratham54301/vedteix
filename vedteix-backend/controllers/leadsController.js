const Lead = require('../models/Lead');
const {
  isNonEmptyString,
  isValidEmail,
  isValidPhone,
  normalizeString,
} = require('../utils/validation');

exports.createLead = async (req, res) => {
  try {
    const { name, email, phone, message, source } = req.body || {};

    if (!isNonEmptyString(name, { min: 2, max: 120 })) {
      return res.status(400).json({ error: 'Please provide your name' });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'Please provide a valid email address' });
    }

    if (phone && !isValidPhone(phone)) {
      return res.status(400).json({ error: 'Please provide a valid phone number' });
    }

    if (!isNonEmptyString(message, { min: 10, max: 5000 })) {
      return res.status(400).json({ error: 'Please enter a message with at least 10 characters' });
    }

    const lead = await Lead.create({
      name: normalizeString(name, { max: 120 }),
      email: normalizeString(email, { max: 254 }).toLowerCase(),
      phone: normalizeString(phone, { max: 40 }),
      message: normalizeString(message, { max: 5000 }),
      source: ['contact_form', 'chatbot', 'manual'].includes(source) ? source : 'contact_form',
    });

    res.status(201).json({
      message: 'Lead captured successfully',
      lead,
    });
  } catch (error) {
    console.error('Failed to create lead:', error);
    res.status(500).json({ error: 'Failed to create lead' });
  }
};

exports.getAllLeads = async (req, res) => {
  try {
    const { status } = req.query || {};
    const query = {};
    if (typeof status === 'string' && ['new', 'contacted', 'closed'].includes(status)) {
      query.status = status;
    }

    const leads = await Lead.find(query).sort({ createdAt: -1 });
    res.json(leads);
  } catch (error) {
    console.error('Failed to load leads:', error);
    res.status(500).json({ error: 'Failed to load leads' });
  }
};

exports.updateLead = async (req, res) => {
  try {
    const { status, notes } = req.body || {};
    const updates = {};

    if (typeof status !== 'undefined') {
      if (!['new', 'contacted', 'closed'].includes(status)) {
        return res.status(400).json({ error: 'Invalid lead status' });
      }
      updates.status = status;
    }

    if (typeof notes !== 'undefined') {
      updates.notes = normalizeString(notes, { max: 4000 });
    }

    const lead = await Lead.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    res.json(lead);
  } catch (error) {
    console.error('Failed to update lead:', error);
    res.status(500).json({ error: 'Failed to update lead' });
  }
};
