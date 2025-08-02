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
interface QueryKeys {
  notifications: (userId: number) => readonly [string, number];
  plans: (carrier: string) => readonly [string, string];
  user: (userId: string) => readonly [string, string];
  exchangePostsInfinite: (params?: unknown) => readonly [string, unknown?];
  exchangePosts: (params?: unknown) => readonly [string, unknown?];
  exchangePost: (postId: number) => readonly [string, number];
  myPosts: () => readonly [string];
  followers: () => readonly [string];
  following: () => readonly [string];
  profile: (userId: number, nickname?: string | null) => readonly [string, number, string];
  followStatus: (userId: number) => readonly [string, number];
  myInfo: () => readonly [string];
}

export const queryKeys: QueryKeys = {
  notifications: (userId: number) => ['notifications', userId] as const,
  plans: (carrier: string) => ['plans', carrier] as const,
  user: (userId: string) => ['user', userId] as const,
  exchangePostsInfinite: (params?: unknown) => ['exchangePostsInfinite', params] as const,
  exchangePosts: (params?: unknown) => ['exchangePosts', params] as const,
  exchangePost: (postId: number) => ['exchangePost', postId] as const,
  myPosts: () => ['myPosts'] as const,
  followers: () => ['followers'] as const,
  following: () => ['following'] as const,
  profile: (userId: number, nickname?: string | null) =>
    ['profile', userId, nickname ?? 'anonymous'] as const,
  followStatus: (userId: number) => ['followStatus', userId] as const,
  myInfo: () => ['myInfo'] as const,
} as const;

export default queryClient;
