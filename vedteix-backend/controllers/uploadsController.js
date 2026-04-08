exports.uploadAsset = async (req, res) => {
  try {
    if (!req.file?.path) {
      return res.status(400).json({ error: 'No file was uploaded' });
    }

    res.status(201).json({
      url: req.file.path,
      publicId: req.file.filename || '',
    });
  } catch (error) {
    console.error('Failed to upload asset:', error);
    res.status(500).json({ error: 'Failed to upload asset' });
  }
};
