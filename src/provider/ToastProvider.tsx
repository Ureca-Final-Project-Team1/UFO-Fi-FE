'use client';

import { TOAST_CONFIG } from '@/constants';
import { Toaster } from '@/shared';

interface ToastProviderProps {
  children: React.ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  return (
    <>
      {children}
      <Toaster className={`fixed bottom-[${TOAST_CONFIG.BOTTOM_OFFSET}px] z-[9999]`} />
    </>
  );
}
