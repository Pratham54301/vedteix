const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  liveUrl: {
    type: String,
    trim: true,
    default: '',
  },
  githubUrl: {
    type: String,
    trim: true,
    default: '',
  },
  imageUrl: {
    type: String,
    trim: true,
    default: '',
  },
  slug: {
    type: String,
    unique: true,
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

portfolioSchema.pre('save', function saveSlug(next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }
  next();
});

module.exports = mongoose.model('Portfolio', portfolioSchema);
