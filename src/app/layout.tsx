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
  title: 'UFO-Fi',
  description: 'UFO-Fi 앱',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <meta name="format-detection" content="telephone=no" />
      </head>
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
