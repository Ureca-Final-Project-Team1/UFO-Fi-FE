'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';

import { Button, Title } from '@/shared/ui';
import { useViewportStore } from '@/stores/useViewportStore';

function PaymentFailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isMobile = useViewportStore((state) => state.isMobile);

  const [errorInfo, setErrorInfo] = useState({
    code: '',
    message: '',
    orderId: '',
  });

  useEffect(() => {
    const code = searchParams.get('code') || '알 수 없는 오류';
    const message = searchParams.get('message') || '결제 중 오류가 발생했습니다.';
    const orderId = searchParams.get('orderId') || '';

    setErrorInfo({ code, message, orderId });
  }, [searchParams]);

  return (
    <div className="flex flex-col h-full w-full">
      <Title title="" iconVariant="close" />
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div
          className={`flex flex-col items-center text-center ${isMobile ? 'space-y-4' : 'space-y-6'}`}
        >
          <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center mb-4">
            <div className="w-8 h-8 text-red-400">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </div>
          </div>

          <div className="text-white">
            <h2 className={`${isMobile ? 'body-20-bold' : 'heading-24-bold'} mb-2`}>
              결제가 취소되었습니다
            </h2>
            <p className="body-16-medium text-gray-300 mb-4">{errorInfo.message}</p>

            {errorInfo.code && (
              <div className="bg-white/10 rounded-lg p-4 text-left">
                <p className="text-red-300 text-sm mb-1">오류 코드: {errorInfo.code}</p>
                {errorInfo.orderId && (
                  <p className="text-gray-400 text-xs">주문번호: {errorInfo.orderId}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex-shrink-0 p-6 pb-8 space-y-3">
        <Button size="full-width" variant="secondary" onClick={() => router.push('/charge')}>
          다시 시도
        </Button>

        <Button size="full-width" variant="primary" onClick={() => router.push('/')}>
          홈으로 돌아가기
        </Button>
      </div>
    </div>
  );
}

export default function PaymentFailPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-white">결제 정보를 확인하는 중...</div>
        </div>
      }
    >
      <PaymentFailContent />
    </Suspense>
  );
}
