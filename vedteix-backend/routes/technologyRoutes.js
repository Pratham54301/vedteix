const express = require('express');
const { createTechnology, getAllTechnologies, getTechnologyById, updateTechnology, deleteTechnology } = require('../controllers/technologyController');
const { protect } = require('../middlewares/authMiddleware');
const { isAdmin } = require('../middlewares/auth');
const upload = require('../utils/multer');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();

// Public
router.get('/', asyncHandler(getAllTechnologies));
router.get('/:id', asyncHandler(getTechnologyById));

// Admin only
router.post('/', protect, isAdmin, upload.single('logo'), asyncHandler(createTechnology));
router.post('/add', protect, isAdmin, upload.single('logo'), asyncHandler(createTechnology));
router.put('/:id', protect, isAdmin, upload.single('logo'), asyncHandler(updateTechnology));
router.delete('/:id', protect, isAdmin, asyncHandler(deleteTechnology));

module.exports = router;
