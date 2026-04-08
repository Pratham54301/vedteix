const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  iconName: {
    type: String,
    trim: true,
    default: 'Code',
  },
  imageUrl: {
    type: String,
    trim: true,
    default: '',
  },
  featured: {
    type: Boolean,
    default: false,
  },
  sortOrder: {
    type: Number,
    default: 0,
  },
  serviceSlug: { type: String, unique: true },
}, {
  timestamps: true,
});

serviceSchema.pre('save', function createServiceSlug(next) {
  if (this.isModified('title')) {
    this.serviceSlug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }
  next();
});

module.exports = mongoose.model('Service', serviceSchema);
