import type { NextConfig } from 'next';

const imageHostname = process.env.NEXT_PUBLIC_IMAGE_DOMAIN;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: imageHostname
      ? [
          {
            protocol: 'https',
            hostname: imageHostname,
            port: '',
            pathname: '/**',
          },
        ]
      : [],
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    });
    return config;
  },
};

export default nextConfig;
