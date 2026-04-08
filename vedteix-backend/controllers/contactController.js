const Contact = require('../models/Contact');
const {
  isNonEmptyString,
  isValidEmail,
  normalizeString,
} = require('../utils/validation');

exports.createContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body || {};

    if (!isNonEmptyString(name, { min: 2, max: 120 })) {
      return res.status(400).json({ error: 'Please provide your name' });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'Please provide a valid email address' });
    }

    if (!isNonEmptyString(message, { min: 10, max: 5000 })) {
      return res.status(400).json({ error: 'Please enter a message with at least 10 characters' });
    }

    const contact = await Contact.create({
      name: normalizeString(name, { max: 120 }),
      email: normalizeString(email, { max: 254 }).toLowerCase(),
      subject: normalizeString(subject, { max: 160, fallback: 'General Inquiry' }) || 'General Inquiry',
      message: normalizeString(message, { max: 5000 }),
    });

    res.status(201).json({ message: 'Message sent successfully', contact });
  } catch (error) {
    console.error('Failed to create contact:', error);
    res.status(500).json({ error: 'Failed to submit your message' });
  }
};

exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    console.error('Failed to load contacts:', error);
    res.status(500).json({ error: 'Failed to load contacts' });
  }
};

exports.getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.json(contact);
  } catch (error) {
    console.error('Failed to load contact:', error);
    res.status(500).json({ error: 'Failed to load contact' });
  }
};

exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.json({ message: 'Contact deleted' });
  } catch (error) {
    console.error('Failed to delete contact:', error);
    res.status(500).json({ error: 'Failed to delete contact' });
  }
};
