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
        size: 10, // 한 번에 10개씩
      }),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => {
      // nextCursor가 있으면 다음 페이지 존재
      return lastPage.nextCursor?.cursorId;
    },
    staleTime: 1000 * 60 * 2, // 2분 캐시
  });
};
