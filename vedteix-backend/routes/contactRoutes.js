const express = require('express');
const { createContact, getAllContacts, getContactById, deleteContact } = require('../controllers/contactController');
const { protect, adminOnly } = require('../middlewares/authMiddleware');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();

// Public
router.post('/', asyncHandler(createContact));

// Admin only
router.get('/', protect, adminOnly, asyncHandler(getAllContacts));
router.get('/:id', protect, adminOnly, asyncHandler(getContactById));
router.delete('/:id', protect, adminOnly, asyncHandler(deleteContact));

module.exports = router;
