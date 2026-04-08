const express = require('express');
const { createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog } = require('../controllers/blogController');
const { protect } = require('../middlewares/authMiddleware');
const { isAdmin } = require('../middlewares/auth');
const upload = require('../utils/multer');

const router = express.Router();

// Public
router.get('/', getAllBlogs);
router.get('/:id', getBlogById);

// Admin only
router.post('/', protect, isAdmin, upload.single('image'), createBlog);
router.put('/:id', protect, isAdmin, upload.single('image'), updateBlog);
router.delete('/:id', protect, isAdmin, deleteBlog);

module.exports = router; 