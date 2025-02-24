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
          publicPath: '/_next/static/fonts/'
        }
      }
    });
    return config;
  },
  output: 'export',
  basePath: '/kisei-no-tate',  // リポジトリ名に修正
  images: {
    unoptimized: true,
  },
  distDir: 'docs'
}

module.exports = nextConfig 