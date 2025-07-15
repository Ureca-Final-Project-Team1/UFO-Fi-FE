'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

import { ICON_PATHS } from '@/constants/icons';
import { BulkResultCard } from '@/features/bulk/components/BulkResultCard';
import { useBulkResult } from '@/features/bulk/hooks/useBulkResult';
import { Icon, Title, Button } from '@/shared';
import { useViewportStore } from '@/stores/useViewportStore';

function BulkResultContent() {
  const searchParams = useSearchParams();
  const capacity = searchParams.get('capacity') || '8';
  const budget = searchParams.get('budget') || '720';

  const { matchedData, expectedAmount, shortfall, dataList, handlePurchase, isPurchasing } =
    useBulkResult({ capacity: parseInt(capacity), budget: parseInt(budget) });

  const isMobile = useViewportStore((state) => state.isMobile);

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

          {/* 합계 박스 추가 */}
          <div className="gradient-card-2 rounded-xl p-4 border-2 border-cyan-300">
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

        {/* 부족 용량 안내 */}
        {shortfall > 0 && (
          <div className="space-y-2">
            <p className="text-white body-16-medium">구매하시려는 데이터 용량보다</p>
            <p className="text-red-400 body-16-bold">{shortfall}GB 부족합니다.</p>
            <p className="text-white body-16-medium">그래도 구매하시겠습니까?</p>
          </div>
        )}

        {/* 구매하기 버튼 */}
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

        {/* 데이터 목록 */}
        <div className="space-y-4">
          <h3 className="text-white font-bold text-lg flex items-center gap-2">데이터 목록</h3>

          {/* 그리드 레이아웃 반응형 */}
          <div className={`gap-3 ${isMobile ? 'grid grid-cols-2' : 'flex flex-col'}`}>
            {dataList.map((item, index) => (
              <BulkResultCard
                key={index}
                carrier={item.carrier}
                message={item.message}
                dataAmount={item.dataAmount}
                price={item.price}
                seller={item.seller}
                timeAgo={item.timeAgo}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BulkResultPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-white">로딩 중...</div>
        </div>
      }
    >
      <BulkResultContent />
    </Suspense>
  );
}
