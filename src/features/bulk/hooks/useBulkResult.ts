import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Carrier } from '@/api/types/carrier';

interface BulkResultData {
  carrier: Carrier;
  message: string;
  dataAmount: number;
  price: number;
  seller: string;
  timeAgo: string;
}

interface UseBulkResultProps {
  capacity: number;
  budget: number;
}

export function useBulkResult({ capacity, budget }: UseBulkResultProps) {
  const [dataList, setDataList] = useState<BulkResultData[]>([]);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const router = useRouter();

  // 더미 데이터 생성
  useEffect(() => {
    const mockData: BulkResultData[] = [
      {
        carrier: Carrier.KT,
        message: '데이터 급처분합니다.',
        dataAmount: 1,
        price: 250,
        seller: '우주상인',
        timeAgo: '30분전',
      },
      {
        carrier: Carrier.SKT,
        message: '5GB 데이터 판매',
        dataAmount: 5,
        price: 1200,
        seller: '은하상인',
        timeAgo: '1시간전',
      },
      {
        carrier: Carrier.LGU,
        message: '대용량 데이터 특가',
        dataAmount: 3,
        price: 750,
        seller: '성간상인',
        timeAgo: '2시간전',
      },
    ];

    setDataList(mockData);
  }, []);

  const matchedData = Math.min(capacity, 8); // TODO: 더미데이터
  const expectedAmount = budget; // 예상 금액은 예산과 동일
  const shortfall = Math.max(0, capacity - matchedData); // 부족한 용량

  const handlePurchase = async () => {
    setIsPurchasing(true);

    // 일괄구매 로직 시뮬레이션
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // TODO: 추후 구매 완료 시 라우팅이나 토스트 추가는 수정 필요
      alert('구매가 완료되었습니다!');
      router.push('/exchange');
    } catch {
      alert('구매 중 오류가 발생했습니다.');
    } finally {
      setIsPurchasing(false);
    }
  };

  return {
    dataList,
    matchedData,
    expectedAmount,
    shortfall,
    handlePurchase,
    isPurchasing,
  };
}
