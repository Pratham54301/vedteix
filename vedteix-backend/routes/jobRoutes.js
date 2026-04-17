const express = require('express');
const router = express.Router();
const { authMiddleware, isAdmin } = require('../middlewares/auth');
const jobController = require('../controllers/jobController');
const asyncHandler = require('../utils/asyncHandler');

// Public
router.get('/', asyncHandler(jobController.getAllJobs));
router.get('/:id', asyncHandler(jobController.getJobById));

// Admin only
router.post('/', authMiddleware, isAdmin, asyncHandler(jobController.createJob));
router.put('/:id', authMiddleware, isAdmin, asyncHandler(jobController.updateJob));
router.delete('/:id', authMiddleware, isAdmin, asyncHandler(jobController.deleteJob));

module.exports = router;
