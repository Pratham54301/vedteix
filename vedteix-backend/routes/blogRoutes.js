const express = require('express');
const { createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog } = require('../controllers/blogController');
const { protect } = require('../middlewares/authMiddleware');
const { isAdmin } = require('../middlewares/auth');
const upload = require('../utils/multer');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();

// Public
router.get('/', asyncHandler(getAllBlogs));
router.get('/:id', asyncHandler(getBlogById));

// Admin only
router.post('/', protect, isAdmin, upload.single('image'), asyncHandler(createBlog));
router.put('/:id', protect, isAdmin, upload.single('image'), asyncHandler(updateBlog));
router.delete('/:id', protect, isAdmin, asyncHandler(deleteBlog));

module.exports = router; 