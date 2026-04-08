const express = require('express');
const { createTechnology, getAllTechnologies, getTechnologyById, updateTechnology, deleteTechnology } = require('../controllers/technologyController');
const { protect } = require('../middlewares/authMiddleware');
const { isAdmin } = require('../middlewares/auth');
const upload = require('../utils/multer');

const router = express.Router();

// Public
router.get('/', getAllTechnologies);
router.get('/:id', getTechnologyById);

// Admin only
router.post('/', protect, isAdmin, upload.single('logo'), createTechnology);
router.post('/add', protect, isAdmin, upload.single('logo'), createTechnology);
router.put('/:id', protect, isAdmin, upload.single('logo'), updateTechnology);
router.delete('/:id', protect, isAdmin, deleteTechnology);

module.exports = router; 
