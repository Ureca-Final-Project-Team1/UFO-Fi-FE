import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import localFont from 'next/font/local';

import '../styles/globals.css';
import { TOAST_CONFIG } from '@/constants';
import {
  ModalProvider,
  QueryProvider,
  ViewportObserverProvider,
  NavigationProvider,
  OnboardingGuardProvider,
  BackgroundProvider,
} from '@/provider';
import AnalyticsProvider from '@/shared/components/Analytics';
import FCMProvider from '@/shared/components/FCMProvider';
import { Toaster } from '@/shared/ui';

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
        className={`${pretendard.variable} antialiased min-h-screen bg-transparent`}
        style={
          {
            '--font-pyeongchangpeace-bold': 'PyeongChangPeace-Bold',
            '--font-pyeongchangpeace-light': 'PyeongChangPeace-Light',
          } as React.CSSProperties
        }
      >
        <AnalyticsProvider />
        <QueryProvider>
          <ViewportObserverProvider>
            <NavigationProvider>
              <BackgroundProvider>
                <OnboardingGuardProvider>
                  <FCMProvider>
                    {children}
                    <Analytics />
                  </FCMProvider>
                </OnboardingGuardProvider>
              </BackgroundProvider>
            </NavigationProvider>
            <ModalProvider />
          </ViewportObserverProvider>
        </QueryProvider>
        <Toaster style={{ bottom: TOAST_CONFIG.BOTTOM_OFFSET }} />
      </body>
    </html>
  );
}
