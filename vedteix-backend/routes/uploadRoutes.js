const express = require('express');
const upload = require('../utils/multer');
const { uploadAsset } = require('../controllers/uploadsController');
const { protect, adminOnly } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', protect, adminOnly, upload.single('file'), uploadAsset);

module.exports = router;
