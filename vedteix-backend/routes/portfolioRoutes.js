const express = require('express');
const router = express.Router();
const { authMiddleware, isAdmin } = require('../middlewares/auth');
const portfolioController = require('../controllers/portfolioController');
const upload = require('../utils/multer');

// Public
router.get('/', portfolioController.getAllPortfolios);
router.get('/:id', portfolioController.getPortfolioById);

// Admin only
router.post('/', authMiddleware, isAdmin, upload.single('image'), portfolioController.createPortfolio);
router.put('/:id', authMiddleware, isAdmin, upload.single('image'), portfolioController.updatePortfolio);
router.delete('/:id', authMiddleware, isAdmin, portfolioController.deletePortfolio);

module.exports = router; 
