'use client';

import clarity from '@microsoft/clarity';
import { useEffect } from 'react';

const CLARITY_PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_ID || '';

export default function MSClarity() {
  useEffect(() => {
    if (CLARITY_PROJECT_ID) {
      clarity.init(CLARITY_PROJECT_ID);
    }
  }, []);

  return null;
}
