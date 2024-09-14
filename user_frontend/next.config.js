/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  env: {
    API_URL: process.env.API_URL,
  },
  serverRuntimeConfig: {
    // Will only be available on the server side
    apiUrl: 'http://api_phishyfish:8000'
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    apiUrl: process.env.API_URL
  },
  basePath: process.env.SUB_DIR,
  assetPrefix: process.env.SUB_DIR
};
