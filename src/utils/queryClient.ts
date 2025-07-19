import { QueryClient } from '@tanstack/react-query';

import { ApiError } from '@/api';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5분
      retry: (failureCount, error) => {
        // 클라이언트 에러는 재시도하지 않음
        if (error instanceof ApiError && error.statusCode >= 400 && error.statusCode < 500) {
          return false;
        }
        return failureCount < 2; // 최대 2번 재시도
      },
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: false, // mutation 재시도 비활성화
    },
  },
});

// 기본 query key 팩토리
export const queryKeys = {
  notifications: (userId: number) => ['notifications', userId],
  plans: (carrier: string) => ['plans', carrier],
  user: (userId: string) => ['user', userId],
  followers: () => ['followers'],
  following: () => ['following'],
} as const;

export default queryClient;
