const express = require('express');
const router = express.Router();
const { authMiddleware, isAdmin } = require('../middlewares/auth');
const portfolioController = require('../controllers/portfolioController');
const upload = require('../utils/multer');
const asyncHandler = require('../utils/asyncHandler');

// Public
router.get('/', asyncHandler(portfolioController.getAllPortfolios));
router.get('/:id', asyncHandler(portfolioController.getPortfolioById));

// Admin only
router.post('/', authMiddleware, isAdmin, upload.single('image'), asyncHandler(portfolioController.createPortfolio));
router.put('/:id', authMiddleware, isAdmin, upload.single('image'), asyncHandler(portfolioController.updatePortfolio));
router.delete('/:id', authMiddleware, isAdmin, asyncHandler(portfolioController.deletePortfolio));

module.exports = router;
