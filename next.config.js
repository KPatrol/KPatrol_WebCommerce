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
  
  // Output: 'standalone' for Docker; default Next.js server for Netlify
  // (Netlify runs Next.js with API routes via @netlify/plugin-nextjs).
  output: process.env.DOCKER_BUILD === 'true' ? 'standalone' : undefined,
};

module.exports = nextConfig;
