const User = require('../models/User');
const Job = require('../models/Job');
const Portfolio = require('../models/Portfolio');
const Service = require('../models/Service');
const Contact = require('../models/Contact');
const Newsletter = require('../models/Newsletter');
const SiteSettings = require('../models/SiteSettings');
const Lead = require('../models/Lead');
const Appointment = require('../models/Appointment');
const ChatConversation = require('../models/ChatConversation');
const Invoice = require('../models/Invoice');

exports.getStats = async (req, res) => {
  try {
    const [
      totalUsers,
      totalJobs,
      totalPortfolios,
      totalServices,
      totalContacts,
      totalSubscriptions,
      totalLeads,
      totalAppointments,
      totalChats,
      totalInvoices,
      latestJobs,
      latestPortfolios,
      latestContacts,
      latestSubscriptions,
      latestLeads,
      settingsRecord,
    ] = await Promise.all([
      User.countDocuments(),
      Job.countDocuments(),
      Portfolio.countDocuments(),
      Service.countDocuments(),
      Contact.countDocuments(),
      Newsletter.countDocuments(),
      Lead.countDocuments(),
      Appointment.countDocuments(),
      ChatConversation.countDocuments(),
      Invoice.countDocuments(),
      Job.find().sort({ createdAt: -1 }).limit(5),
      Portfolio.find().sort({ createdAt: -1 }).limit(5),
      Contact.find().sort({ createdAt: -1 }).limit(5),
      Newsletter.find().sort({ createdAt: -1 }).limit(5),
      Lead.find().sort({ createdAt: -1 }).limit(5),
      SiteSettings.findOne(),
    ]);

    res.json({
      totalUsers,
      totalJobs,
      totalPortfolios,
      totalServices,
      totalContacts,
      totalSubscriptions,
      totalLeads,
      totalAppointments,
      totalChats,
      totalInvoices,
      latestJobs,
      latestPortfolios,
      latestContacts,
      latestSubscriptions,
      latestLeads,
      siteConfigured: Boolean(settingsRecord),
    });
  } catch (error) {
    console.error('Failed to load dashboard stats:', error);
    res.status(500).json({ error: 'Failed to load dashboard stats' });
  }
};
