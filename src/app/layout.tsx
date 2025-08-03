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
    default: 'UFO-Fi - 수탁 구조 기반 유휴 모바일 데이터 C2C 거래 플랫폼',
    template: '%s | UFO-Fi',
  },
  description: '데이터는 부족해도, 은하는 연결되어 있다. 카카오 로그인으로 간편하게 시작하세요.',
  keywords: [
    'UFO-Fi',
    '유포파이',
    '데이터 거래',
    '모바일 데이터 거래',
    '유휴 데이터 거래',
    '데이터 판매',
    '데이터 구매',
    'C2C 데이터 거래',
    '데이터 마켓플레이스',
    '데이터 플랫폼',
    '수탁 구조',
    '블록체인 거래',
    'P2P 거래',
    '탈중앙화 거래',
    'SKT 데이터',
    'KT 데이터',
    'LG유플러스 데이터',
    '통신사 데이터',
    '5G 데이터',
    'LTE 데이터',
    '대학생 데이터',
    '직장인 데이터',
    '데이터 절약',
    '데이터 공유',
    '데이터 중개',
    'ZET 토큰',
    '데이터 충전',
    '즉시 거래',
    '안전한 거래',
    '실시간 거래',
    '은하계',
    '소셜 플랫폼',
    '커뮤니티 거래',
    '신뢰 거래',
    '카카오 로그인',
    '소셜 로그인',
    '모바일 앱',
    '웹 플랫폼',
    '온라인 거래',
    '디지털 자산',
    '데이터 경제',
    '공유 경제',
    '긱 이코노미',
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
        url: '/images/open-graph.png',
        width: 1200,
        height: 630,
        alt: 'UFO-Fi - 데이터는 부족해도, 은하는 연결되어 있다',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@UFOFi',
    creator: '@UFOFi',
    title: 'UFO-Fi - 수탁 구조 기반 유휴 모바일 데이터 C2C 거래 플랫폼',
    description: '데이터는 부족해도, 은하는 연결되어 있다',
    images: ['/images/open-graph.png'],
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
