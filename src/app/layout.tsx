import type { Metadata } from 'next';
import localFont from 'next/font/local';

import '../styles/globals.css';
import { ModalProvider, QueryProvider } from '@/provider';
import BackgroundProvider from '@/provider/BackgroundProvider';
import NavigationProvider from '@/provider/NavigationProvider';
import OnboardingGuardProvider from '@/provider/OnboardingGuardProvider';

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
      <body className={`${pretendard.variable} antialiased`}>
        <QueryProvider>
          <NavigationProvider>
            <BackgroundProvider>
              <OnboardingGuardProvider>{children}</OnboardingGuardProvider>
            </BackgroundProvider>
          </NavigationProvider>
          <ModalProvider />
        </QueryProvider>
      </body>
    </html>
  );
}
