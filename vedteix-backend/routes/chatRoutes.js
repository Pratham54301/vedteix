const express = require('express');
const { getAllConversations, getChatExchanges } = require('../controllers/chatController');
const { protect, adminOnly } = require('../middlewares/authMiddleware');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();

router.get('/', protect, adminOnly, asyncHandler(getAllConversations));
router.get('/logs', protect, adminOnly, asyncHandler(getChatExchanges));

module.exports = router;
