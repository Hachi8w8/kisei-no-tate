/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(woff|woff2|ttf|otf)$/,
      use: {
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'static/fonts/',
          publicPath: '/kisei-no-tate/static/fonts/'
        }
      }
    });
    return config;
  },
  output: 'export',
  basePath: '/kisei-no-tate',
  assetPrefix: '/kisei-no-tate/',
  images: {
    unoptimized: true,
    loader: 'custom',
    path: '/kisei-no-tate'
  },
  distDir: 'docs',
  trailingSlash: true
}

module.exports = nextConfig 