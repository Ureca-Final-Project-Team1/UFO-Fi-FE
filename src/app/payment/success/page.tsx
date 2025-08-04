'use client';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense, useRef } from 'react';
import { toast } from 'sonner';

import { paymentAPI } from '@/backend';
import { PACKAGES } from '@/constants';
import { IMAGE_PATHS } from '@/constants/images';
import { useMyInfo } from '@/features/mypage/hooks/useMyInfo';
import { Button, Loading, TitleWithoutRouter } from '@/shared';
import { useViewportStore } from '@/stores/useViewportStore';

function PaymentSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isMobile = useViewportStore((state) => state.isMobile);
  const { refetch: refetchUserInfo } = useMyInfo();

  const [isConfirming, setIsConfirming] = useState(true);
  const [chargedAmount, setChargedAmount] = useState<number>(0);
  const [newZetBalance, setNewZetBalance] = useState<number | null>(null);
  const hasExecutedRef = useRef(false);

  useEffect(() => {
    const confirmPayment = async () => {
      if (hasExecutedRef.current) {
        return;
      }

      const paymentKey = searchParams.get('paymentKey');
      const orderId = searchParams.get('orderId');
      const amount = searchParams.get('amount');

      if (!paymentKey || !orderId || !amount) {
        toast.error('결제 정보가 올바르지 않습니다.');
        router.push('/charge');
        return;
      }

      hasExecutedRef.current = true;

      try {
        const paymentAmount = parseInt(amount);

        // 결제 금액으로부터 ZET 수량 역산
        const packageInfo = PACKAGES.find((pkg) => pkg.price === paymentAmount);
        if (!packageInfo) {
          throw new Error(`결제 금액 ${paymentAmount}원에 해당하는 패키지를 찾을 수 없습니다.`);
        }

        const zetAmount = packageInfo.zet;

        const confirmResponse = await paymentAPI.confirm({
          paymentKey,
          orderId,
          amount: zetAmount,
          price: paymentAmount,
        });

        setChargedAmount(confirmResponse.amount || zetAmount);
        setNewZetBalance(confirmResponse.zetAsset);

        const updatedUserInfo = await refetchUserInfo();
        if (updatedUserInfo.data) {
          setNewZetBalance(updatedUserInfo.data.zetAsset);
        }

        toast.success('ZET 충전이 완료되었습니다!');
      } catch (error) {
        toast.error(
          `결제 승인 중 오류가 발생했습니다: ${error instanceof Error ? error.message : '알 수 없는 오류'}`,
        );
        router.push('/payment/fail');
      } finally {
        setIsConfirming(false);
        // orderId는 성공/실패와 관계없이 제거하지 않음 (중복 방지 유지)
      }
    };

    confirmPayment();
  }, []); // 의존성 배열을 비워서 마운트 시에만 실행

  if (isConfirming) {
    return <Loading />;
  }

  return (
    <div className="bg-gradient-to-b from-primary-900 to-primary-800 flex flex-col">
      <TitleWithoutRouter title="" iconVariant="close" />

      <div className="flex-1 flex items-center justify-center px-6">
        <div
          className={`flex flex-col items-center text-center ${isMobile ? 'space-y-4' : 'space-y-6'} max-w-sm w-full`}
        >
          <div className="relative mb-4">
            <Image
              src={IMAGE_PATHS['AL_SUCCESS']}
              alt="결제 성공"
              width={117}
              height={201}
              className="drop-shadow-2xl"
            />
          </div>

          {/* 메인 메시지 */}
          <div className="space-y-2">
            <h1 className="heading-24-bold text-white">ZET 충전 완료!</h1>
            <p className="body-16-medium text-gray-300">
              외계 전파 코인이 성공적으로 충전되었습니다.
            </p>
          </div>

          {/* 충전된 ZET 정보 카드 */}
          <div className="w-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm border border-cyan-400/30 rounded-2xl p-6 space-y-4">
            <div className="text-center">
              <p className="body-14-medium text-cyan-300 mb-1">충전 완료</p>
              <div className="flex items-center justify-center gap-2">
                <span className="heading-32-bold text-cyan-400">
                  +{chargedAmount.toLocaleString()}
                </span>
                <span className="heading-20-bold text-cyan-400">ZET</span>
              </div>
            </div>

            {/* 구분선 */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"></div>

            {/* 현재 잔액 */}
            {newZetBalance !== null && (
              <div className="text-center">
                <p className="body-14-medium text-gray-300 mb-1">현재 보유 ZET</p>
                <div className="flex items-center justify-center gap-2">
                  <span className="heading-24-bold text-white">
                    {newZetBalance.toLocaleString()}
                  </span>
                  <span className="body-16-bold text-white">ZET</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 하단 버튼 - 고정 위치 */}
      <div className="flex-shrink-0 p-6 pb-8 space-y-3">
        <Button size="full-width" variant="primary" onClick={() => router.push('/')}>
          홈으로 돌아가기
        </Button>
        <Button size="full-width" variant="secondary" onClick={() => router.push('/charge')}>
          추가 충전하기
        </Button>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<Loading />}>
      <PaymentSuccessContent />
    </Suspense>
  );
}
