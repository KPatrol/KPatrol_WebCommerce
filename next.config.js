/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Trailing slash for better static hosting
  trailingSlash: true,
  
  // Image optimization
  images: {
    unoptimized: process.env.DOCKER_BUILD !== 'true',
    domains: ['localhost', 'images.unsplash.com'],
  },
  
  // Environment variables
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://kpatrol.khoavd.online',
  },
  
  // Output configuration
  // - 'standalone' for Docker deployment (server-side rendering)
  // - 'export' for Netlify static hosting
  output: process.env.DOCKER_BUILD === 'true' ? 'standalone' : 'export',
};

module.exports = nextConfig;
