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
  async rewrites() {
    return [
      {
        source: '/sell/edit/:id',
        destination: '/sell/edit/[id]',
      },
      {
        source: '/exchange/purchase/:id',
        destination: '/exchange/purchase/[id]',
      },
      {
        source: '/exchange/purchase/:id/step1',
        destination: '/exchange/purchase/[id]/step1',
      },
      {
        source: '/exchange/purchase/:id/step2',
        destination: '/exchange/purchase/[id]/step2',
      },
      {
        source: '/exchange/purchase/:id/step3',
        destination: '/exchange/purchase/[id]/step3',
      },
      {
        source: '/profile/:id',
        destination: '/profile/[id]',
      },
      {
        source: '/api/notifications/:id/read',
        destination: '/api/notifications/[id]/read',
      },
    ];
  },
};

export default nextConfig;
