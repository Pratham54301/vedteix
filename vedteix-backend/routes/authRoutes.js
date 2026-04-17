const express = require('express');
const {
  registerUser,
  loginUser,
  logoutUser,
  getProfile,
} = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();

router.post('/register', asyncHandler(registerUser));
router.post('/login', asyncHandler(loginUser));
router.post('/logout', asyncHandler(logoutUser));
router.get('/me', protect, asyncHandler(getProfile));
router.get('/profile', protect, asyncHandler(getProfile));

module.exports = router;
