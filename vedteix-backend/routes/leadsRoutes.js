const express = require('express');
const { createLead, getAllLeads, updateLead } = require('../controllers/leadsController');
const { protect, adminOnly } = require('../middlewares/authMiddleware');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();

router.post('/', asyncHandler(createLead));
router.get('/', protect, adminOnly, asyncHandler(getAllLeads));
router.put('/:id', protect, adminOnly, asyncHandler(updateLead));

module.exports = router;
