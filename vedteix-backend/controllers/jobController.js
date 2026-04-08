const Job = require('../models/Job');
const sendMail = require('../utils/mailer');
const {
  isNonEmptyString,
  isValidEmail,
  isValidUrl,
  normalizeString,
  normalizeStringArray,
  toBoolean,
} = require('../utils/validation');

function validateJobPayload(body) {
  const {
    title,
    company,
    location,
    type,
    experience,
    description,
    applyUrl,
    applyEmail,
    skills,
    techStack,
    featured,
  } = body || {};

  if (!isNonEmptyString(title, { min: 2, max: 140 })) {
    return { error: 'Job title is required' };
  }

  if (!isNonEmptyString(location, { min: 2, max: 140 })) {
    return { error: 'Location is required' };
  }

  if (!isNonEmptyString(type, { min: 2, max: 60 })) {
    return { error: 'Employment type is required' };
  }

  if (!isNonEmptyString(description, { min: 10, max: 5000 })) {
    return { error: 'Description must be at least 10 characters long' };
  }

  if (applyUrl && !isValidUrl(applyUrl)) {
    return { error: 'Please provide a valid application URL' };
  }

  if (applyEmail && !isValidEmail(applyEmail)) {
    return { error: 'Please provide a valid application email address' };
  }

  return {
    data: {
      title: normalizeString(title, { max: 140 }),
      company: normalizeString(company, { max: 140, fallback: 'VEDTEIX TECHNOLOGY' }) || 'VEDTEIX TECHNOLOGY',
      location: normalizeString(location, { max: 140 }),
      type: normalizeString(type, { max: 60 }),
      experience: normalizeString(experience, { max: 80, fallback: 'Not specified' }) || 'Not specified',
      description: normalizeString(description, { max: 5000 }),
      applyUrl: normalizeString(applyUrl, { max: 300 }),
      applyEmail: normalizeString(applyEmail, { max: 254 }).toLowerCase(),
      skills: normalizeStringArray(skills),
      techStack: normalizeStringArray(techStack),
      featured: toBoolean(featured),
    },
  };
}

exports.createJob = async (req, res) => {
  try {
    const { data, error } = validateJobPayload(req.body);
    if (error) {
      return res.status(400).json({ error });
    }

    const job = await Job.create(data);

    await sendMail({
      subject: `New Job Created: ${job.title}`,
      text: `A new job "${job.title}" at ${job.company} was just posted.\nLocation: ${job.location}\nType: ${job.type}`,
      html: `
        <h2>New Job Created</h2>
        <p><b>Title:</b> ${job.title}</p>
        <p><b>Company:</b> ${job.company}</p>
        <p><b>Location:</b> ${job.location}</p>
        <p><b>Type:</b> ${job.type}</p>
        <p><b>Description:</b> ${job.description}</p>
      `,
    });

    res.status(201).json(job);
  } catch (error) {
    console.error('Failed to create job:', error);
    res.status(500).json({ error: 'Failed to create job' });
  }
};

exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ featured: -1, createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    console.error('Failed to load jobs:', error);
    res.status(500).json({ error: 'Failed to load jobs' });
  }
};

exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    res.json(job);
  } catch (error) {
    console.error('Failed to load job:', error);
    res.status(500).json({ error: 'Failed to load job' });
  }
};

exports.updateJob = async (req, res) => {
  try {
    const { data, error } = validateJobPayload(req.body);
    if (error) {
      return res.status(400).json({ error });
    }

    const job = await Job.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    });
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    res.json(job);
  } catch (error) {
    console.error('Failed to update job:', error);
    res.status(500).json({ error: 'Failed to update job' });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    res.json({ message: 'Job deleted' });
  } catch (error) {
    console.error('Failed to delete job:', error);
    res.status(500).json({ error: 'Failed to delete job' });
  }
};
