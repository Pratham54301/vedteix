const mongoose = require('mongoose');

const technologySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  logoUrl: { type: String, required: true },
  website: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Technology', technologySchema); 