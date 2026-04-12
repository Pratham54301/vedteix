const PDFDocument = require('pdfkit');

async function fetchImageBuffer(url) {
  if (!url || typeof url !== 'string') {
    return null;
  }

  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': 'VedteixInvoicePdf/1.0' },
    });
    if (!response.ok) {
      return null;
    }
    return Buffer.from(await response.arrayBuffer());
  } catch {
    return null;
  }
}

/**
 * @param {object} params
 * @param {import('mongoose').Document} params.invoice
 * @param {import('mongoose').Document|null} params.settings
 * @returns {Promise<Buffer>}
 */
async function generateInvoicePdfBuffer({ invoice, settings }) {
  const doc = new PDFDocument({ margin: 48, size: 'A4' });
  const chunks = [];

  doc.on('data', (chunk) => chunks.push(chunk));

  const done = new Promise((resolve, reject) => {
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);
  });

  const company = settings?.companyName || 'Company';
  const logoBuf = await fetchImageBuffer(settings?.invoiceLogoUrl);

  if (logoBuf) {
    try {
      doc.image(logoBuf, 48, 48, { fit: [140, 56] });
    } catch {
      doc.fontSize(16).font('Helvetica-Bold').text(company, 48, 48);
    }
  } else {
    doc.fontSize(16).font('Helvetica-Bold').text(company, 48, 48);
  }

  doc
    .fontSize(9)
    .font('Helvetica')
    .fillColor('#444')
    .text(settings?.address || '', 48, 112, { width: 260 })
    .text(`Phone: ${settings?.contactPhone || '—'}`, 48, 156, { width: 260 })
    .text(`Email: ${settings?.contactEmail || '—'}`, 48, 170, { width: 260 });

  let lineY = 186;
  if (settings?.websiteUrl) {
    doc.text(`Website: ${settings.websiteUrl}`, 48, lineY, { width: 260 });
    lineY += 14;
  }
  if (settings?.gstNumber) {
    doc.text(`GST: ${settings.gstNumber}`, 48, lineY, { width: 260 });
  }

  doc.fillColor('#111');

  doc
    .fontSize(20)
    .font('Helvetica-Bold')
    .text('INVOICE', 360, 48, { align: 'right', width: 187 });

  doc
    .fontSize(10)
    .font('Helvetica')
    .text(`Invoice #: ${invoice.invoiceNumber}`, 360, 78, { align: 'right', width: 187 })
    .text(`Date: ${invoice.date}`, 360, 94, { align: 'right', width: 187 })
    .text(`Status: ${invoice.status === 'paid' ? 'Paid' : 'Unpaid'}`, 360, 110, {
      align: 'right',
      width: 187,
    });

  const blockTop = 220;
  doc.font('Helvetica-Bold').fontSize(11).text('Bill to', 48, blockTop);
  doc.font('Helvetica').fontSize(10).text(invoice.clientName, 48, blockTop + 18);

  doc.moveTo(48, blockTop + 48).lineTo(549, blockTop + 48).stroke('#cccccc');

  const rowTop = blockTop + 60;
  doc.font('Helvetica-Bold').text('Description', 48, rowTop);
  doc.text('Amount (INR)', 400, rowTop, { width: 101, align: 'right' });

  doc.moveTo(48, rowTop + 16).lineTo(549, rowTop + 16).stroke('#eeeeee');

  doc.font('Helvetica').text(invoice.service, 48, rowTop + 24, { width: 330 });
  doc.text(
    Number(invoice.amount).toLocaleString('en-IN', { minimumFractionDigits: 2 }),
    400,
    rowTop + 24,
    { width: 101, align: 'right' }
  );

  const totalY = rowTop + 72;
  doc.font('Helvetica-Bold').text('Total', 360, totalY);
  doc.text(
    `₹ ${Number(invoice.amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`,
    400,
    totalY,
    { width: 101, align: 'right' }
  );

  const sigY = totalY + 56;
  doc.font('Helvetica').fontSize(9).fillColor('#444').text('Authorized signature', 48, sigY);

  const sigBuf = await fetchImageBuffer(settings?.signatureUrl);
  if (sigBuf) {
    try {
      doc.image(sigBuf, 48, sigY + 12, { fit: [160, 64] });
    } catch {
      /* ignore */
    }
  }

  doc
    .fontSize(8)
    .fillColor('#666')
    .text('Thank you for your business.', 48, 740, { align: 'center', width: 504 });

  doc.end();

  return done;
}

module.exports = { generateInvoicePdfBuffer };
