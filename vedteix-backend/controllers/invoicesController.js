const mongoose = require('mongoose');
const Invoice = require('../models/Invoice');
const SiteSettings = require('../models/SiteSettings');
const { generateInvoicePdfBuffer } = require('../utils/generateInvoicePdf');
const {
  isNonEmptyString,
  normalizeString,
} = require('../utils/validation');

function buildInvoiceNumber() {
  return `INV-${Date.now()}`;
}

exports.createInvoice = async (req, res) => {
  try {
    const { clientName, service, amount, status, date } = req.body || {};

    if (!isNonEmptyString(clientName, { min: 2, max: 160 })) {
      return res.status(400).json({ error: 'Please provide the client name' });
    }

    if (!isNonEmptyString(service, { min: 2, max: 200 })) {
      return res.status(400).json({ error: 'Please provide the service name' });
    }

    const numericAmount = Number(amount);
    if (!Number.isFinite(numericAmount) || numericAmount < 0) {
      return res.status(400).json({ error: 'Please provide a valid invoice amount' });
    }

    if (!isNonEmptyString(date, { min: 8, max: 32 })) {
      return res.status(400).json({ error: 'Please provide the invoice date' });
    }

    const invoice = await Invoice.create({
      invoiceNumber: buildInvoiceNumber(),
      clientName: normalizeString(clientName, { max: 160 }),
      service: normalizeString(service, { max: 200 }),
      amount: numericAmount,
      status: status === 'paid' ? 'paid' : 'unpaid',
      date: normalizeString(date, { max: 32 }),
    });

    res.status(201).json(invoice);
  } catch (error) {
    console.error('Failed to create invoice:', error);
    res.status(500).json({ error: 'Failed to create invoice' });
  }
};

exports.getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find().sort({ createdAt: -1 });
    res.json(invoices);
  } catch (error) {
    console.error('Failed to load invoices:', error);
    res.status(500).json({ error: 'Failed to load invoices' });
  }
};

exports.updateInvoice = async (req, res) => {
  try {
    const { clientName, service, amount, status, date } = req.body || {};
    const updates = {};

    if (typeof clientName !== 'undefined') {
      if (!isNonEmptyString(clientName, { min: 2, max: 160 })) {
        return res.status(400).json({ error: 'Please provide the client name' });
      }
      updates.clientName = normalizeString(clientName, { max: 160 });
    }

    if (typeof service !== 'undefined') {
      if (!isNonEmptyString(service, { min: 2, max: 200 })) {
        return res.status(400).json({ error: 'Please provide the service name' });
      }
      updates.service = normalizeString(service, { max: 200 });
    }

    if (typeof amount !== 'undefined') {
      const numericAmount = Number(amount);
      if (!Number.isFinite(numericAmount) || numericAmount < 0) {
        return res.status(400).json({ error: 'Please provide a valid invoice amount' });
      }
      updates.amount = numericAmount;
    }

    if (typeof status !== 'undefined') {
      if (!['paid', 'unpaid'].includes(status)) {
        return res.status(400).json({ error: 'Invalid invoice status' });
      }
      updates.status = status;
    }

    if (typeof date !== 'undefined') {
      if (!isNonEmptyString(date, { min: 8, max: 32 })) {
        return res.status(400).json({ error: 'Please provide the invoice date' });
      }
      updates.date = normalizeString(date, { max: 32 });
    }

    const invoice = await Invoice.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }

    res.json(invoice);
  } catch (error) {
    console.error('Failed to update invoice:', error);
    res.status(500).json({ error: 'Failed to update invoice' });
  }
};

exports.deleteInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findByIdAndDelete(req.params.id);
    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }

    res.json({ message: 'Invoice deleted' });
  } catch (error) {
    console.error('Failed to delete invoice:', error);
    res.status(500).json({ error: 'Failed to delete invoice' });
  }
};

exports.downloadInvoicePdf = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid invoice id' });
    }

    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }

    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = await SiteSettings.create({});
    }

    const buffer = await generateInvoicePdfBuffer({ invoice, settings });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${encodeURIComponent(invoice.invoiceNumber)}.pdf"`
    );
    res.send(buffer);
  } catch (error) {
    console.error('Failed to generate invoice PDF:', error);
    res.status(500).json({ error: 'Failed to generate invoice PDF' });
  }
};
