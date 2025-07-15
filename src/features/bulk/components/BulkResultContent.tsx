'use client';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';

import { ICON_PATHS } from '@/constants/icons';
import { IMAGE_PATHS } from '@/constants/images';
import { BulkResultCard } from '@/features/bulk/components/BulkResultCard';
// import { useBulkResult } from '@/features/bulk/hooks/useBulkResult';
import { Icon, Title, Button } from '@/shared';
import { useViewportStore } from '@/stores/useViewportStore';

import { BulkResultData, BulkResultItem } from '../types/bulkResult.types';

interface BulkResultContentProps {
  initialData?: BulkResultData;
}

export function BulkResultContent({ initialData }: BulkResultContentProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isMobile = useViewportStore((state) => state.isMobile);

  const capacity = searchParams.get('capacity') || '8';
  const budget = searchParams.get('budget') || '720';
  const searchId = searchParams.get('searchId') ?? 'fallback';

  const [isPurchasing, setIsPurchasing] = useState(false);

  const fallbackData: BulkResultData = useMemo(() => {
    return {
      searchId,
      capacity: parseInt(capacity),
      budget: parseInt(budget),
      matchedData: Math.min(parseInt(capacity), 8),
      expectedAmount: parseInt(budget),
      shortfall: Math.max(0, parseInt(capacity) - 8),
      dataList: [
        {
          carrier: 'KT',
          message: '데이터 급처분합니다.',
          dataAmount: 1,
          price: 250,
          seller: '우주상인',
          timeAgo: '30분전',
        },
        {
          carrier: 'SKT',
          message: '5GB 데이터 판매',
          dataAmount: 5,
          price: 1200,
          seller: '은하상인',
          timeAgo: '1시간전',
        },
        {
          carrier: 'LGU',
          message: '대용량 데이터 특가',
          dataAmount: 3,
          price: 750,
          seller: '성간상인',
          timeAgo: '2시간전',
        },
      ],
      expiresAt: Date.now() + 3600 * 1000,
    };
  }, [capacity, budget, searchId]);

  const resultData = useMemo(() => {
    if (initialData) return initialData;

    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem(`bulk-result-${searchId}`);
      if (stored) {
        try {
          return JSON.parse(stored) as BulkResultData;
        } catch {
          return fallbackData;
        }
      }
    }

    return fallbackData;
  }, [initialData, fallbackData, searchId]);

  const { matchedData, expectedAmount, shortfall, dataList } = resultData;

  const handlePurchase = async () => {
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

  return (
    <div className="flex flex-col min-h-full w-full">
      <Title title="매칭된 데이터" iconVariant="back" />

      <div className="relative rounded-[20px] space-y-6 pb-12 px-4">
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
                <span className="text-white body-16-medium">예상 질문 금액</span>
                <Icon name="Sparkles" className="w-4 h-4 text-yellow-400" />
              </div>
              <span className="text-cyan-400 heading-24-bold">{expectedAmount}ZET</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-white body-16-medium">예상 질문 금액</span>
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
          <div className="space-y-2">
            <p className="text-white body-16-medium">구매하시려는 데이터 용량보다</p>
            <p className="text-red-400 body-16-bold">{shortfall}GB 부족합니다.</p>
            <p className="text-white body-16-medium">그래도 구매하시겠습니까?</p>
          </div>
        )}

        <div className="flex justify-start">
          <Button
            size={isMobile ? 'default' : 'lg'}
            onClick={handlePurchase}
            variant="exploration-button"
            disabled={isPurchasing}
            className="px-8 py-3 min-w-[200px]"
          >
            {isPurchasing ? '구매 중...' : '구매하기'}
          </Button>
        </div>

        <div className="space-y-4">
          <h3 className="text-white font-bold text-lg flex items-center gap-2">
            <Icon name="Sparkles" className="w-5 h-5 text-purple-400" />
            데이터 목록
          </h3>

          <div className={`gap-3 ${isMobile ? 'grid grid-cols-2' : 'flex flex-col'}`}>
            {dataList.map((item: BulkResultItem, index: number) => (
              <BulkResultCard key={index} {...item} />
            ))}
          </div>
        </div>

        <div className="absolute bottom-[-50px] right-4">
          <Image
            src={IMAGE_PATHS.AL_BULK_PURCHASE}
            alt="일괄구매 결과 외계인"
            width={isMobile ? 100 : 120}
            height={isMobile ? 100 : 120}
            priority
          />
        </div>
      </div>
    </div>
  );
}
