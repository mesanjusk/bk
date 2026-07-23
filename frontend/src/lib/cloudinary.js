import { v2 as cloudinary } from 'cloudinary';

// The SDK only auto-reads a single CLOUDINARY_URL variable. Support that,
// but fall back to the separate CLOUDINARY_CLOUD_NAME / CLOUDINARY_API_KEY /
// CLOUDINARY_API_SECRET values shown on the Cloudinary dashboard, since
// that's how credentials are commonly configured on hosts like Vercel.
if (!process.env.CLOUDINARY_URL && process.env.CLOUDINARY_CLOUD_NAME) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
} else {
  cloudinary.config({ secure: true });
}

export default cloudinary;
