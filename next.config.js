/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  images: {
    domains: [
      'tile.openstreetmap.org',
      'firebasestorage.googleapis.com',
    ],
    formats: ['image/webp', 'image/avif'],
  },
  compress: true,
  poweredByHeader: false,
  experimental: {
    optimizeCss: false,
  },
};

export default nextConfig;
