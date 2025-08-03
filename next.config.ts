import type { NextConfig } from 'next';

const imageHostname =
  process.env.NEXT_PUBLIC_IMAGE_DOMAIN || 'ufo-fi-service-bucket.s3.ap-northeast-2.amazonaws.com';

const nextConfig: NextConfig = {
  turbopack: {},
  trailingSlash: false,
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
  experimental: {
    esmExternals: true,
  },
  async headers() {
    return [
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
