import { useQuery } from '@tanstack/react-query';

import { myInfoAPI } from '@/backend';
import { ApiError } from '@/backend/client/axios';
import { MyInfoResponse } from '@/backend/types/myInfo';
import { queryKeys } from '@/utils';

export function useMyInfo(enabled: boolean = true) {
  return useQuery<MyInfoResponse['content'] | null, unknown>({
    queryKey: queryKeys.myInfo(),
    queryFn: async () => {
      try {
        const data = await myInfoAPI.get();
        if (!data) {
          return null;
        }
        return data;
      } catch (error) {
        // 인증 오류면 로그아웃 상태로 처리
        if (error instanceof ApiError && [401, 403].includes(error.statusCode)) {
          return null;
        }
        throw error;
      }
    },
    staleTime: 60 * 1000,
    retry: (failureCount, error) => {
      if (error instanceof ApiError) {
        if ([401, 403, 404, 422].includes(error.statusCode)) {
          return false;
        }
      }
      return failureCount < 2;
    },
    // 로그아웃 상태에서는 자동 새로고침 안함
    refetchInterval: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retryOnMount: true,
    enabled,
  });
}
