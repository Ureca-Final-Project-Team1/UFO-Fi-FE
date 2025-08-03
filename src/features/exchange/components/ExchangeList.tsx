'use client';

import { useMemo } from 'react';

import { Carrier } from '@/backend';
import { MobileDataType } from '@/backend/types/mobileData';
import type { ExchangeItem } from '@/backend/types/sell';
import SellingItem from '@/features/exchange/components/SellingItem';
import { useMyInfo } from '@/features/mypage/hooks/useMyInfo';
import { Button } from '@/shared';
import { formatTimeAgo } from '@/utils/formatTimeAgo';
import { getMobileDataTypeDisplay } from '@/utils/mobileData';

import { ExchangeEmpty } from './ExchangeEmpty';
import { ExchangeListSkeleton } from './ExchangeListSkeleton';
import { useOptimizedInfiniteScroll } from '../hooks/useOptimizedInfiniteScroll';

interface ExchangeListProps {
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onReport: (id: number, sellerId: number) => void;
  onPurchase: (id: number) => void;
  purchaseLoading?: boolean;
}

// 게시물 변환 함수
const transformPostToItem = (post: ExchangeItem, userNickname?: string) => ({
  id: post.postId,
  title: post.title,
  carrier: post.carrier,
  networkType: getMobileDataTypeDisplay(post.mobileDataType as MobileDataType),
  capacity: `${post.sellMobileDataCapacityGb}GB`,
  price: `${post.totalPrice.toLocaleString()}ZET`,
  timeLeft: formatTimeAgo(post.createdAt),
  isOwner: userNickname === post.sellerNickname,
  status: post.status,
  sellerNickname: post.sellerNickname,
  sellerId: post.sellerId,
  sellerProfileUrl: post.sellerProfileUrl,
});

export const ExchangeList = ({ onEdit, onDelete, onReport, onPurchase }: ExchangeListProps) => {
  // 사용자 정보 조회
  const { data: userInfo } = useMyInfo();

  const { data, isLoading, error, isFetchingNextPage, hasNextPage, loadMoreRef, refetch } =
    useOptimizedInfiniteScroll();

  const sellingItems = useMemo(() => {
    if (!data?.pages) return [];

    const allPosts = data.pages.flatMap((page) => page.posts);

    return allPosts
      .filter((post) => post.status !== 'DELETED')
      .map((post) => transformPostToItem(post, userInfo?.nickname));
  }, [data?.pages, userInfo?.nickname]);

  // 초기 로딩 상태
  if (isLoading) {
    return <ExchangeListSkeleton />;
  }

  // 에러 상태
  if (error) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <div className="text-red-400 mb-3">데이터를 불러오는데 실패했습니다</div>
          <Button onClick={() => refetch()} variant="secondary" size="sm" className="px-4 py-2">
            다시 시도
          </Button>
        </div>
      </div>
    );
  }

  // 빈 상태
  if (sellingItems.length === 0) {
    return <ExchangeEmpty />;
  }

  return (
    <div className="w-auto justify-center items-center">
      {/* 게시물 목록 컨테이너 */}
      <section
        className="px-3"
        role="feed"
        aria-label="데이터 거래 게시물 목록"
        aria-live="polite"
        aria-busy={isFetchingNextPage}
      >
        {/* 
          반응형 그리드 최적화:
          - 모바일: 2열 (더 넓은 간격)
          - 태블릿: 3열
          - 데스크톱: 4열
        */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {sellingItems.map((item) => (
            <SellingItem
              key={item.id}
              title={item.title}
              carrier={item.carrier as Carrier}
              networkType={item.networkType}
              capacity={item.capacity}
              price={item.price}
              timeLeft={item.timeLeft}
              isOwner={item.isOwner}
              sellerNickname={item.sellerNickname}
              sellerId={item.sellerId}
              sellerProfileUrl={item.sellerProfileUrl}
              onEdit={() => onEdit(item.id)}
              onDelete={() => onDelete(item.id)}
              onReport={() => onReport(item.id, item.sellerId)}
              onPurchase={() => onPurchase(item.id)}
            />
          ))}
        </div>

        {/* 무한스크롤 상태 표시 */}
        <div
          ref={loadMoreRef}
          className="w-full py-8 flex justify-center"
          role="status"
          aria-label="추가 콘텐츠 로딩 상태"
        >
          {isFetchingNextPage ? (
            <div className="flex flex-col items-center gap-3">
              <div
                className="animate-spin rounded-full size-8 border-b-2 border-white"
                aria-hidden="true"
              />
              <p className="text-white text-sm" aria-live="polite">
                더 많은 게시글을 불러오는 중...
              </p>
            </div>
          ) : hasNextPage ? (
            <div className="text-gray-400 text-sm text-center">
              <div className="animate-pulse">스크롤하여 더 보기</div>
            </div>
          ) : sellingItems.length > 0 ? (
            <div className="text-gray-400 text-sm text-center">
              <div className="flex flex-col items-center gap-2">
                <p>🎉 모든 게시글을 불러왔습니다!</p>
                <p className="text-xs text-gray-500">총 {sellingItems.length}개의 상품</p>
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
};
