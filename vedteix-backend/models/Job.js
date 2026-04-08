const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  company: {
    type: String,
    trim: true,
    default: 'VEDTEIX TECHNOLOGY',
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    required: true,
    trim: true,
  },
  experience: {
    type: String,
    trim: true,
    default: 'Not specified',
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  applyUrl: {
    type: String,
    trim: true,
    default: '',
  },
  applyEmail: {
    type: String,
    trim: true,
    default: '',
  },
  skills: {
    type: [String],
    default: [],
  },
  techStack: {
    type: [String],
    default: [],
  },
  featured: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Job', jobSchema);
