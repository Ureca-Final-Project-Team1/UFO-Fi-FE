import { useState } from 'react';
// TODO: 실제 API 연결하고 나서 유효성 검사 및 일괄구매 훅 수정 필요
export function useBulkPurchase() {
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
      // 임시 비동기 함수 처리
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // 성공 시 결과 페이지로 이동, TODO: 추후 모달 필요
      alert(`${capacityValue[0]}GB, 최대 ${pricePerGB}ZET/GB 조건으로 최적 조합을 찾았습니다!`);
    } catch (error) {
      console.error('일괄구매 요청 실패:', error);
      alert('요청 처리 중 오류가 발생했습니다. 다시 시도해주세요.');
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
