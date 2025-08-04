'use client';

import { Toaster } from 'sonner';

export function ToastProvider({ children }: { children?: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster
        position="bottom-center"
        expand
        richColors
        closeButton
        duration={3000}
        visibleToasts={1}
        containerAriaLabel="알림"
        offset={50} // BottomNav 위로 50px
        toastOptions={{
          style: {
            marginBottom: '0px',
          },
        }}
      />
      <style jsx global>{`
        @media (max-width: 768px) {
          [data-sonner-toaster] {
            bottom: 60px !important;
            position: fixed !important;
          }
        }
      `}</style>
    </>
  );
}
