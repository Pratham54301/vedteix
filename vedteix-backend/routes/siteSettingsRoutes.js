const express = require('express');
const { getSiteSettings, updateSiteSettings } = require('../controllers/siteSettingsController');
const { protect, adminOnly } = require('../middlewares/authMiddleware');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();

router.get('/', asyncHandler(getSiteSettings));
router.put('/', protect, adminOnly, asyncHandler(updateSiteSettings));

module.exports = router;
