'use client';

import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { useInView } from 'react-intersection-observer';

import { ICON_PATHS } from '@/constants/icons';
import SellingItem from '@/features/exchange/components/SellingItem';
import { useInfiniteExchangePosts } from '@/features/exchange/hooks/useInfiniteExchangePosts';
import { Button, Chip, Icon, Title } from '@/shared';
import { formatTimeAgo } from '@/utils/formatTimeAgo';

export default function ExchangePage() {
  const router = useRouter();

  // 무한스크롤 데이터 조회
  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
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
      .flatMap((page) => page.posts) // 모든 페이지의 posts 합치기
      .filter((post) => post.status !== 'DELETED') // 삭제된 글 제외
      .map((post) => ({
        id: post.postId,
        carrier: post.carrier,
        networkType: post.mobileDataType === '_5G' ? '5G' : 'LTE',
        capacity: `${post.sellMobileDataCapacityGb}GB`,
        price: `${post.totalPrice.toLocaleString()}ZET`,
        timeLeft: formatTimeAgo(post.createdAt),
        isOwner: false, // TODO: 현재 사용자 ID와 비교 필요
        status: post.status,
      }));
  }, [data?.pages]);

  const handleEdit = (id: number) => {
    // eslint-disable-next-line no-console
    console.log('Edit item:', id);
  };

  const handleDelete = (id: number) => {
    // eslint-disable-next-line no-console
    console.log('Delete item:', id);
  };

  const handleReport = (id: number) => {
    // eslint-disable-next-line no-console
    console.log('Report item:', id);
  };

  const handlePurchase = (id: number) => {
    // eslint-disable-next-line no-console
    console.log('Purchase item:', id);
  };

  const handleNotificationSettings = () => {
    router.push('/exchange/notification');
  };

  const handleCharge = () => {
    router.push('/charge');
  };

  const handleBulkPurchase = () => {
    router.push('/exchange/bulk');
  };

  // 초기 로딩 상태
  if (isLoading) {
    return (
      <div className="flex flex-col min-h-full w-full pb-6">
        <Title title="전파 거래소" />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-white">게시글을 불러오는 중...</div>
        </div>
      </div>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <div className="flex flex-col min-h-full w-full pb-6">
        <Title title="전파 거래소" />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="text-red-400 mb-2">데이터를 불러오는데 실패했습니다</div>
            <Button size="sm" onClick={() => window.location.reload()} className="text-white">
              다시 시도
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-full w-full pb-6">
      <div className="flex-1">
        {/* 헤더 */}
        <div className="flex items-center justify-between">
          <Title title="전파 거래소" />
        </div>

        {/* 잔액 표시 */}
        <div className="text-right mb-2">
          <div className="inline-flex items-center gap-x-3 py-2">
            <Icon src={ICON_PATHS['COIN']} className="w-4 h-4" />
            <span className="text-lg font-bold text-cyan-400">0 ZET</span>
            <Button
              size="sm"
              onClick={handleCharge}
              className="w-auto rounded-md text-white text-sm"
            >
              충전
            </Button>
          </div>
        </div>

        {/* 알림 설정 카드 */}
        <div className="flex items-center justify-between px-3 py-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl border border-blue-500/30 mb-4 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <p className="text-white caption-14-regular">원하는 상품이 올라오면 알려드려요.</p>
          </div>
          <Button size="sm" variant="ghost" onClick={handleNotificationSettings}>
            <Icon name="Bell" className="w-5 h-5 pr-1" color="primary400" />
            <span className="caption-12-bold"> 알림설정</span>
          </Button>
        </div>

        {/* 뱃지 필터와 일괄구매 버튼 */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2 sm:relative">
          <div className="flex flex-wrap gap-2">
            <Chip rightIcon={<Icon name="ChevronDown" />}>통신사</Chip>
            <Chip>용량</Chip>
            <Chip>가격</Chip>
          </div>

          <div className="ml-auto sm:absolute sm:right-0 sm:top-0">
            <Button size="sm" variant="exploration-button" onClick={handleBulkPurchase}>
              <Icon name="box" className="w-3 h-3 pr-1" />
              <span className="caption-14-bold"> 일괄구매</span>
            </Button>
          </div>
        </div>

        {/* 판매글 아이템 목록 */}
        {sellingItems.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {sellingItems.map((item) => (
                <SellingItem
                  key={item.id}
                  carrier={item.carrier}
                  networkType={item.networkType}
                  capacity={item.capacity}
                  price={item.price}
                  timeLeft={item.timeLeft}
                  isOwner={item.isOwner}
                  onEdit={() => handleEdit(item.id)}
                  onDelete={() => handleDelete(item.id)}
                  onReport={() => handleReport(item.id)}
                  onPurchase={() => handlePurchase(item.id)}
                />
              ))}
            </div>

            {/* 무한스크롤 트리거 영역 */}
            <div ref={loadMoreRef} className="w-full py-4 flex justify-center">
              {isFetchingNextPage ? (
                <div className="text-white text-sm">더 많은 게시글을 불러오는 중...</div>
              ) : hasNextPage ? (
                <div className="text-gray-400 text-sm">스크롤하여 더 보기</div>
              ) : (
                <div className="text-gray-400 text-sm">모든 게시글을 불러왔습니다!</div>
              )}
            </div>
          </>
        ) : (
          /* 데이터가 없을 때 */
          <div className="flex flex-col items-center justify-center py-16">
            <div className="text-gray-400 text-center">
              <Icon name="Package" size="xl" className="mx-auto mb-4 opacity-50" />
              <p className="text-lg mb-2">등록된 판매글이 없습니다</p>
              <p className="text-sm mb-6">첫 번째 거래글을 등록해보세요!</p>
              <Button
                variant="exploration-button"
                onClick={() => router.push('/sell')}
                className="px-6"
              >
                판매글 등록하기
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
