'use client';

import { useState, useRef, useCallback } from 'react';
import { toast } from 'sonner';

import { paymentAPI, type PaymentRequest } from '@/api';
import { useMyInfo, generateCustomerKey } from '@/shared';

import { useTossPayments } from './useTossPayments';

const TOSS_CLIENT_KEY = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY || '';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

// 전역 중복 방지용 트래커
const globalExecutionTracker = new Set<string>();

export function useZetCharge() {
  const [isProcessing, setIsProcessing] = useState(false);
  const { requestPayment, isLoaded, error, resetError } = useTossPayments(TOSS_CLIENT_KEY);
  const { data: userInfo } = useMyInfo();

  const isExecutingRef = useRef(false);
  const lastExecutionTimeRef = useRef(0);
  const executionCountRef = useRef(0);

  const handleChargePackage = useCallback(
    async (packageId: string, zetAmount: number, price: number) => {
      const currentTime = Date.now();
      const packageKey = `${packageId}_${zetAmount}_${price}`;

      // 기본 상태 체크
      if (isProcessing || isExecutingRef.current) {
        return;
      }

      // 시간 기반 중복 방지 (1초 내 중복 실행 방지)
      if (currentTime - lastExecutionTimeRef.current < 1000) {
        return;
      }

      // 전역 실행 추적 (같은 패키지 중복 방지)
      if (globalExecutionTracker.has(packageKey)) {
        return;
      }

      // 실행 횟수 제한 (페이지당 최대 5회)
      executionCountRef.current += 1;
      if (executionCountRef.current > 5) {
        toast.error('너무 많은 요청이 발생했습니다. 페이지를 새로고침해주세요.');
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

      // 모든 플래그 설정
      isExecutingRef.current = true;
      lastExecutionTimeRef.current = currentTime;
      globalExecutionTracker.add(packageKey);
      resetError();
      setIsProcessing(true);

      try {
        const timestamp = Date.now();
        const randomSuffix = Math.random().toString(36).substring(2, 8);

        const orderId = `UFO-${timestamp}-${randomSuffix}`.toUpperCase();
        const packageName = `ZET 패키지 ${packageId} (${zetAmount} ZET)`;

        const baseCustomerKey = generateCustomerKey(
          userInfo.nickname ?? userInfo.email ?? undefined,
        );
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
            toast.error(`${errorMessage}`);
          }
        } else {
          toast.error('충전 요청 중 오류가 발생했습니다.');
        }
      } finally {
        // 모든 플래그 해제
        setIsProcessing(false);
        isExecutingRef.current = false;
        globalExecutionTracker.delete(packageKey);
      }
    },
    [userInfo, isLoaded, error, requestPayment, resetError, isProcessing],
  );

  return {
    handleChargePackage,
    isProcessing,
    isPaymentReady: isLoaded && !error,
    error,
  };
}
