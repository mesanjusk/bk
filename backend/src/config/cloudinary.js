const cloudinary = require('cloudinary').v2;

// Reads CLOUDINARY_URL from the environment automatically.
cloudinary.config({ secure: true });

module.exports = cloudinary;
