'use client';

// import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation';
import { useMemo, useState, useEffect } from 'react';

import { Carrier } from '@/api/types/carrier';
import { ICON_PATHS } from '@/constants/icons';
// import { IMAGE_PATHS } from '@/constants/images';
import { BulkResultCard } from '@/features/bulk/components/BulkResultCard';
import { Icon, Title, Button } from '@/shared';
import { useViewportStore } from '@/stores/useViewportStore';

import { BulkResultData, BulkResultItem } from '../types/bulkResult.types';

interface BulkResultContentProps {
  initialData?: BulkResultData;
}

export function BulkResultContent({ initialData }: BulkResultContentProps) {
  const params = useParams();
  const router = useRouter();
  const isMobile = useViewportStore((state) => state.isMobile);

  // URL에서 searchId 추출
  const searchId = params.searchId as string;

  const [resultData, setResultData] = useState<BulkResultData | null>(initialData || null);
  const [isLoading, setIsLoading] = useState(!initialData);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 폴백 더미데이터
  const fallbackData: BulkResultData = useMemo(() => {
    return {
      searchId: searchId || 'fallback',
      capacity: 50,
      budget: 1650,
      matchedData: 8,
      expectedAmount: 1650,
      shortfall: 42,
      dataList: [
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
      ],
      expiresAt: Date.now() + 3600 * 1000,
    };
  }, [searchId]);

  // API에서 결과 데이터 가져오기
  useEffect(() => {
    if (initialData || !searchId) {
      setIsLoading(false);
      return;
    }

    const fetchResultData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(`/api/bulk/search/${searchId}`);

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('검색 결과를 찾을 수 없습니다.');
          } else if (response.status === 410) {
            throw new Error('검색 결과가 만료되었습니다.');
          } else {
            throw new Error('결과를 불러오는 중 오류가 발생했습니다.');
          }
        }

        const data = await response.json();

        const transformedData: BulkResultData = {
          searchId: data.searchId,
          capacity: 50, // 더미데이터
          budget: 1650, // 더미데이터
          matchedData: data.matchedData,
          expectedAmount: data.expectedAmount,
          shortfall: data.shortfall,
          dataList: data.dataList,
          expiresAt: new Date(data.expiresAt).getTime(),
        };

        setResultData(transformedData);
      } catch (err) {
        console.error('Failed to fetch result data:', err);
        setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
        // 오류 발생 시 폴백 데이터 사용
        setResultData(fallbackData);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResultData();
  }, [searchId, initialData, fallbackData]);

  const handlePurchase = async () => {
    if (!resultData) return;

    setIsPurchasing(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert('구매가 완료되었습니다!');
      router.push('/exchange');
    } catch {
      alert('구매 중 오류가 발생했습니다.');
    } finally {
      setIsPurchasing(false);
    }
  };

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white">검색 결과를 불러오는 중...</div>
      </div>
    );
  }

  // 폴백 데이터가 있는 경우에만 표시)
  if (error && resultData) {
    return (
      <div className="flex flex-col min-h-full w-full">
        <Title title="매칭된 데이터" iconVariant="back" />
        <div className="p-4">
          <div className="bg-yellow-600/20 border border-yellow-500/30 rounded-lg p-4 mb-4">
            <p className="text-yellow-200 text-sm">{error}</p>
            <p className="text-yellow-200 text-xs mt-1">임시 데이터를 표시합니다.</p>
          </div>
          <BulkResultDisplay
            data={resultData}
            onPurchase={handlePurchase}
            isPurchasing={isPurchasing}
            isMobile={isMobile}
          />
        </div>
      </div>
    );
  }

  // 정상 상태
  if (!resultData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white">검색 결과를 찾을 수 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-full w-full">
      <Title title="매칭된 데이터" iconVariant="back" />
      <div className="px-4">
        <BulkResultDisplay
          data={resultData}
          onPurchase={handlePurchase}
          isPurchasing={isPurchasing}
          isMobile={isMobile}
        />
      </div>
    </div>
  );
}

// 결과 표시 컴포넌트
function BulkResultDisplay({
  data,
  onPurchase,
  isPurchasing,
  isMobile,
}: {
  data: BulkResultData;
  onPurchase: () => void;
  isPurchasing: boolean;
  isMobile: boolean;
}) {
  const { matchedData, expectedAmount, shortfall, dataList } = data;

  return (
    <div className="relative rounded-[20px] space-y-6 pb-12">
      {/* 매칭 결과 */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-white font-bold text-lg">매칭된 데이터</span>
          <span className="text-cyan-400 heading-24-bold">{matchedData}GB</span>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Icon src={ICON_PATHS['COIN']} className="w-4 h-4" />
              <span className="text-white body-16-medium">예상 결제 금액</span>
            </div>
            <span className="text-cyan-400 heading-24-bold">{expectedAmount}ZET</span>
          </div>
        </div>

        <div className="rounded-xl p-4 border-2 border-cyan-300">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white heading-18-bold">총 합계</span>
            <Icon name="Calculator" className="w-5 h-5 text-cyan-400" />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300 body-14-medium">총 {dataList.length}개 상품</span>
            <div className="flex items-center gap-1">
              <span className="text-cyan-400 heading-20-bold">{matchedData}GB</span>
              <span className="text-gray-300">•</span>
              <span className="text-yellow-400 heading-20-bold">{expectedAmount}ZET</span>
            </div>
          </div>
        </div>
      </div>

      {shortfall > 0 && (
        <div className="flex flex-col justify-center items-center space-y-2">
          <p className="text-white body-16-medium">
            구매하시려는 데이터 용량보다
            <span className="text-red-400 body-16-bold"> {shortfall}GB</span> 부족합니다.
          </p>
          <p className="text-white body-16-medium">그래도 구매하시겠습니까?</p>
        </div>
      )}

      <div className="flex justify-start">
        <Button
          size="full-width"
          onClick={onPurchase}
          variant="exploration-button"
          disabled={isPurchasing}
          className="px-8 py-3 min-w-[200px]"
        >
          {isPurchasing ? '구매 중...' : '구매하기'}
        </Button>
      </div>

      <div className="space-y-4">
        <h3 className="text-white font-bold text-lg flex items-center gap-2">매칭된 데이터 목록</h3>

        <div className={`gap-3 ${isMobile ? 'grid grid-cols-2' : 'flex flex-col'}`}>
          {dataList.map((item: BulkResultItem, index: number) => (
            <BulkResultCard key={index} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}
