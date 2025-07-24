import type { NextConfig } from 'next';

const imageHostname =
  process.env.NEXT_PUBLIC_IMAGE_DOMAIN || 'ufo-fi-service-bucket.s3.ap-northeast-2.amazonaws.com';

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
