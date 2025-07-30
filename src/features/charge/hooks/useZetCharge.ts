'use client';

import { useState } from 'react';
import { toast } from 'sonner';

import { paymentAPI } from '@/api';
import type { PaymentRequest } from '@/api/types/payment';
import { useMyInfo } from '@/features/mypage/hooks/useMyInfo';
import { generateCustomerKey } from '@/utils/uuid';

import { useTossPayments } from './useTossPayments';

const TOSS_CLIENT_KEY = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY || '';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

export function useZetCharge() {
  const [isProcessing, setIsProcessing] = useState(false);
  const { requestPayment, isLoaded, error, resetError } = useTossPayments(TOSS_CLIENT_KEY);
  const { data: userInfo } = useMyInfo();

  const handleChargePackage = async (packageId: string, zetAmount: number, price: number) => {
    if (isProcessing) {
      return;
    }

    if (!userInfo) {
      toast.error('사용자 정보를 불러올 수 없습니다.');
      return;
    }

    if (!isLoaded) {
      toast.error('결제 시스템을 준비 중입니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    if (error) {
      toast.error(`결제 시스템에 오류가 발생했습니다!`);
      return;
    }

    resetError();
    setIsProcessing(true);

    try {
      const timestamp = Date.now();
      const randomSuffix = Math.random().toString(36).substring(2, 8);

      const orderId = `UFO-${timestamp}-${randomSuffix}`.toUpperCase();
      const packageName = `ZET 패키지 ${packageId} (${zetAmount} ZET)`;

      const baseCustomerKey = generateCustomerKey(userInfo.nickname ?? userInfo.email ?? undefined);
      const uniqueCustomerKey = `${baseCustomerKey}_${timestamp}_${randomSuffix}`;

      const chargeRequest: PaymentRequest = {
        orderId,
        packageName,
        amount: zetAmount,
        price: price,
      };

      const chargeResponse = await paymentAPI.charge(chargeRequest);

      const paymentConfig = {
        amount: chargeResponse.price,
        orderId: chargeResponse.orderId,
        orderName: packageName,
        successUrl: `${BASE_URL}/payment/success?t=${timestamp}`,
        failUrl: `${BASE_URL}/payment/fail?t=${timestamp}`,
        customerEmail: chargeResponse.email,
        customerName: chargeResponse.name,
        customerKey: uniqueCustomerKey,
      };

      await requestPayment(paymentConfig);
    } catch (error) {
      console.error('결제 요청 실패:', error);

      if (error instanceof Error) {
        const errorMessage = error.message;

        // 결제 취소 관련 에러 감지
        if (errorMessage.includes('취소') || errorMessage.includes('CANCEL')) {
          const shouldRefresh = confirm(
            '결제가 취소되었습니다.\n' +
              '다시 결제하려면 페이지를 새로고침해야 합니다.\n\n' +
              '지금 새로고침하시겠습니까?',
          );

          if (shouldRefresh) {
            window.location.reload();
          } else {
            toast.error('결제를 다시 시도하려면 페이지를 새로고침하세요.', {
              duration: 5000,
              action: {
                label: '새로고침',
                onClick: () => window.location.reload(),
              },
            });
          }
        } else {
          // 일반 에러는 그냥 메시지만 표시      toast.error(`${errorMessage}`);
        }
      } else {
        toast.error('충전 요청 중 오류가 발생했습니다.');
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    handleChargePackage,
    isProcessing,
    isPaymentReady: isLoaded && !error,
    error,
  };
}
