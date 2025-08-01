'use client';

import { Analytics } from '@vercel/analytics/react';

import {
  ModalProvider,
  QueryProvider,
  ViewportObserverProvider,
  AppLayoutProvider,
  AuthProvider,
  FCMProvider,
  ToastProvider,
  AnalyticsProvider,
} from '@/provider';

interface ProvidersProps {
  children: React.ReactNode;
}

/**
 * 전역 Provider들을 통합 관리하는 컴포넌트
 * - 모든 전역 상태 관리자들을 계층적으로 구성
 */
export default function Providers({ children }: ProvidersProps) {
  return (
    <>
      <AnalyticsProvider />
      <QueryProvider>
        <ViewportObserverProvider>
          <AppLayoutProvider>
            <AuthProvider>
              <FCMProvider>
                <ToastProvider>
                  {children}
                  <Analytics />
                </ToastProvider>
              </FCMProvider>
            </AuthProvider>
          </AppLayoutProvider>
          <ModalProvider />
        </ViewportObserverProvider>
      </QueryProvider>
    </>
  );
}
