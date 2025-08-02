'use client';

import { useMemo, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';

import { Carrier } from '@/api';
import { MobileDataType } from '@/api/types/mobileData';
import type { ExchangeItem } from '@/api/types/sell';
import SellingItem from '@/features/exchange/components/SellingItem';
import { useInfiniteExchangePosts } from '@/features/exchange/hooks/useInfiniteExchangePosts';
import { useMyInfo } from '@/features/mypage/hooks/useMyInfo';
import { Button, Skeleton } from '@/shared';
import { formatTimeAgo } from '@/utils/formatTimeAgo';
import { getMobileDataTypeDisplay } from '@/utils/mobileData';

import { ExchangeEmpty } from './ExchangeEmpty';

interface ExchangeListProps {
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onReport: (id: number, sellerId: number) => void;
  onPurchase: (id: number) => void;
}

// 성능 최적화: 게시물 변환 함수
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

  // 무한스크롤 데이터 조회
  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
    useInfiniteExchangePosts();

  // 다음 페이지 로드 함수 최적화
  const loadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // 무한스크롤 트리거 최적화
  const { ref: loadMoreRef } = useInView({
    threshold: 0.1,
    rootMargin: '100px',
    onChange: (inView) => {
      if (inView) {
        loadMore();
      }
    },
  });

  const sellingItems = useMemo(() => {
    if (!data?.pages) return [];

    const allPosts = data.pages.flatMap((page) => page.posts);

    return allPosts
      .filter((post) => post.status !== 'DELETED')
      .map((post) => transformPostToItem(post, userInfo?.nickname));
  }, [data?.pages, userInfo?.nickname]);

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

  if (isLoading) {
    return <Skeleton />;
  }

  return (
    <div className="w-full px-3">
      {/* 반응형 그리드 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {sellingItems.map((item) => (
          <SellingItem
            key={item.id}
            title={item.title}
            carrier={item.carrier as Carrier}
            networkType={item.networkType as MobileDataType}
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

      {/* 무한스크롤 트리거 영역 */}
      <div ref={loadMoreRef} className="w-full py-6 flex justify-center">
        {isFetchingNextPage ? (
          <div className="flex flex-col items-center gap-2">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
            <div className="text-white text-sm">더 많은 게시글을 불러오는 중...</div>
          </div>
        ) : hasNextPage ? (
          <div className="text-gray-400 text-sm text-center">
            <div className="animate-pulse">스크롤하여 더 보기</div>
          </div>
        ) : sellingItems.length > 0 ? (
          <div className="text-gray-400 text-sm text-center">
            <div className="flex flex-col items-center gap-2">
              <div>🎉 모든 게시글을 불러왔습니다!</div>
              <div className="text-xs text-gray-500">총 {sellingItems.length}개의 상품</div>
            </div>
          </div>
        ) : null}
      </div>

      {/* 하단 여백 */}
      <div className="h-4"></div>
    </div>
  );
};
