const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    date: { type: String, required: true, trim: true },
    time: { type: String, required: true, trim: true },
    meetingLink: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Appointment', appointmentSchema);
