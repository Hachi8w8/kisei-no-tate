/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/kisei-no-tate',
  images: {
    unoptimized: true,
  },
  distDir: 'docs'
}

module.exports = nextConfig 