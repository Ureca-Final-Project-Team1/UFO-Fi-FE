'use client';

import { useEffect, useRef, useState } from 'react';

// 토스페이먼츠 v2 표준 SDK 타입 정의
interface TossPaymentsInstance {
  payment: (config: { customerKey: string }) => TossPaymentsPayment;
}

interface TossPaymentsPayment {
  requestPayment: (request: PaymentRequest) => Promise<void>;
}

interface PaymentRequest {
  method: 'CARD';
  amount: {
    currency: 'KRW';
    value: number;
  };
  orderId: string;
  orderName: string;
  successUrl: string;
  failUrl: string;
  customerEmail?: string;
  customerName?: string;
}

declare global {
  interface Window {
    TossPayments: (clientKey: string) => TossPaymentsInstance;
  }
}

export function useTossPayments(clientKey: string) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const paymentRef = useRef<TossPaymentsPayment | null>(null);

  // SDK 로드
  useEffect(() => {
    if (!clientKey) {
      setError('클라이언트 키가 필요합니다.');
      return;
    }

    if (window.TossPayments && typeof window.TossPayments === 'function') {
      setIsLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://js.tosspayments.com/v2/standard';
    script.async = true;

    script.onload = () => {
      setIsLoaded(true);
    };

    script.onerror = () => {
      setError('토스페이먼츠 SDK 로드 실패');
    };

    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [clientKey]);

  // 결제 요청
  const requestPayment = async (config: {
    amount: number;
    orderId: string;
    orderName: string;
    successUrl: string;
    failUrl: string;
    customerEmail?: string;
    customerName?: string;
    customerKey?: string;
  }) => {
    if (!isLoaded || !window.TossPayments) {
      throw new Error('토스페이먼츠 SDK가 준비되지 않았습니다.');
    }

    setIsLoading(true);
    setError(null);

    try {
      if (!paymentRef.current) {
        const tossPayments = window.TossPayments(clientKey);
        paymentRef.current = tossPayments.payment({
          customerKey: config.customerKey || 'anonymous',
        });
      }

      await paymentRef.current.requestPayment({
        method: 'CARD',
        amount: {
          currency: 'KRW',
          value: config.amount,
        },
        orderId: config.orderId,
        orderName: config.orderName,
        successUrl: config.successUrl,
        failUrl: config.failUrl,
        customerEmail: config.customerEmail,
        customerName: config.customerName,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '결제 요청 중 오류가 발생했습니다.';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoaded,
    isLoading,
    error,
    requestPayment,
  };
}
