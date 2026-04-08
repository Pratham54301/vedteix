const mongoose = require('mongoose');

const jobApplicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  resumeUrl: { type: String },
  message: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('JobApplication', jobApplicationSchema); 