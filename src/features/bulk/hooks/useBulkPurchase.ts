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
      const totalBudget = Number(pricePerGB) * capacityValue[0];

      // 더미 데이터로 시뮬레이션 (실제 API 대신)
      await new Promise((resolve) => setTimeout(resolve, 1500)); // 로딩 시뮬레이션

      const mockSearchId = 'dummy-' + Date.now(); // 더미 searchId 생성

      // 더미 결과 데이터를 sessionStorage에 저장 (실제 API 대신)
      const mockResult = {
        searchId: mockSearchId,
        matchedData: Math.min(capacityValue[0], 8),
        expectedAmount: totalBudget,
        shortfall: Math.max(0, capacityValue[0] - 8),
        dataList: [
          {
            carrier: 'KT' as const,
            message: '데이터 급처분합니다.',
            dataAmount: 1,
            price: 250,
            seller: '우주상인',
            timeAgo: '30분전',
          },
          {
            carrier: 'SKT' as const,
            message: '5GB 데이터 판매',
            dataAmount: 5,
            price: 1200,
            seller: '은하상인',
            timeAgo: '1시간전',
          },
          {
            carrier: 'LGU' as const,
            message: '대용량 데이터 특가',
            dataAmount: 3,
            price: 750,
            seller: '성간상인',
            timeAgo: '2시간전',
          },
        ],
        expiresAt: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
      };

      // 더미 데이터를 sessionStorage에 저장
      if (typeof window !== 'undefined') {
        sessionStorage.setItem(`bulk-result-${mockSearchId}`, JSON.stringify(mockResult));
      }

      // 더미 searchId로 라우팅 (기존 쿼리 파라미터 방식 사용)
      router.push(
        `/exchange/bulk/result?capacity=${capacityValue[0]}&budget=${totalBudget}&searchId=${mockSearchId}`,
      );
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
