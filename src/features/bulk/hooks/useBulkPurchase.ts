import { useRouter } from 'next/navigation';
import { useState } from 'react';

// TODO: 실제 API 연결하고 나서 유효성 검사 및 일괄구매 훅 수정 필요
export function useBulkPurchase() {
  const router = useRouter();
  const [capacityValue, setCapacityValueRaw] = useState<number[]>([50]);
  const [pricePerGB, setPricePerGB] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setPricePerGB(value);
    }
  };

  const setCapacityValue = (value: React.SetStateAction<number[]>) => {
    setCapacityValueRaw(value);
  };

  // 유효성 검사
  const isValidCapacity = capacityValue[0] > 0;
  const isValidPrice = Number(pricePerGB) >= 1;

  const handleSubmit = async () => {
    if (!isValidCapacity || !isValidPrice) return;

    setIsSubmitting(true);

    try {
      // const totalBudget = Number(pricePerGB) * capacityValue[0];

      // TODO: 실제 API 연결 시 수정 필요
      await new Promise((resolve) => setTimeout(resolve, 1500)); // 로딩 시뮬레이션
      const searchId = 'dummy-' + Date.now(); // 더미 searchId 생성

      // 동적 라우트로 이동
      router.push(`/exchange/bulk/result/${searchId}`);
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
