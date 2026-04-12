const mongoose = require('mongoose');

const chatExchangeSchema = new mongoose.Schema(
  {
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ChatConversation',
      default: null,
      index: true,
    },
    userMessage: { type: String, required: true, trim: true },
    aiResponse: { type: String, required: true, trim: true },
    name: { type: String, trim: true, default: '' },
    email: { type: String, trim: true, lowercase: true, default: '' },
    language: { type: String, trim: true, default: 'en' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ChatExchange', chatExchangeSchema);
