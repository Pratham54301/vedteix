const express = require('express');
const { createTestimonial, getAllTestimonials, getTestimonialById, updateTestimonial, deleteTestimonial } = require('../controllers/testimonialsController');
const { protect } = require('../middlewares/authMiddleware');
const { isAdmin } = require('../middlewares/auth');
const upload = require('../utils/multer');

const router = express.Router();

// Public
router.get('/', getAllTestimonials);
router.get('/:id', getTestimonialById);

// Admin only
router.post('/', protect, isAdmin, upload.single('image'), createTestimonial);
router.put('/:id', protect, isAdmin, upload.single('image'), updateTestimonial);
router.delete('/:id', protect, isAdmin, deleteTestimonial);

module.exports = router; 