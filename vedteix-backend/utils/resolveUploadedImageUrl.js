const cloudinary = require('../config/cloudinary');
const streamifier = require('streamifier');

/**
 * Multer + CloudinaryStorage sets `file.path` to the secure URL after upload.
 * Memory storage provides `file.buffer` and needs a second upload — handled below.
 */
async function resolveUploadedImageUrl(req, folder) {
  if (!req.file) {
    return '';
  }

  const path = req.file.path;
  if (typeof path === 'string' && /^https?:\/\//i.test(path.trim())) {
    return path.trim();
  }

  if (req.file.buffer && Buffer.isBuffer(req.file.buffer)) {
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream({ folder }, (error, uploadResult) => {
        if (uploadResult) {
          resolve(uploadResult);
          return;
        }
        reject(error);
      });
      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });
    return result.secure_url || '';
  }

  return '';
}

module.exports = { resolveUploadedImageUrl };
