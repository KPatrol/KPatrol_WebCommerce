/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Static export for Netlify deployment
  output: 'export',
  
  // Trailing slash for better static hosting
  trailingSlash: true,
  
  // Image optimization (disabled for static export)
  images: {
    unoptimized: true,
    domains: ['localhost', 'images.unsplash.com'],
  },
  
  // Environment variables
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://kpatrol.io',
  },
};

module.exports = nextConfig;
