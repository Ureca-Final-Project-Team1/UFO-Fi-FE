import { useQuery } from '@tanstack/react-query';

import { myInfoAPI } from '@/api';
import { ApiError } from '@/api/client/axios';
import { MyInfoResponse } from '@/api/types/myInfo';

export function useMyInfo() {
  return useQuery<MyInfoResponse['content'], ApiError>({
    queryKey: ['myInfo'],
    queryFn: async () => {
      const data = await myInfoAPI.get();
      if (!data) {
        throw new ApiError('프로필 정보를 불러오지 못했습니다.', 404);
      }
      return data;
    },
    staleTime: 1 * 60 * 1000,
    retry: (failureCount, error) => {
      // ApiError의 statusCode 확인
      if (error instanceof ApiError) {
        const { statusCode } = error;
        // 인증/권한/찾지못함 에러는 재시도하지 않음
        if ([401, 403, 404, 422].includes(statusCode)) {
          return false;
        }
      }
      // 최대 2번까지 재시도
      return failureCount < 2;
    },
    refetchInterval: 30 * 1000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    retryOnMount: true,
  });
}
