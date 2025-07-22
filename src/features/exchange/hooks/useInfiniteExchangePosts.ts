import { useInfiniteQuery } from '@tanstack/react-query';

import { exchangeAPI } from '@/api';
import type { GetExchangePostsRequest } from '@/api';

export const useInfiniteExchangePosts = (params?: Omit<GetExchangePostsRequest, 'cursorId'>) => {
  return useInfiniteQuery({
    queryKey: ['exchange-posts-infinite', params],
    queryFn: ({ pageParam }) =>
      exchangeAPI.getPosts({
        ...params,
        cursorId: pageParam,
        size: 10,
      }),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => {
      if (!lastPage.nextCursor || !lastPage.nextCursor.id) {
        return undefined;
      }
      return lastPage.nextCursor.id;
    },
    staleTime: 0, // 캐시 무효화
    refetchInterval: 10 * 1000, // 10초마다 polling
    refetchOnWindowFocus: true, // 탭 전환 시 자동 refetch
    refetchOnReconnect: true, // 네트워크 복구 시 자동 refetch
  });
};
