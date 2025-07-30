'use client';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';

import { IMAGE_PATHS } from '@/constants';
import { Button, Icon, Loading, Title } from '@/shared';
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
    <div className="flex flex-col min-h-full w-full">
      <Title title="" iconVariant="close" />

      {/* 메인 컨텐츠 영역 */}
      <div className="flex-1 flex flex-col items-center justify-center space-y-4">
        <div
          className={`flex flex-col items-center text-center ${isMobile ? 'space-y-4' : 'space-y-6'}`}
        >
          <div className="relative mb-4">
            <Image
              src={IMAGE_PATHS['AL_FAIL']}
              alt="결제 실패"
              width={117}
              height={201}
              className="drop-shadow-2xl"
            />
          </div>
          {/* 메인 메시지 */}
          <div className="space-y-3 w-full">
            <h2 className="heading-24-bold text-white">결제가 취소되었습니다 😔</h2>

            <p className="body-16-medium text-gray-300 leading-relaxed">{errorInfo.message}</p>

            {/* 에러 정보 카드 */}
            {errorInfo.code && (
              <div className="w-full bg-red-500/10 border border-red-400/30 rounded-2xl p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <Icon name="AlertCircle" color="red" />
                  <p className="text-red-300 body-14-medium">오류 정보</p>
                </div>
                <div className="text-left space-y-1 pl-6">
                  <p className="text-red-200 body-14-medium">코드: {errorInfo.code}</p>
                  {errorInfo.orderId && (
                    <p className="text-gray-400 body-12-medium">주문번호: {errorInfo.orderId}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 하단 버튼 영역 */}
      <div className="flex-shrink-0 py-8 space-y-3">
        <Button size="full-width" variant="secondary" onClick={() => router.push('/charge')}>
          다시 시도하기
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
    <Suspense fallback={<Loading />}>
      <PaymentFailContent />
    </Suspense>
  );
}
