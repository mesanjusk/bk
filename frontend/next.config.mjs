/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: '**' },
    ],
  },
  async rewrites() {
    return {
      beforeFiles: [{ source: '/', destination: '/badhte-kadam.html' }],
    };
  },
};

export default nextConfig;
