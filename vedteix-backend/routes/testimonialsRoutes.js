const express = require('express');
const { createTestimonial, getAllTestimonials, getTestimonialById, updateTestimonial, deleteTestimonial } = require('../controllers/testimonialsController');
const { protect } = require('../middlewares/authMiddleware');
const { isAdmin } = require('../middlewares/auth');
const upload = require('../utils/multer');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();

// Public
router.get('/', asyncHandler(getAllTestimonials));
router.get('/:id', asyncHandler(getTestimonialById));

// Admin only
router.post('/', protect, isAdmin, upload.single('image'), asyncHandler(createTestimonial));
router.put('/:id', protect, isAdmin, upload.single('image'), asyncHandler(updateTestimonial));
router.delete('/:id', protect, isAdmin, asyncHandler(deleteTestimonial));

module.exports = router; 