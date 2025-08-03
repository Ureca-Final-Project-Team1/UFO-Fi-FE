'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

import { bulkPurchaseAPI } from '@/api';
import { ICON_PATHS } from '@/constants';
import { InsufficientZetModal, BulkResultCard, useBulkPurchase } from '@/features';
import { useMyInfo } from '@/shared';
import { Icon, Title, Button, Loading } from '@/shared';
import { usePostIdsStore } from '@/stores/useBulkStore';
import { useViewportStore } from '@/stores/useViewportStore';

import { BulkPurchaseItem, GetBulkPurchaseContent } from '../types/bulkResult.types';

interface BulkResultContentProps {
  initialData?: GetBulkPurchaseContent;
}

export function BulkResultContent({ initialData }: BulkResultContentProps) {
  const { data: userInfo } = useMyInfo();

  const zet = userInfo?.zetAsset || 0;
  const [price, setPrice] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const isMobile = useViewportStore((state) => state.isMobile);

  const { capacityValue, pricePerGB } = useBulkPurchase();
  const { setPostIds } = usePostIdsStore();

  const [resultData, setResultData] = useState<GetBulkPurchaseContent | null>(initialData || null);
  const [isLoading, setIsLoading] = useState(!initialData);
  const [isPurchasing, setIsPurchasing] = useState(false);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResultData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await bulkPurchaseAPI.getBulkPurchaseResult({
          desiredGb: capacityValue[0],
          unitPerZet: Number(pricePerGB),
        });

        if (data.message !== 'OK') {
          if (data.statusCode === 404) {
            throw new Error('검색 결과를 찾을 수 없습니다.');
          } else if (data.statusCode === 410) {
            throw new Error('검색 결과가 만료되었습니다.');
          } else {
            throw new Error('결과를 불러오는 중 오류가 발생했습니다.');
          }
        }

        setPrice(data.content.totalPrice);
        setPostIds(data.content.posts.map((item) => item.postId));
        setResultData(data.content);
      } catch (err) {
        console.error('Failed to fetch result data:', err);
        setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchResultData();
  }, [capacityValue, pricePerGB, setPostIds]);

  const handlePurchase = () => {
    if (!resultData) return;

    if (zet < price) {
      setIsOpen(true);
      return;
    }
    setIsPurchasing(true);
    router.push('/exchange/bulk/purchase');
  };

  // 로딩 상태
  if (isLoading) {
    return <Loading />;
  }

  if (error || !resultData) {
    return (
      <>
        <Title title="매칭된 데이터" iconVariant="back" />
        <div className="flex items-center justify-center text-white">
          검색 결과를 찾을 수 없습니다.
        </div>
      </>
    );
  }

  // 정상 상태
  return (
    <>
      <Title title="매칭된 데이터" iconVariant="back" />

      <BulkResultDisplay
        data={resultData}
        onPurchase={handlePurchase}
        isPurchasing={isPurchasing}
        isMobile={isMobile}
      />

      <InsufficientZetModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onCancel={() => setIsOpen(false)}
        onGoToCharge={() => {
          setIsOpen(false);
          router.push('/charge');
        }}
      />
    </>
  );
}

function getTimeAgo(createdAt: number): string {
  const diffMs = Date.now() - createdAt;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 60) return `${diffSec}초 전`;
  if (diffMin < 60) return `${diffMin}분 전`;
  if (diffHour < 24) return `${diffHour}시간 전`;
  return `${diffDay}일 전`;
}

// 결과 표시 컴포넌트
function BulkResultDisplay({
  data,
  onPurchase,
  isPurchasing,
  isMobile,
}: {
  data: GetBulkPurchaseContent;
  onPurchase: () => void;
  isPurchasing: boolean;
  isMobile: boolean;
}) {
  const { totalGb, totalPrice, posts } = data;
  const { capacityValue } = useBulkPurchase();
  const shortfall = capacityValue[0] - totalGb;

  return (
    <div className="flex flex-col space-y-6 mb-6">
      {/* 매칭 결과 */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-white font-bold text-lg">매칭된 데이터</span>
          <span className="text-cyan-400 heading-24-bold">{totalGb}GB</span>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Icon src={ICON_PATHS['COIN']} className="w-4 h-4" />
              <span className="text-white body-16-medium">예상 결제 금액</span>
            </div>
            <span className="text-cyan-400 heading-24-bold">{totalPrice}ZET</span>
          </div>
        </div>

        <div className="rounded-xl p-4 border-2 border-cyan-300">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white heading-18-bold">총 합계</span>
            <Icon name="Calculator" className="w-5 h-5 text-cyan-400" />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300 body-14-medium">총 {posts.length}개 상품</span>
            <div className="flex items-center gap-1">
              <span className="text-cyan-400 heading-20-bold">{totalGb}GB</span>
              <span className="text-gray-300">•</span>
              <span className="text-yellow-400 heading-20-bold">{totalPrice}ZET</span>
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
          type="button"
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
          {posts.map((item: BulkPurchaseItem, index: number) => (
            <BulkResultCard
              key={index}
              message={item.title}
              dataAmount={item.sellMobileDataCapacityGb}
              price={item.totalPrice}
              carrier={item.carrier}
              seller={item.sellerNickname}
              timeAgo={getTimeAgo(new Date(item.createdAt).getTime())}
              profileUrl={item.sellerProfileUrl || ''}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
