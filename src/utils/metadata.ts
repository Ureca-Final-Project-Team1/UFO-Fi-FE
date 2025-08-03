import type { Metadata } from 'next';

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  noIndex?: boolean;
}

export const createMetadata = (config: SEOConfig): Metadata => {
  const {
    title,
    description,
    keywords = [],
    image = '/images/main/alien.svg',
    url = '/',
    type = 'website',
    noIndex = false,
  } = config;

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://ufo-fi.com';
  const fullUrl = `${baseUrl}${url}`;
  const fullImageUrl = `${baseUrl}${image}`;

  return {
    title: {
      default: title,
      template: '%s | UFO-Fi',
    },
    description,
    keywords: ['UFO-Fi', '데이터 연결', '은하계', '소셜 플랫폼', ...keywords],
    authors: [{ name: 'UFO-Fi Team' }],
    creator: 'UFO-Fi',
    publisher: 'UFO-Fi',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url: fullUrl,
      siteName: 'UFO-Fi',
      locale: 'ko_KR',
      type,
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: title,
          type: 'image/svg+xml',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@UFOFi',
      creator: '@UFOFi',
      title,
      description,
      images: [fullImageUrl],
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
      yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
      yahoo: process.env.NEXT_PUBLIC_YAHOO_VERIFICATION,
    },
  };
};

export const createPageMetadata = (config: SEOConfig): Metadata => {
  return createMetadata({
    ...config,
    noIndex: true, // 페이지별 메타데이터는 기본적으로 noIndex
  });
};

export const createPublicPageMetadata = (config: SEOConfig): Metadata => {
  return createMetadata({
    ...config,
    noIndex: false, // 공개 페이지는 인덱싱 허용
  });
};
