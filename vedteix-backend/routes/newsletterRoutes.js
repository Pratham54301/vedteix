const express = require('express');
const { createSubscription, getAllSubscriptions, deleteSubscription } = require('../controllers/newsletterController');
const { protect, adminOnly } = require('../middlewares/authMiddleware');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();

// Public
router.post('/', asyncHandler(createSubscription));

// Admin only
router.get('/', protect, adminOnly, asyncHandler(getAllSubscriptions));
router.delete('/:id', protect, adminOnly, asyncHandler(deleteSubscription));

module.exports = router;
