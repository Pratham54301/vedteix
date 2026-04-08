const express = require('express');
const {
  registerUser,
  loginUser,
  logoutUser,
  getProfile,
} = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/me', protect, getProfile);
router.get('/profile', protect, getProfile);

module.exports = router; 
