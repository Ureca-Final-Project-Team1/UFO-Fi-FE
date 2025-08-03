import { useCallback } from 'react';
import { useInView } from 'react-intersection-observer';

import type { GetExchangePostsRequest } from '@/backend/types/exchange';

import { useInfiniteExchangePosts } from './useInfiniteExchangePosts';

export const useOptimizedInfiniteScroll = (params?: Omit<GetExchangePostsRequest, 'cursorId'>) => {
  // 무한스크롤 데이터 조회
  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
    useInfiniteExchangePosts(params);

  const loadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // 무한스크롤 트리거 최적화
  const { ref: loadMoreRef } = useInView({
    threshold: 0.1,
    rootMargin: '200px',
    onChange: (inView) => {
      if (inView) {
        loadMore();
      }
    },
    skip: !hasNextPage || isFetchingNextPage, // 불필요한 감지 방지
  });

  return {
    data,
    isLoading,
    error,
    isFetchingNextPage,
    hasNextPage,
    loadMore,
    refetch,
    loadMoreRef,
  };
};
