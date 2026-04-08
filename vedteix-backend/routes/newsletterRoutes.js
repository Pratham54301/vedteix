const express = require('express');
const { createSubscription, getAllSubscriptions, deleteSubscription } = require('../controllers/newsletterController');
const { protect, adminOnly } = require('../middlewares/authMiddleware');

const router = express.Router();

// Public
router.post('/', createSubscription);

// Admin only
router.get('/', protect, adminOnly, getAllSubscriptions);
router.delete('/:id', protect, adminOnly, deleteSubscription);

module.exports = router; 
