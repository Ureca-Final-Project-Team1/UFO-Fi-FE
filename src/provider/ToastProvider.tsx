'use client';

import { Toaster } from 'sonner';

export function ToastProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster
        position="bottom-center"
        expand={true}
        richColors={true}
        closeButton={true}
        duration={3000}
        visibleToasts={1}
        offset="120px"
        containerAriaLabel="알림"
        className="z-[9999]"
      />
    </>
  );
}
