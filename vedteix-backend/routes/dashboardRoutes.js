const express = require('express');
const { getStats } = require('../controllers/dashboardController');
const { protect, adminOnly } = require('../middlewares/authMiddleware');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();

router.get('/stats', protect, adminOnly, asyncHandler(getStats));

module.exports = router;
