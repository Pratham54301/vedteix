const express = require('express');
const { sendChatMessage, getAllConversations } = require('../controllers/chatController');
const { protect, adminOnly } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/message', sendChatMessage);
router.get('/', protect, adminOnly, getAllConversations);

module.exports = router;
