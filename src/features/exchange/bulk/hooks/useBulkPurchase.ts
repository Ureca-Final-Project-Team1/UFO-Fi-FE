'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useBulkStore } from '@/stores/useBulkStore';

export function useBulkPurchase() {
  const router = useRouter();
  const { capacityValue, setCapacityValue, pricePerGB, setPricePerGB } = useBulkStore();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setPricePerGB(value);
    }
  };

  // 유효성 검사
  const isValidCapacity = capacityValue[0] > 0;
  const isValidPrice = Number(pricePerGB) >= 1;

  const handleSubmit = async () => {
    if (!isValidCapacity || !isValidPrice) return;

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500)); // 로딩 시뮬레이션
      // 동적 라우트로 이동
      router.push('/exchange/bulk/result');
    } catch (error) {
      console.error('검색 오류:', error);
      alert('검색 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    capacityValue,
    setCapacityValue,
    pricePerGB,
    handlePriceChange,
    handleSubmit,
    isValidCapacity,
    isValidPrice,
    isSubmitting,
  };
}
