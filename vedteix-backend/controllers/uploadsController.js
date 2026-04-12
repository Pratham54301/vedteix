exports.uploadAsset = async (req, res) => {
  try {
    const url =
      (typeof req.file?.path === 'string' && /^https?:\/\//i.test(req.file.path.trim()) && req.file.path.trim()) ||
      req.file?.secure_url ||
      req.file?.url ||
      '';

    if (!url) {
      return res.status(400).json({ error: 'No file was uploaded' });
    }

    res.status(201).json({
      url,
      publicId: req.file.filename || req.file.public_id || '',
    });
  } catch (error) {
    console.error('Failed to upload asset:', error);
    res.status(500).json({ error: 'Failed to upload asset' });
  }
};
