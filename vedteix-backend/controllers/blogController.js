const Blog = require('../models/Blog');
const cloudinary = require('../config/cloudinary');
const streamifier = require('streamifier');
const {
  isNonEmptyString,
  isValidUrl,
  normalizeString,
} = require('../utils/validation');

async function uploadBlogImageIfNeeded(req) {
  if (!req.file) {
    return '';
  }

  const result = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'vedteix/blogs' },
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

function validateBlogPayload(body) {
  const { title, content, author, imageUrl } = body || {};

  if (!isNonEmptyString(title, { min: 4, max: 180 })) {
    return { error: 'Blog title is required' };
  }

  if (!isNonEmptyString(content, { min: 40, max: 12000 })) {
    return { error: 'Blog content must be at least 40 characters long' };
  }

  if (imageUrl && !isValidUrl(imageUrl)) {
    return { error: 'Please provide a valid blog image URL' };
  }

  return {
    data: {
      title: normalizeString(title, { max: 180 }),
      content: normalizeString(content, { max: 12000 }),
      author: normalizeString(author, { max: 120, fallback: 'Admin' }) || 'Admin',
      imageUrl: normalizeString(imageUrl, { max: 300 }),
    },
  };
}

exports.createBlog = async (req, res) => {
  try {
    const { data, error } = validateBlogPayload(req.body);
    if (error) {
      return res.status(400).json({ error });
    }

    const uploadedImageUrl = await uploadBlogImageIfNeeded(req);
    const blog = await Blog.create({
      ...data,
      imageUrl: uploadedImageUrl || data.imageUrl,
    });

    res.status(201).json(blog);
  } catch (error) {
    console.error('Failed to create blog:', error);
    res.status(500).json({ error: 'Failed to create blog' });
  }
};

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    console.error('Failed to load blogs:', error);
    res.status(500).json({ error: 'Failed to load blogs' });
  }
};

exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    res.json(blog);
  } catch (error) {
    console.error('Failed to load blog:', error);
    res.status(500).json({ error: 'Failed to load blog' });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const { data, error } = validateBlogPayload(req.body);
    if (error) {
      return res.status(400).json({ error });
    }

    const uploadedImageUrl = await uploadBlogImageIfNeeded(req);
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      {
        ...data,
        imageUrl: uploadedImageUrl || data.imageUrl,
      },
      { new: true, runValidators: true }
    );

    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    res.json(blog);
  } catch (error) {
    console.error('Failed to update blog:', error);
    res.status(500).json({ error: 'Failed to update blog' });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    res.json({ message: 'Blog deleted' });
  } catch (error) {
    console.error('Failed to delete blog:', error);
    res.status(500).json({ error: 'Failed to delete blog' });
  }
};
