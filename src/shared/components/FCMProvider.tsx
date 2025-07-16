'use client';

import { useEffect } from 'react';

import {
  generateFCMToken,
  setupForegroundMessageListener,
  saveFCMTokenToServer,
  isFCMSupported,
} from '@/lib/fcm';

interface FCMProviderProps {
  children: React.ReactNode;
}

export default function FCMProvider({ children }: FCMProviderProps) {
  useEffect(() => {
    const initializeFCM = async () => {
      try {
        // FCM 지원 여부 확인
        const supported = await isFCMSupported();
        if (!supported) {
          console.warn('FCM is not supported in this browser');
          return;
        }

        // 포그라운드 메시지 리스너 설정
        setupForegroundMessageListener();

        // FCM 토큰 생성 및 서버 저장
        const token = await generateFCMToken();
        if (token) {
          // 로컬 스토리지에 토큰 저장
          const savedToken = localStorage.getItem('fcm_token');
          if (savedToken !== token) {
            await saveFCMTokenToServer(token);
            localStorage.setItem('fcm_token', token);
          }
        }

        // eslint-disable-next-line no-console
        console.log('FCM initialized successfully');
      } catch (error) {
        console.error('FCM initialization failed:', error);
      }
    };

    // 컴포넌트 마운트 시 FCM 초기화
    initializeFCM();

    // 페이지 가시성 변경 시 토큰 갱신
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        initializeFCM();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return <>{children}</>;
}
