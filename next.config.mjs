/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    SPOONACULAR_API_KEY: process.env.SPOONACULAR_API_KEY,
  },
};

export default nextConfig;
