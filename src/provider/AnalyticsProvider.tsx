'use client';

import { GoogleTagManager } from '@next/third-parties/google';
import { useEffect } from 'react';

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || '';
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID || '';

export function AnalyticsProvider() {
  // Clarity 초기화
  useEffect(() => {
    if (CLARITY_ID) {
      try {
        // 동적 import를 사용하여 패키지가 없을 때 오류 방지
        import('@microsoft/clarity')
          .then((clarity) => {
            clarity.default.init(CLARITY_ID);
          })
          .catch((error) => {
            console.warn('Clarity 패키지를 불러올 수 없습니다:', error);
          });
      } catch (error) {
        console.warn('Clarity 초기화 실패:', error);
      }
    }
  }, []);

  return (
    <>
      {/* Google Tag Manager */}
      {GTM_ID && <GoogleTagManager gtmId={GTM_ID} />}
    </>
  );
}
