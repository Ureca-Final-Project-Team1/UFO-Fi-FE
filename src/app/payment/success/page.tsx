'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { toast } from 'sonner';

import { paymentAPI } from '@/api';
import { IMAGE_PATHS } from '@/constants/images';
import { useMyInfo } from '@/features/mypage/hooks/useMyInfo';
import { Button, Icon, Title } from '@/shared/ui';
import { useViewportStore } from '@/stores/useViewportStore';

function PaymentSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isMobile = useViewportStore((state) => state.isMobile);
  const { refetch: refetchUserInfo } = useMyInfo();

  const [isConfirming, setIsConfirming] = useState(true);
  const [receiptUrl, setReceiptUrl] = useState<string>('');
  const [newZetBalance, setNewZetBalance] = useState<number | null>(null);

  useEffect(() => {
    const confirmPayment = async () => {
      const paymentKey = searchParams.get('paymentKey');
      const orderId = searchParams.get('orderId');
      const amount = searchParams.get('amount');

      if (!paymentKey || !orderId || !amount) {
        toast.error('결제 정보가 올바르지 않습니다.');
        router.push('/charge');
        return;
      }

      try {
        const confirmResponse = await paymentAPI.confirm({
          paymentKey,
          orderId,
          amount: parseInt(amount),
        });

        setReceiptUrl(confirmResponse.receiptUrl);

        const updatedUserInfo = await refetchUserInfo();
        if (updatedUserInfo.data) {
          setNewZetBalance(updatedUserInfo.data.zetAsset);
        }

        toast.success('ZET 충전이 완료되었습니다!');
      } catch {
        toast.error('결제 승인 중 오류가 발생했습니다.');
        router.push('/payment/fail');
      } finally {
        setIsConfirming(false);
      }
    };

    confirmPayment();
  }, [searchParams, router, refetchUserInfo]);

  if (isConfirming) {
    return (
      <div className="flex flex-col h-full w-full items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
          <div className="text-white">
            <h2 className="heading-24-bold mb-2">결제 승인 중입니다</h2>
            <p className="body-16-medium">잠시만 기다려주세요...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full">
      <Title title="" iconVariant="close" />
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div
          className={`flex flex-col items-center text-center ${isMobile ? 'space-y-4' : 'space-y-6'}`}
        >
          <img
            src={IMAGE_PATHS['AL_SUCCESS']}
            alt="결제 성공"
            width={117}
            height={201}
            className="mb-4"
          />

          <div
            className={`flex items-center justify-center gap-2 ${isMobile ? 'body-20-bold' : 'heading-24-bold'} text-white`}
          >
            <Icon src={IMAGE_PATHS.PAYMENT_CHECK} alt="체크" />
            <span>ZET 충전이 완료되었습니다!</span>
          </div>

          {newZetBalance !== null && (
            <div className="bg-white/10 rounded-lg p-4 mt-4">
              <p className="text-cyan-400 body-16-medium">현재 ZET 잔액</p>
              <p className="text-white heading-24-bold">{newZetBalance.toLocaleString()} ZET</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex-shrink-0 p-6 pb-8 space-y-3">
        {receiptUrl && (
          <Button
            size="full-width"
            variant="secondary"
            onClick={() => window.open(receiptUrl, '_blank')}
          >
            영수증 보기
          </Button>
        )}

        <Button size="full-width" variant="primary" onClick={() => router.push('/')}>
          확인
        </Button>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-full">
          <div className="text-white">결제 정보를 확인하는 중...</div>
        </div>
      }
    >
      <PaymentSuccessContent />
    </Suspense>
  );
}
