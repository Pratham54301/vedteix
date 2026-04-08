const mongoose = require('mongoose');

const siteSettingsSchema = new mongoose.Schema({
  companyName: {
    type: String,
    trim: true,
    default: 'VEDTEIX TECHNOLOGY',
  },
  companyTagline: {
    type: String,
    trim: true,
    default: 'Innovating Future-Ready Digital Solutions.',
  },
  heroTitle: {
    type: String,
    trim: true,
    default: 'Empowering Future-Ready Digital Solutions',
  },
  heroSubtitle: {
    type: String,
    trim: true,
    default: 'We architect and engineer high-impact digital products, delivering secure, scalable, and intelligent solutions that propel businesses into the future.',
  },
  officeName: {
    type: String,
    trim: true,
    default: 'Headquarters',
  },
  contactEmail: {
    type: String,
    trim: true,
    default: 'hello@vedteix.com',
  },
  contactPhone: {
    type: String,
    trim: true,
    default: '+91 77779 67668',
  },
  address: {
    type: String,
    trim: true,
    default: 'Bopal Ghuma Road, Sanidhya, Ahmedabad, Gujarat 380058',
  },
  websiteUrl: {
    type: String,
    trim: true,
    default: '',
  },
  gstNumber: {
    type: String,
    trim: true,
    default: '',
  },
  invoiceLogoUrl: {
    type: String,
    trim: true,
    default: '',
  },
  signatureUrl: {
    type: String,
    trim: true,
    default: '',
  },
  socialLinks: {
    linkedin: { type: String, trim: true, default: '' },
    twitter: { type: String, trim: true, default: '' },
    facebook: { type: String, trim: true, default: '' },
    instagram: { type: String, trim: true, default: '' },
    youtube: { type: String, trim: true, default: '' },
  },
  stats: {
    projectsCompleted: { type: Number, default: 100, min: 0 },
    happyClients: { type: Number, default: 50, min: 0 },
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('SiteSettings', siteSettingsSchema);
