'use client';

import { useEffect } from 'react';
import { Toaster } from 'sonner';

export function ToastProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const adjustToasterPosition = () => {
      const toaster = document.querySelector('[data-sonner-toaster]') as HTMLElement | null;
      if (!toaster) return;

      toaster.style.bottom = '100px';
      toaster.style.position = 'fixed';
      toaster.style.zIndex = '9999';
    };

    // 최초 렌더 완료 대기 후 적용
    const waitForToaster = () => {
      const toaster = document.querySelector('[data-sonner-toaster]');
      if (toaster) {
        adjustToasterPosition();
      } else {
        requestAnimationFrame(waitForToaster);
      }
    };
    waitForToaster();

    // 리사이즈 시 보정
    window.addEventListener('resize', adjustToasterPosition);

    // 부모 DOM 변경 시 위치 보정
    const toasterContainer = document.querySelector('[data-sonner-toaster]')?.parentElement;
    const observer = toasterContainer ? new MutationObserver(adjustToasterPosition) : null;
    if (observer && toasterContainer) {
      observer.observe(toasterContainer, { childList: true });
    }

    return () => {
      window.removeEventListener('resize', adjustToasterPosition);
      observer?.disconnect();
    };
  }, []);

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
      />
    </>
  );
}
