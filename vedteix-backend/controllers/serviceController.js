const Service = require('../models/Service');
const cloudinary = require('../config/cloudinary');
const streamifier = require('streamifier');
const {
  isNonEmptyString,
  isValidUrl,
  normalizeString,
  toBoolean,
} = require('../utils/validation');

async function uploadServiceImageIfNeeded(req) {
  if (!req.file) {
    return '';
  }

  const result = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'vedteix/services' },
      (error, uploadResult) => {
        if (uploadResult) {
          resolve(uploadResult);
          return;
        }

        reject(error);
      }
    );

    streamifier.createReadStream(req.file.buffer).pipe(stream);
  });

  return result.secure_url;
}

function validateServicePayload(body) {
  const { title, description, iconName, imageUrl, featured, sortOrder } = body || {};

  if (!isNonEmptyString(title, { min: 2, max: 140 })) {
    return { error: 'Service title is required' };
  }

  if (!isNonEmptyString(description, { min: 10, max: 1000 })) {
    return { error: 'Service description must be at least 10 characters long' };
  }

  if (imageUrl && !isValidUrl(imageUrl)) {
    return { error: 'Please provide a valid image URL' };
  }

  return {
    data: {
      title: normalizeString(title, { max: 140 }),
      description: normalizeString(description, { max: 1000 }),
      iconName: normalizeString(iconName, { max: 60, fallback: 'Code' }) || 'Code',
      imageUrl: normalizeString(imageUrl, { max: 300 }),
      featured: toBoolean(featured),
      sortOrder: Number.isFinite(Number(sortOrder)) ? Number(sortOrder) : 0,
    },
  };
}

exports.createService = async (req, res) => {
  try {
    const { data, error } = validateServicePayload(req.body);
    if (error) {
      return res.status(400).json({ error });
    }

    const uploadedImageUrl = await uploadServiceImageIfNeeded(req);
    const service = await Service.create({
      ...data,
      imageUrl: uploadedImageUrl || data.imageUrl,
    });
    res.status(201).json(service);
  } catch (error) {
    console.error('Failed to create service:', error);
    res.status(500).json({ error: 'Failed to create service' });
  }
};

exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ sortOrder: 1, featured: -1, createdAt: -1 });
    res.json(services);
  } catch (error) {
    console.error('Failed to load services:', error);
    res.status(500).json({ error: 'Failed to load services' });
  }
};

exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    res.json(service);
  } catch (error) {
    console.error('Failed to load service:', error);
    res.status(500).json({ error: 'Failed to load service' });
  }
};

exports.updateService = async (req, res) => {
  try {
    const { data, error } = validateServicePayload(req.body);
    if (error) {
      return res.status(400).json({ error });
    }

    const uploadedImageUrl = await uploadServiceImageIfNeeded(req);
    const update = {
      ...data,
      imageUrl: uploadedImageUrl || data.imageUrl,
    };

    const service = await Service.findByIdAndUpdate(req.params.id, update, {
      new: true,
      runValidators: true,
    });
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    res.json(service);
  } catch (error) {
    console.error('Failed to update service:', error);
    res.status(500).json({ error: 'Failed to update service' });
  }
};

exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    res.json({ message: 'Service deleted' });
  } catch (error) {
    console.error('Failed to delete service:', error);
    res.status(500).json({ error: 'Failed to delete service' });
  }
};
