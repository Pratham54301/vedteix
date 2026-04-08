const express = require('express');
const {
  createInvoice,
  getAllInvoices,
  updateInvoice,
  deleteInvoice,
} = require('../controllers/invoicesController');
const { protect, adminOnly } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', protect, adminOnly, getAllInvoices);
router.post('/', protect, adminOnly, createInvoice);
router.put('/:id', protect, adminOnly, updateInvoice);
router.delete('/:id', protect, adminOnly, deleteInvoice);

module.exports = router;
