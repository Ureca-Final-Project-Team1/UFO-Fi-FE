'use client';

import clarity from '@microsoft/clarity';
import { GoogleTagManager } from '@next/third-parties/google';
import { useEffect } from 'react';

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || '';
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID || '';

export default function Analytics() {
  // Clarity 초기화
  useEffect(() => {
    if (CLARITY_ID) {
      clarity.init(CLARITY_ID);
    }
  }, []);

  return (
    <>
      {/* Google Tag Manager */}
      {GTM_ID && <GoogleTagManager gtmId={GTM_ID} />}
    </>
  );
}
