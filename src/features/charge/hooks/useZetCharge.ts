'use client';

import { useState } from 'react';
import { toast } from 'sonner';

import { paymentAPI } from '@/api';
import type { PaymentRequest } from '@/api/types/payment';
import { useMyInfo } from '@/features/mypage/hooks/useMyInfo';
import { generateOrderId, generateCustomerKey } from '@/utils/uuid';

import { useTossPayments } from './useTossPayments';

const TOSS_CLIENT_KEY = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY || '';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

export function useZetCharge() {
  const [isProcessing, setIsProcessing] = useState(false);
  const { requestPayment, isLoaded, error } = useTossPayments(TOSS_CLIENT_KEY);
  const { data: userInfo } = useMyInfo();

  const handleChargePackage = async (packageId: string, zetAmount: number, price: number) => {
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

    setIsProcessing(true);

    try {
      const orderId = generateOrderId();
      const packageName = `ZET 패키지 ${packageId} (${zetAmount} ZET)`;

      // 안전한 고객키 생성
      const customerKey = generateCustomerKey(userInfo.nickname ?? userInfo.email ?? undefined);

      const chargeRequest: PaymentRequest = {
        orderId,
        packageName,
        amount: price,
      };

      const chargeResponse = await paymentAPI.charge(chargeRequest);

      const paymentConfig = {
        amount: chargeResponse.amount,
        orderId: chargeResponse.orderId,
        orderName: packageName,
        successUrl: `${BASE_URL}/payment/success`,
        failUrl: `${BASE_URL}/payment/fail`,
        customerEmail: chargeResponse.email,
        customerName: chargeResponse.name,
        customerKey: customerKey,
      };

      await requestPayment(paymentConfig);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`충전 실패: ${error.message}`);
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
