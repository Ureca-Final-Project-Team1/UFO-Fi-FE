import type { Metadata } from 'next';
import localFont from 'next/font/local';

import '../styles/globals.css';
import BottomNav from '@/components/layout/BottomNav/BottomNav';
import TopNav from '@/components/layout/TopNav/TopNav';
import { ModalProvider } from '@/provider';

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

function InternalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-gray-100 flex justify-center">
      {/* 크로스브라우징 지원 프레임 */}
      <div className="relative w-full min-w-[375px] max-w-[620px] bg-white overflow-hidden h-screen">
        {/* TopNav */}
        <TopNav title="UFO-Fi" />

        {/* 메인 콘텐츠 영역 */}
        <main
          className="px-4 overflow-y-auto hide-scrollbar bg-white"
          style={{
            height: 'calc(100dvh - 112px)',
            marginTop: '56px',
            WebkitOverflowScrolling: 'touch',
            overscrollBehavior: 'contain',
          }}
        >
          {children}
        </main>

        {/* BottomNav */}
        <BottomNav />
      </div>
    </div>
  );
}

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
      <body className={`${pretendard.variable} antialiased`}>
        <InternalLayout>
          {children}
          <ModalProvider />
        </InternalLayout>
      </body>
    </html>
  );
}
