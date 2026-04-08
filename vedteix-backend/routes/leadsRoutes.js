const express = require('express');
const { createLead, getAllLeads, updateLead } = require('../controllers/leadsController');
const { protect, adminOnly } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', createLead);
router.get('/', protect, adminOnly, getAllLeads);
router.put('/:id', protect, adminOnly, updateLead);

module.exports = router;
