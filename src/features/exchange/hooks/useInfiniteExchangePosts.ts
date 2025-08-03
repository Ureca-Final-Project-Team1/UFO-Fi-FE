import { useInfiniteQuery } from '@tanstack/react-query';

import { sellAPI } from '@/backend';
import type { GetExchangePostsRequest } from '@/backend';

export const useInfiniteExchangePosts = (params?: Omit<GetExchangePostsRequest, 'cursorId'>) => {
  return useInfiniteQuery({
    queryKey: ['exchange-posts-infinite', params],
    queryFn: async ({ pageParam }) => {
      const response = await sellAPI.getPosts({
        ...params,
        cursorId: pageParam,
        size: 10,
      });
      return response.content;
    },
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => {
      if (!lastPage.nextCursor || !lastPage.nextCursor.id) {
        return undefined;
      }
      return lastPage.nextCursor.id;
    },
    staleTime: 0,
    gcTime: 10 * 60 * 1000, // 10분간 가비지 컬렉션 방지
    refetchOnWindowFocus: false, // 탭 전환 시 자동 refetch 비활성화
    refetchInterval: false, // 자동 polling 비활성화
    refetchOnReconnect: true, // 네트워크 복구 시에만 자동 refetch
    retry: (failureCount, error) => {
      if (
        error instanceof Error &&
        (error.message.includes('404') || error.message.includes('403'))
      ) {
        return false;
      }
      return failureCount < 2;
    },
  });
};
