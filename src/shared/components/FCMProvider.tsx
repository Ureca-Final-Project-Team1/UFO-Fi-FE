'use client';

import { useEffect } from 'react';

import { setupMessageListener } from '@/lib/fcm';

interface FCMProviderProps {
  children: React.ReactNode;
}

export default function FCMProvider({ children }: FCMProviderProps) {
  useEffect(() => {
    setupMessageListener();
  }, []);

  return <>{children}</>;
}
