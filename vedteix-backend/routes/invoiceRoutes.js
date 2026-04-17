const express = require('express');
const {
  createInvoice,
  getAllInvoices,
  updateInvoice,
  deleteInvoice,
  downloadInvoicePdf,
} = require('../controllers/invoicesController');
const { protect, adminOnly } = require('../middlewares/authMiddleware');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();

router.get('/', protect, adminOnly, asyncHandler(getAllInvoices));
router.post('/', protect, adminOnly, asyncHandler(createInvoice));
router.get('/:id/pdf', protect, adminOnly, asyncHandler(downloadInvoicePdf));
router.put('/:id', protect, adminOnly, asyncHandler(updateInvoice));
router.delete('/:id', protect, adminOnly, asyncHandler(deleteInvoice));

module.exports = router;
