const SiteSettings = require('../models/SiteSettings');
const {
  isValidEmail,
  isValidUrl,
  normalizeString,
} = require('../utils/validation');

async function getOrCreateSettings() {
  const existingSettings = await SiteSettings.findOne();
  if (existingSettings) {
    return existingSettings;
  }

  return SiteSettings.create({});
}

exports.getSiteSettings = async (req, res) => {
  try {
    const settings = await getOrCreateSettings();
    res.json(settings);
  } catch (error) {
    console.error('Failed to load site settings:', error);
    res.status(500).json({ error: 'Failed to load site settings' });
  }
};

exports.updateSiteSettings = async (req, res) => {
  try {
    const settings = await getOrCreateSettings();
    const {
      companyName,
      companyTagline,
      heroTitle,
      heroSubtitle,
      officeName,
      contactEmail,
      contactPhone,
      address,
      websiteUrl,
      gstNumber,
      invoiceLogoUrl,
      signatureUrl,
      socialLinks,
      stats,
    } = req.body || {};

    if (contactEmail && !isValidEmail(contactEmail)) {
      return res.status(400).json({ error: 'Please provide a valid contact email address' });
    }

    const normalizedSocialLinks = {};
    const linkKeys = ['linkedin', 'twitter', 'facebook', 'instagram', 'youtube'];

    for (const key of linkKeys) {
      const value = socialLinks?.[key];
      if (typeof value === 'undefined') {
        continue;
      }

      if (value && !isValidUrl(value)) {
        return res.status(400).json({ error: `Please provide a valid ${key} URL` });
      }

      normalizedSocialLinks[key] = normalizeString(value, { max: 300 });
    }

    settings.companyName = normalizeString(companyName, { max: 120, fallback: settings.companyName });
    settings.companyTagline = normalizeString(companyTagline, { max: 220, fallback: settings.companyTagline });
    settings.heroTitle = normalizeString(heroTitle, { max: 180, fallback: settings.heroTitle });
    settings.heroSubtitle = normalizeString(heroSubtitle, { max: 500, fallback: settings.heroSubtitle });
    settings.officeName = normalizeString(officeName, { max: 120, fallback: settings.officeName });
    settings.contactEmail = normalizeString(contactEmail, { max: 254, fallback: settings.contactEmail }).toLowerCase();
    settings.contactPhone = normalizeString(contactPhone, { max: 50, fallback: settings.contactPhone });
    settings.address = normalizeString(address, { max: 500, fallback: settings.address });
    settings.websiteUrl = normalizeString(websiteUrl, { max: 300, fallback: settings.websiteUrl });
    settings.gstNumber = normalizeString(gstNumber, { max: 80, fallback: settings.gstNumber });
    settings.invoiceLogoUrl = normalizeString(invoiceLogoUrl, { max: 500, fallback: settings.invoiceLogoUrl });
    settings.signatureUrl = normalizeString(signatureUrl, { max: 500, fallback: settings.signatureUrl });
    settings.socialLinks = {
      ...settings.socialLinks,
      ...normalizedSocialLinks,
    };
    settings.stats = {
      projectsCompleted: Number.isFinite(Number(stats?.projectsCompleted))
        ? Math.max(0, Number(stats.projectsCompleted))
        : settings.stats?.projectsCompleted ?? 100,
      happyClients: Number.isFinite(Number(stats?.happyClients))
        ? Math.max(0, Number(stats.happyClients))
        : settings.stats?.happyClients ?? 50,
    };

    await settings.save();
    res.json(settings);
  } catch (error) {
    console.error('Failed to update site settings:', error);
    res.status(500).json({ error: 'Failed to update site settings' });
  }
};
