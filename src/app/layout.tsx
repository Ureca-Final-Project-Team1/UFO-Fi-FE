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
    images: [
      {
        url: '/images/main/alien.svg',
        width: 1200,
        height: 630,
        alt: 'UFO-Fi 메인 이미지',
        type: 'image/svg+xml',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@UFOFi',
    creator: '@UFOFi',
    title: 'UFO-Fi - 데이터는 부족해도, 은하는 연결되어 있다',
    description: 'UFO-Fi는 데이터 부족 상황에서도 은하계를 연결하는 혁신적인 플랫폼입니다.',
    images: ['/images/main/alien.svg'],
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
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    yahoo: process.env.NEXT_PUBLIC_YAHOO_VERIFICATION,
  },
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
