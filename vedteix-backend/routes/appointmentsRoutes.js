const express = require('express');
const { createAppointment, getAllAppointments } = require('../controllers/appointmentsController');
const { protect, adminOnly } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', createAppointment);
router.get('/', protect, adminOnly, getAllAppointments);

module.exports = router;
