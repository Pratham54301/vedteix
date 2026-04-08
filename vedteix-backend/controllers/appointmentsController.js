const Appointment = require('../models/Appointment');
const {
  isNonEmptyString,
  isValidEmail,
  normalizeString,
} = require('../utils/validation');

function buildMeetingLink() {
  const token = Math.random().toString(36).slice(2, 10);
  return `https://meet.vedteix.com/${token}`;
}

exports.createAppointment = async (req, res) => {
  try {
    const { name, email, date, time } = req.body || {};

    if (!isNonEmptyString(name, { min: 2, max: 120 })) {
      return res.status(400).json({ error: 'Please provide your name' });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'Please provide a valid email address' });
    }

    if (!isNonEmptyString(date, { min: 8, max: 32 })) {
      return res.status(400).json({ error: 'Please choose a date' });
    }

    if (!isNonEmptyString(time, { min: 3, max: 32 })) {
      return res.status(400).json({ error: 'Please choose a time' });
    }

    const appointment = await Appointment.create({
      name: normalizeString(name, { max: 120 }),
      email: normalizeString(email, { max: 254 }).toLowerCase(),
      date: normalizeString(date, { max: 32 }),
      time: normalizeString(time, { max: 32 }),
      meetingLink: buildMeetingLink(),
    });

    res.status(201).json({
      message: 'Appointment booked successfully',
      appointment,
    });
  } catch (error) {
    console.error('Failed to create appointment:', error);
    res.status(500).json({ error: 'Failed to create appointment' });
  }
};

exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    res.json(appointments);
  } catch (error) {
    console.error('Failed to load appointments:', error);
    res.status(500).json({ error: 'Failed to load appointments' });
  }
};
