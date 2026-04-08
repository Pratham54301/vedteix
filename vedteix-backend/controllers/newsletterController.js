const Newsletter = require('../models/Newsletter');
const { isValidEmail, normalizeString } = require('../utils/validation');

exports.createSubscription = async (req, res) => {
  try {
    const { email } = req.body || {};

    if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'Please provide a valid email address' });
    }

    const normalizedEmail = normalizeString(email, { max: 254 }).toLowerCase();
    const exists = await Newsletter.findOne({ email: normalizedEmail });
    if (exists) {
      return res.status(400).json({ error: 'Email already subscribed' });
    }

    const subscription = await Newsletter.create({ email: normalizedEmail });
    res.status(201).json({ message: 'Subscribed successfully', subscription });
  } catch (error) {
    console.error('Failed to create subscription:', error);
    res.status(500).json({ error: 'Failed to subscribe to the newsletter' });
  }
};

exports.getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Newsletter.find().sort({ createdAt: -1 });
    res.json(subscriptions);
  } catch (error) {
    console.error('Failed to load subscriptions:', error);
    res.status(500).json({ error: 'Failed to load subscriptions' });
  }
};

exports.deleteSubscription = async (req, res) => {
  try {
    const subscription = await Newsletter.findByIdAndDelete(req.params.id);
    if (!subscription) {
      return res.status(404).json({ error: 'Subscription not found' });
    }

    res.json({ message: 'Subscription deleted' });
  } catch (error) {
    console.error('Failed to delete subscription:', error);
    res.status(500).json({ error: 'Failed to delete subscription' });
  }
};
