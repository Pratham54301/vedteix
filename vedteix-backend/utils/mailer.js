const nodemailer = require('nodemailer');

const isMailerConfigured = Boolean(
  process.env.EMAIL_HOST &&
  process.env.EMAIL_PORT &&
  process.env.EMAIL_USER &&
  process.env.EMAIL_PASS
);

const transporter = isMailerConfigured
  ? nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })
  : null;

/**
 * Send an email using SMTP config from .env
 * @param {Object} options
 * @param {string|string[]} [options.to] - Recipient(s), comma-separated or array
 * @param {string} options.subject
 * @param {string} [options.text] - Plain text body
 * @param {string} [options.html] - HTML body
 * @param {Array} [options.attachments] - Attachments [{ filename, path, contentType }]
 * @param {string|string[]} [options.cc] - CC recipients
 * @param {string|string[]} [options.bcc] - BCC recipients
 * @param {Object} [options.rest] - Any other nodemailer options
 */
const sendMail = async ({
  to = process.env.EMAIL_TO,
  subject,
  text,
  html,
  attachments = [],
  cc,
  bcc,
  ...rest
}) => {
  if (!transporter) {
    return null;
  }

  // Support comma-separated or array for multiple recipients
  const parseList = (val) => Array.isArray(val)
    ? val
    : typeof val === 'string'
      ? val.split(',').map(email => email.trim()).filter(Boolean)
      : [];

  try {
    return await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: parseList(to),
      cc: cc ? parseList(cc) : undefined,
      bcc: bcc ? parseList(bcc) : undefined,
      subject,
      text,
      html,
      attachments,
      ...rest,
    });
  } catch (error) {
    console.error('Email delivery failed:', error);
    return null;
  }
};

module.exports = sendMail; 
