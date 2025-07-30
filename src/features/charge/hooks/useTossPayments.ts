'use client';

import { useEffect, useState } from 'react';

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

    const existingScript = document.querySelector(
      'script[src="https://js.tosspayments.com/v2/standard"]',
    );
    if (existingScript) {
      const checkLoaded = setInterval(() => {
        if (window.TossPayments && typeof window.TossPayments === 'function') {
          setIsLoaded(true);
          clearInterval(checkLoaded);
        }
      }, 100);
      return () => clearInterval(checkLoaded);
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

  const resetError = () => {
    setError(null);
  };

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

    // 시작 시 모든 상태 초기화
    setIsLoading(true);
    setError(null);

    try {
      // 매번 새로운 payment 인스턴스 생성
      const tossPayments = window.TossPayments(clientKey);
      const payment = tossPayments.payment({
        customerKey: config.customerKey || `${config.customerKey}_${Date.now()}`,
      });

      await payment.requestPayment({
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
    resetError,
  };
}
