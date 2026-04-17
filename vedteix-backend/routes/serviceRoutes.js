const express = require('express');
const { createService, getAllServices, getServiceById, updateService, deleteService } = require('../controllers/serviceController');
const { protect, adminOnly } = require('../middlewares/authMiddleware');
const upload = require('../utils/multer');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();

// Public
router.get('/', asyncHandler(getAllServices));
router.get('/:id', asyncHandler(getServiceById));

// Admin only
router.post('/', protect, adminOnly, upload.single('image'), asyncHandler(createService));
router.put('/:id', protect, adminOnly, upload.single('image'), asyncHandler(updateService));
router.delete('/:id', protect, adminOnly, asyncHandler(deleteService));

module.exports = router;
