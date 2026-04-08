const Testimonial = require('../models/Testimonials');
const cloudinary = require('../config/cloudinary');
const streamifier = require('streamifier');
const {
  isNonEmptyString,
  isValidUrl,
  normalizeString,
} = require('../utils/validation');

async function uploadTestimonialImageIfNeeded(req) {
  if (!req.file) {
    return '';
  }

  const result = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'vedteix/testimonials' },
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

function validateTestimonialPayload(body) {
  const { name, designation, message, imageUrl } = body || {};

  if (!isNonEmptyString(name, { min: 2, max: 120 })) {
    return { error: 'Name is required' };
  }

  if (!isNonEmptyString(designation, { min: 2, max: 160 })) {
    return { error: 'Designation is required' };
  }

  if (!isNonEmptyString(message, { min: 12, max: 2000 })) {
    return { error: 'Testimonial message must be at least 12 characters long' };
  }

  if (imageUrl && !isValidUrl(imageUrl)) {
    return { error: 'Please provide a valid profile image URL' };
  }

  return {
    data: {
      name: normalizeString(name, { max: 120 }),
      designation: normalizeString(designation, { max: 160 }),
      message: normalizeString(message, { max: 2000 }),
      imageUrl: normalizeString(imageUrl, { max: 300 }),
    },
  };
}

exports.createTestimonial = async (req, res) => {
  try {
    const { data, error } = validateTestimonialPayload(req.body);
    if (error) {
      return res.status(400).json({ error });
    }

    const uploadedImageUrl = await uploadTestimonialImageIfNeeded(req);
    const testimonial = await Testimonial.create({
      ...data,
      imageUrl: uploadedImageUrl || data.imageUrl,
    });

    res.status(201).json(testimonial);
  } catch (error) {
    console.error('Failed to create testimonial:', error);
    res.status(500).json({ error: 'Failed to create testimonial' });
  }
};

exports.getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (error) {
    console.error('Failed to load testimonials:', error);
    res.status(500).json({ error: 'Failed to load testimonials' });
  }
};

exports.getTestimonialById = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ error: 'Testimonial not found' });
    }

    res.json(testimonial);
  } catch (error) {
    console.error('Failed to load testimonial:', error);
    res.status(500).json({ error: 'Failed to load testimonial' });
  }
};

exports.updateTestimonial = async (req, res) => {
  try {
    const { data, error } = validateTestimonialPayload(req.body);
    if (error) {
      return res.status(400).json({ error });
    }

    const uploadedImageUrl = await uploadTestimonialImageIfNeeded(req);
    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      {
        ...data,
        imageUrl: uploadedImageUrl || data.imageUrl,
      },
      { new: true, runValidators: true }
    );

    if (!testimonial) {
      return res.status(404).json({ error: 'Testimonial not found' });
    }

    res.json(testimonial);
  } catch (error) {
    console.error('Failed to update testimonial:', error);
    res.status(500).json({ error: 'Failed to update testimonial' });
  }
};

exports.deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ error: 'Testimonial not found' });
    }

    res.json({ message: 'Testimonial deleted' });
  } catch (error) {
    console.error('Failed to delete testimonial:', error);
    res.status(500).json({ error: 'Failed to delete testimonial' });
  }
};
