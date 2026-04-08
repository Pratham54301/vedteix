const express = require('express');
const router = express.Router();
const { authMiddleware, isAdmin } = require('../middlewares/auth');
const jobController = require('../controllers/jobController');

// Public
router.get('/', jobController.getAllJobs);
router.get('/:id', jobController.getJobById);

// Admin only
router.post('/', authMiddleware, isAdmin, jobController.createJob);
router.put('/:id', authMiddleware, isAdmin, jobController.updateJob);
router.delete('/:id', authMiddleware, isAdmin, jobController.deleteJob);

module.exports = router; 
