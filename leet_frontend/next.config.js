/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  allowedDevOrigins: ['127.0.0.1'],

  env: {
    API_URL: process.env.API_URL,
  },
  // basePath: '/leet',
};
