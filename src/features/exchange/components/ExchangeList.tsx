'use client';

import { useMemo } from 'react';
import { useInView } from 'react-intersection-observer';

import SellingItem from '@/features/exchange/components/SellingItem';
import { useInfiniteExchangePosts } from '@/features/exchange/hooks/useInfiniteExchangePosts';
import { useMyInfo } from '@/features/mypage/hooks/useMyInfo';
import { Button } from '@/shared';
import { formatTimeAgo } from '@/utils/formatTimeAgo';

import { ExchangeEmpty } from './ExchangeEmpty';

interface ExchangeListProps {
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onReport: (id: number) => void;
  onPurchase: (id: number) => void;
}

export const ExchangeList = ({ onEdit, onDelete, onReport, onPurchase }: ExchangeListProps) => {
  // 사용자 정보 조회
  const { data: userInfo } = useMyInfo();

  // 무한스크롤 데이터 조회
  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
    useInfiniteExchangePosts();

  // 무한스크롤 트리거 (화면 하단 감지)
  const { ref: loadMoreRef } = useInView({
    threshold: 0,
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
  });

  const sellingItems = useMemo(() => {
    if (!data?.pages) return [];

    return data.pages
      .flatMap((page) => page.posts)
      .filter((post) => post.status !== 'DELETED')
      .map((post) => ({
        id: post.postId,
        title: post.title,
        carrier: post.carrier,
        networkType: post.mobileDataType === '_5G' ? '5G' : 'LTE',
        capacity: `${post.sellMobileDataCapacityGb}GB`,
        price: `${post.totalPrice.toLocaleString()}ZET`,
        timeLeft: formatTimeAgo(post.createdAt),
        isOwner: userInfo?.nickname === post.sellerNickname,
        status: post.status,
        sellerNickname: post.sellerNickname,
        sellerId: post.sellerId,
      }));
  }, [data?.pages, userInfo?.nickname]);

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-white">게시글을 불러오는 중...</div>
      </div>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <div className="text-red-400 mb-2">데이터를 불러오는데 실패했습니다</div>
          <Button onClick={() => refetch()} className="text-sm underline">
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
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {sellingItems.map((item) => (
          <SellingItem
            key={item.id}
            title={item.title}
            carrier={item.carrier}
            networkType={item.networkType}
            capacity={item.capacity}
            price={item.price}
            timeLeft={item.timeLeft}
            isOwner={item.isOwner}
            sellerNickname={item.sellerNickname}
            sellerId={item.sellerId}
            onEdit={() => onEdit(item.id)}
            onDelete={() => onDelete(item.id)}
            onReport={() => onReport(item.id)}
            onPurchase={() => onPurchase(item.id)}
          />
        ))}
      </div>

      {/* 무한스크롤 트리거 영역 */}
      <div ref={loadMoreRef} className="w-full py-4 flex justify-center">
        {isFetchingNextPage ? (
          <div className="text-white text-sm">더 많은 게시글을 불러오는 중...</div>
        ) : hasNextPage ? (
          <div className="text-gray-400 text-sm">스크롤하여 더 보기</div>
        ) : sellingItems.length > 0 ? (
          <div className="text-gray-400 text-sm">모든 게시글을 불러왔습니다!</div>
        ) : null}
      </div>
    </>
  );
};
