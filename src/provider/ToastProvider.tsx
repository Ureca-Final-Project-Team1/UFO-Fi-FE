'use client';

import { useEffect } from 'react';
import { Toaster } from 'sonner';

export function ToastProvider({ children }: { children: React.ReactNode }) {
  // DOM 조작으로 강제 위치 조정
  useEffect(() => {
    const adjustToasterPosition = () => {
      const toaster = document.querySelector('[data-sonner-toaster]') as HTMLElement;
      if (toaster && window.innerWidth <= 768) {
        // 모바일에서 강제로 bottom 위치 조정
        toaster.style.bottom = '100px';
        toaster.style.position = 'fixed';
        toaster.style.zIndex = '9999';
      }
    };

    // 초기 실행
    setTimeout(adjustToasterPosition, 100);

    // 리사이즈 시에도 실행
    window.addEventListener('resize', adjustToasterPosition);

    // MutationObserver로 DOM 변경 감지
    const observer = new MutationObserver(adjustToasterPosition);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('resize', adjustToasterPosition);
      observer.disconnect();
    };
  }, []);

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
        containerAriaLabel="알림"
      />
    </>
  );
}
