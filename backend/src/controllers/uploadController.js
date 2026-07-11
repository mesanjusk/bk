const cloudinary = require('../config/cloudinary');

function uploadFromBuffer(buffer) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'mita-foundation/scholars', resource_type: 'image' },
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
      return res.status(400).json({ error: 'No image file was provided.' });
    }

    const result = await uploadFromBuffer(req.file.buffer);
    res.status(201).json({ url: result.secure_url });
  } catch (error) {
    next(error);
  }
}

module.exports = { uploadImage };
