const express = require('express');
const { getAllConversations, getChatExchanges } = require('../controllers/chatController');
const { protect, adminOnly } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', protect, adminOnly, getAllConversations);
router.get('/logs', protect, adminOnly, getChatExchanges);

module.exports = router;
