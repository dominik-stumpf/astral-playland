/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, {isServer}) => {
    if (!isServer) {
      config.externals.push('sharp')
    }
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      use: 'raw-loader',
    });
    return config;
  },
}

const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  disable: process.env.NODE_ENV === 'development',
});

module.exports = withPWA(
  nextConfig
);
