const express = require('express');
const { createService, getAllServices, getServiceById, updateService, deleteService } = require('../controllers/serviceController');
const { protect, adminOnly } = require('../middlewares/authMiddleware');
const upload = require('../utils/multer');

const router = express.Router();

// Public
router.get('/', getAllServices);
router.get('/:id', getServiceById);

// Admin only
router.post('/', protect, adminOnly, upload.single('image'), createService);
router.put('/:id', protect, adminOnly, upload.single('image'), updateService);
router.delete('/:id', protect, adminOnly, deleteService);

module.exports = router; 
