/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',  // 静的サイトとして出力
  images: {
    unoptimized: true,  // 静的サイト用の画像設定
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(woff|woff2|ttf|otf)$/,
      use: {
        loader: 'file-loader',
        options: {
          name: 'static/fonts/[name].[ext]',
        }
      }
    });
    return config;
  }
}

module.exports = nextConfig 