import type { Metadata } from 'next';
import localFont from 'next/font/local';

import '../styles/globals.css';
import Providers from './providers';

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: {
    default: 'UFO-Fi - 데이터는 부족해도, 은하는 연결되어 있다',
    template: '%s | UFO-Fi',
  },
  description:
    'UFO-Fi는 데이터 부족 상황에서도 은하계를 연결하는 혁신적인 플랫폼입니다. 카카오 로그인으로 간편하게 시작하세요.',
  keywords: [
    'UFO-Fi',
    '데이터 연결',
    '은하계',
    '소셜 플랫폼',
    '카카오 로그인',
    '모바일 앱',
    '데이터 공유',
  ],
  authors: [{ name: 'UFO-Fi Team' }],
  creator: 'UFO-Fi',
  publisher: 'UFO-Fi',
  category: 'Technology',
  classification: 'Social Platform',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://ufo-fi.store'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: '/',
    siteName: 'UFO-Fi',
    title: 'UFO-Fi - 데이터는 부족해도, 은하는 연결되어 있다',
    description: 'UFO-Fi는 데이터 부족 상황에서도 은하계를 연결하는 혁신적인 플랫폼입니다.',
    // TODO: Open Graph 썸네일 이미지 추가 후 주석 해제
    // images: [
    //   {
    //     url: '/images/og-thumbnail.svg',
    //     width: 1200,
    //     height: 630,
    //     alt: 'UFO-Fi - 데이터는 부족해도, 은하는 연결되어 있다',
    //     type: 'image/svg+xml',
    //   },
    // ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@UFOFi',
    creator: '@UFOFi',
    title: 'UFO-Fi - 데이터는 부족해도, 은하는 연결되어 있다',
    description: 'UFO-Fi는 데이터 부족 상황에서도 은하계를 연결하는 혁신적인 플랫폼입니다.',
    // TODO: Open Graph 썸네일 이미지 추가 후 주석 해제
    // images: ['/images/og-thumbnail.svg'],
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
  // 파비콘 및 아이콘 설정
  // - favicon.ico: 브라우저 탭, 북마크 기본 아이콘
  // - icon: 일반 브라우저용 다양한 크기 아이콘
  // - apple: iOS Safari 전용 아이콘
  // - manifest: PWA 설치 지원
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-60x60.png', sizes: '60x60', type: 'image/png' },
      { url: '/icon-72x72.png', sizes: '72x72', type: 'image/png' },
      { url: '/icon-76x76.png', sizes: '76x76', type: 'image/png' },
      { url: '/icon-114x114.png', sizes: '114x114', type: 'image/png' },
      { url: '/icon-120x120.png', sizes: '120x120', type: 'image/png' },
      { url: '/icon-144x144.png', sizes: '144x144', type: 'image/png' },
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
      { url: '/icon-60x60.png', sizes: '60x60', type: 'image/png' },
      { url: '/icon-76x76.png', sizes: '76x76', type: 'image/png' },
      { url: '/icon-120x120.png', sizes: '120x120', type: 'image/png' },
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
  manifest: '/manifest.json',
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'UFO-Fi',
    'application-name': 'UFO-Fi',
    'msapplication-TileColor': '#000000',
    'theme-color': '#000000',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${pretendard.className} antialiased min-h-screen bg-transparent`}
        style={
          {
            '--font-pyeongchangpeace-bold': 'PyeongChangPeace-Bold',
            '--font-pyeongchangpeace-light': 'PyeongChangPeace-Light',
          } as React.CSSProperties
        }
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
