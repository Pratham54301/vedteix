const Portfolio = require('../models/Portfolio');
const sendMail = require('../utils/mailer');
const { resolveUploadedImageUrl } = require('../utils/resolveUploadedImageUrl');
const {
  isNonEmptyString,
  isValidUrl,
  normalizeString,
  normalizeStringArray,
  toBoolean,
} = require('../utils/validation');

function validatePortfolioPayload(body) {
  const {
    title,
    category,
    description,
    liveUrl,
    githubUrl,
    imageUrl,
    techStack,
    featured,
  } = body || {};

  if (!isNonEmptyString(title, { min: 2, max: 160 })) {
    return { error: 'Portfolio title is required' };
  }

  if (!isNonEmptyString(category, { min: 2, max: 100 })) {
    return { error: 'Portfolio category is required' };
  }

  if (!isNonEmptyString(description, { min: 10, max: 5000 })) {
    return { error: 'Description must be at least 10 characters long' };
  }

  if (liveUrl && !isValidUrl(liveUrl)) {
    return { error: 'Please provide a valid live URL' };
  }

  if (githubUrl && !isValidUrl(githubUrl)) {
    return { error: 'Please provide a valid GitHub URL' };
  }

  if (imageUrl && !isValidUrl(imageUrl)) {
    return { error: 'Please provide a valid image URL' };
  }

  return {
    data: {
      title: normalizeString(title, { max: 160 }),
      category: normalizeString(category, { max: 100 }),
      description: normalizeString(description, { max: 5000 }),
      liveUrl: normalizeString(liveUrl, { max: 300 }),
      githubUrl: normalizeString(githubUrl, { max: 300 }),
      imageUrl: normalizeString(imageUrl, { max: 300 }),
      techStack: normalizeStringArray(techStack),
      featured: toBoolean(featured),
    },
  };
}

exports.createPortfolio = async (req, res) => {
  try {
    const { data, error } = validatePortfolioPayload(req.body);
    if (error) {
      return res.status(400).json({ error });
    }

    const uploadedImageUrl = await resolveUploadedImageUrl(req, 'vedteix/portfolios');
    const portfolio = await Portfolio.create({
      ...data,
      imageUrl: uploadedImageUrl || data.imageUrl,
    });

    await sendMail({
      subject: `New Portfolio Created: ${portfolio.title}`,
      text: `A new portfolio "${portfolio.title}" was just added.\nDescription: ${portfolio.description}`,
      html: `
        <h2>New Portfolio Created</h2>
        <p><b>Title:</b> ${portfolio.title}</p>
        <p><b>Category:</b> ${portfolio.category}</p>
        <p><b>Description:</b> ${portfolio.description}</p>
      `,
    });

    res.status(201).json(portfolio);
  } catch (error) {
    console.error('Failed to create portfolio:', error);
    res.status(500).json({ error: 'Failed to create portfolio' });
  }
};

exports.getAllPortfolios = async (req, res) => {
  try {
    const portfolios = await Portfolio.find().sort({ featured: -1, createdAt: -1 });
    res.json(portfolios);
  } catch (error) {
    console.error('Failed to load portfolios:', error);
    res.status(500).json({ error: 'Failed to load portfolios' });
  }
};

exports.getPortfolioById = async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) {
      return res.status(404).json({ error: 'Portfolio not found' });
    }

    res.json(portfolio);
  } catch (error) {
    console.error('Failed to load portfolio:', error);
    res.status(500).json({ error: 'Failed to load portfolio' });
  }
};

exports.updatePortfolio = async (req, res) => {
  try {
    const { data, error } = validatePortfolioPayload(req.body);
    if (error) {
      return res.status(400).json({ error });
    }

    const uploadedImageUrl = await resolveUploadedImageUrl(req, 'vedteix/portfolios');
    const update = {
      ...data,
      imageUrl: uploadedImageUrl || data.imageUrl,
    };

    const portfolio = await Portfolio.findByIdAndUpdate(req.params.id, update, {
      new: true,
      runValidators: true,
    });
    if (!portfolio) {
      return res.status(404).json({ error: 'Portfolio not found' });
    }

    res.json(portfolio);
  } catch (error) {
    console.error('Failed to update portfolio:', error);
    res.status(500).json({ error: 'Failed to update portfolio' });
  }
};

exports.deletePortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findByIdAndDelete(req.params.id);
    if (!portfolio) {
      return res.status(404).json({ error: 'Portfolio not found' });
    }

    res.json({ message: 'Portfolio deleted' });
  } catch (error) {
    console.error('Failed to delete portfolio:', error);
    res.status(500).json({ error: 'Failed to delete portfolio' });
  }
};
