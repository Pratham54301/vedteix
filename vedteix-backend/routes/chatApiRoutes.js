const express = require('express');
const { sendChatMessage } = require('../controllers/chatController');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();

router.post('/', asyncHandler(sendChatMessage));

module.exports = router;
