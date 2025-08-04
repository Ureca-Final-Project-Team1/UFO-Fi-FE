import localFont from 'next/font/local';

import '../styles/globals.css';
import { DEFAULT_METADATA } from '@/constants';

import Providers from './providers';

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export const metadata = DEFAULT_METADATA;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${pretendard.className} antialiased bg-transparent`}
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
