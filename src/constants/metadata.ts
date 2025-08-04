import type { Metadata } from 'next';

export const SITE_CONFIG = {
  name: 'UFO-Fi',
  title: 'UFO-Fi - 수탁 구조 기반 유휴 모바일 데이터 C2C 거래 플랫폼',
  description: '데이터는 부족해도, 은하는 연결되어 있다. 카카오 로그인으로 간편하게 시작하세요.',
  url: process.env.NEXT_PUBLIC_APP_URL || 'https://ufo-fi.store',
  ogImage: '/images/open-graph.png',
  creator: 'UFO-Fi Team',
  themeColor: '#000000',
  icons: {
    favicon: '/favicon.ico',
    faviconPng: '/favicon.png',
    icon: '/icon.png',
    appleIcon: '/apple-icon.png',
  },
} as const;

export const SEO_KEYWORDS = [
  // 브랜드
  'UFO-Fi',
  '유포파이',

  // 서비스 관련
  '데이터 거래',
  '모바일 데이터 거래',
  '유휴 데이터 거래',
  '데이터 판매',
  '데이터 구매',
  'C2C 데이터 거래',
  '데이터 마켓플레이스',
  '데이터 플랫폼',

  // 기술적 특징
  '수탁형 구조',
  '자체 화폐 거래',
  'C2C 거래',

  // 통신사
  'SKT 데이터',
  'KT 데이터',
  'LG유플러스 데이터',
  '통신사 데이터',
  '5G 데이터',
  'LTE 데이터',

  // 타겟 사용자
  '대학생 데이터',
  '직장인 데이터',
  '데이터 절약',
  '데이터 공유',
  '데이터 중개',

  // 기능
  'ZET 토큰',
  '데이터 충전',
  '즉시 거래',
  '안전한 거래',
  '실시간 거래',

  // 플랫폼 특성
  '은하계',
  '소셜 플랫폼',
  '커뮤니티 거래',
  '신뢰 거래',
  '외계인',

  // 접근성
  '카카오 로그인',
  '소셜 로그인',
  '모바일 웹앱',
  '웹 플랫폼',
  '크로스플랫폼',

  // 경제/트렌드
  '온라인 거래',
  '디지털 자산',
  '데이터 경제',
  '공유 경제',
  '긱 이코노미',
] as const;

export const DEFAULT_METADATA: Metadata = {
  title: {
    default: SITE_CONFIG.title,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [...SEO_KEYWORDS],
  authors: [{ name: SITE_CONFIG.creator }],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,
  category: 'Technology',
  classification: 'Social Platform',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(SITE_CONFIG.url),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: SITE_CONFIG.icons.favicon, sizes: 'any', type: 'image/x-icon' },
      { url: SITE_CONFIG.icons.faviconPng, sizes: '32x32', type: 'image/png' },
      { url: SITE_CONFIG.icons.icon, sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: SITE_CONFIG.icons.appleIcon, sizes: '180x180', type: 'image/png' }],
    shortcut: SITE_CONFIG.icons.favicon,
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: '/',
    siteName: SITE_CONFIG.name,
    title: `${SITE_CONFIG.name} - 데이터는 부족해도, 은하는 연결되어 있다`,
    description: `${SITE_CONFIG.name}는 데이터 부족 상황에서도 은하계를 연결하는 혁신적인 플랫폼입니다.`,
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.name} - 데이터는 부족해도, 은하는 연결되어 있다`,
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: `@${SITE_CONFIG.name}`,
    creator: `@${SITE_CONFIG.name}`,
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    images: [SITE_CONFIG.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': SITE_CONFIG.name,
    'application-name': SITE_CONFIG.name,
    'msapplication-TileColor': SITE_CONFIG.themeColor,
    'theme-color': SITE_CONFIG.themeColor,
  },
};
