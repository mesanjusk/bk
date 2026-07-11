const cloudinary = require('../config/cloudinary');

function uploadFromBuffer(buffer, resourceType) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'mita-foundation', resource_type: resourceType },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    stream.end(buffer);
  });
}

async function uploadImage(req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file was provided.' });
    }

    const resourceType = req.file.mimetype.startsWith('video/') ? 'video' : 'image';
    const result = await uploadFromBuffer(req.file.buffer, resourceType);
    res.status(201).json({ url: result.secure_url, type: resourceType });
  } catch (error) {
    next(error);
  }
}

module.exports = { uploadImage };
