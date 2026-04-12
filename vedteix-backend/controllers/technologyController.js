const Technology = require('../models/Technology');
const { resolveUploadedImageUrl } = require('../utils/resolveUploadedImageUrl');
const {
  isNonEmptyString,
  isValidUrl,
  normalizeString,
} = require('../utils/validation');

function validateTechnologyPayload(body) {
  const { name, website, logoUrl } = body || {};

  if (!isNonEmptyString(name, { min: 2, max: 120 })) {
    return { error: 'Technology name is required' };
  }

  if (website && !isValidUrl(website)) {
    return { error: 'Please provide a valid website URL' };
  }

  if (logoUrl && !isValidUrl(logoUrl)) {
    return { error: 'Please provide a valid logo URL' };
  }

  return {
    data: {
      name: normalizeString(name, { max: 120 }),
      website: normalizeString(website, { max: 300 }),
      logoUrl: normalizeString(logoUrl, { max: 300 }),
    },
  };
}

exports.createTechnology = async (req, res) => {
  try {
    const { data, error } = validateTechnologyPayload(req.body);
    if (error) {
      return res.status(400).json({ error });
    }

    const uploadedLogoUrl = await resolveUploadedImageUrl(req, 'vedteix/technologies');
    const finalLogoUrl = uploadedLogoUrl || data.logoUrl;
    if (!finalLogoUrl) {
      return res.status(400).json({ error: 'Logo is required' });
    }

    const tech = await Technology.create({
      ...data,
      logoUrl: finalLogoUrl,
    });
    res.status(201).json(tech);
  } catch (error) {
    console.error('Failed to create technology:', error);
    res.status(500).json({ error: 'Failed to create technology' });
  }
};

exports.getAllTechnologies = async (req, res) => {
  try {
    const technologies = await Technology.find().sort({ createdAt: -1 });
    res.json(technologies);
  } catch (error) {
    console.error('Failed to load technologies:', error);
    res.status(500).json({ error: 'Failed to load technologies' });
  }
};

exports.getTechnologyById = async (req, res) => {
  try {
    const technology = await Technology.findById(req.params.id);
    if (!technology) {
      return res.status(404).json({ error: 'Technology not found' });
    }

    res.json(technology);
  } catch (error) {
    console.error('Failed to load technology:', error);
    res.status(500).json({ error: 'Failed to load technology' });
  }
};

exports.updateTechnology = async (req, res) => {
  try {
    const { data, error } = validateTechnologyPayload(req.body);
    if (error) {
      return res.status(400).json({ error });
    }

    const uploadedLogoUrl = await resolveUploadedImageUrl(req, 'vedteix/technologies');
    const technology = await Technology.findByIdAndUpdate(
      req.params.id,
      {
        ...data,
        logoUrl: uploadedLogoUrl || data.logoUrl,
      },
      { new: true, runValidators: true }
    );

    if (!technology) {
      return res.status(404).json({ error: 'Technology not found' });
    }

    res.json(technology);
  } catch (error) {
    console.error('Failed to update technology:', error);
    res.status(500).json({ error: 'Failed to update technology' });
  }
};

exports.deleteTechnology = async (req, res) => {
  try {
    const technology = await Technology.findByIdAndDelete(req.params.id);
    if (!technology) {
      return res.status(404).json({ error: 'Technology not found' });
    }

    res.json({ message: 'Technology deleted' });
  } catch (error) {
    console.error('Failed to delete technology:', error);
    res.status(500).json({ error: 'Failed to delete technology' });
  }
};
