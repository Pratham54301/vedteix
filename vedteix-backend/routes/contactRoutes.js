const express = require('express');
const { createContact, getAllContacts, getContactById, deleteContact } = require('../controllers/contactController');
const { protect, adminOnly } = require('../middlewares/authMiddleware');

const router = express.Router();

// Public
router.post('/', createContact);

// Admin only
router.get('/', protect, adminOnly, getAllContacts);
router.get('/:id', protect, adminOnly, getContactById);
router.delete('/:id', protect, adminOnly, deleteContact);

module.exports = router; 
