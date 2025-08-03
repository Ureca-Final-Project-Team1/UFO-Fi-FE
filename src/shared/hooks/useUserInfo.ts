'use client';

import { useQuery } from '@tanstack/react-query';

import { getUserInfoAPI, getUserInfoResponse } from '@/api';

export const useUserInfo = (enabled: boolean = true) => {
  return useQuery<getUserInfoResponse>({
    queryKey: ['userInfo'],
    queryFn: () => getUserInfoAPI.getInfo(),
    enabled,
    staleTime: 1000 * 60 * 1,
    retry: (failureCount, error) => {
      // 401, 403 에러는 재시도하지 않음
      if (error && typeof error === 'object' && 'statusCode' in error) {
        const statusCode = error.statusCode;
        if (statusCode === 401 || statusCode === 403) return false;
      }
      return failureCount < 2;
    },
  });
};
