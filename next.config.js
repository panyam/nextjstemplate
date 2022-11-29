/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  distDir: 'build',
   experimental: {
    externalDir: true
  },
}

module.exports = nextConfig
