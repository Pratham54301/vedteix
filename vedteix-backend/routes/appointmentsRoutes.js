const express = require('express');
const { createAppointment, getAllAppointments } = require('../controllers/appointmentsController');
const { protect, adminOnly } = require('../middlewares/authMiddleware');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();

router.post('/', asyncHandler(createAppointment));
router.get('/', protect, adminOnly, asyncHandler(getAllAppointments));

module.exports = router;
