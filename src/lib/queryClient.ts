import { QueryClient, QueryClientConfig } from '@tanstack/react-query';
import { toast } from 'sonner';

import { ApiError } from '@/lib/axios';

// React Query 베이스 설정
const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      // 데이터 캐싱 시간 (5분)
      staleTime: 1000 * 60 * 5,
      // 가비지 컬렉션 시간 (10분)
      gcTime: 1000 * 60 * 10,
      // 에러 시 재시도 횟수
      retry: (failureCount: number, error: unknown) => {
        // ApiError 타입 체크
        if (error instanceof ApiError) {
          // 401, 403, 404는 재시도하지 않음
          if ([401, 403, 404].includes(error.statusCode)) {
            return false;
          }
        }
        // 3번까지 재시도
        return failureCount < 3;
      },
      // 재시도 지연 시간 (지수적 증가)
      retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30000),
      // 윈도우 포커스 시 refetch 비활성화
      refetchOnWindowFocus: false,
      // 네트워크 재연결 시 refetch 활성화
      refetchOnReconnect: true,
    },
    mutations: {
      // mutation 에러 시 재시도 비활성화
      retry: false,
      // mutation 에러 시 토스트 표시
      onError: (error: unknown) => {
        if (error instanceof ApiError) {
          toast.error(error.message);
        } else if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error('알 수 없는 오류가 발생했습니다.');
        }
      },
    },
  },
};

export const queryClient = new QueryClient(queryClientConfig);

// Query Key 팩토리 패턴
export const queryKeys = {
  // 사용자 관련
  users: ['users'] as const,
  user: (id: string) => [...queryKeys.users, id] as const,
  userProfile: () => [...queryKeys.users, 'profile'] as const,

  // 상품 관련
  products: ['products'] as const,
  product: (id: string) => [...queryKeys.products, id] as const,
  productsByCategory: (category: string) => [...queryKeys.products, 'category', category] as const,
  productsByUser: (userId: string) => [...queryKeys.products, 'user', userId] as const,

  // 거래 관련
  trades: ['trades'] as const,
  trade: (id: string) => [...queryKeys.trades, id] as const,
  tradesByUser: (userId: string) => [...queryKeys.trades, 'user', userId] as const,

  // 시세 관련
  markets: ['markets'] as const,
  marketPrices: () => [...queryKeys.markets, 'prices'] as const,
  marketTrends: () => [...queryKeys.markets, 'trends'] as const,

  // 알림 관련
  notifications: ['notifications'] as const,
  unreadNotifications: () => [...queryKeys.notifications, 'unread'] as const,
} as const;

// Query 무효화 헬퍼 함수
export const invalidateQueries = {
  // 사용자 관련 쿼리 무효화
  users: () => queryClient.invalidateQueries({ queryKey: queryKeys.users }),
  user: (id: string) => queryClient.invalidateQueries({ queryKey: queryKeys.user(id) }),
  userProfile: () => queryClient.invalidateQueries({ queryKey: queryKeys.userProfile() }),

  // 상품 관련 쿼리 무효화
  products: () => queryClient.invalidateQueries({ queryKey: queryKeys.products }),
  product: (id: string) => queryClient.invalidateQueries({ queryKey: queryKeys.product(id) }),
  productsByCategory: (category: string) =>
    queryClient.invalidateQueries({ queryKey: queryKeys.productsByCategory(category) }),

  // 거래 관련 쿼리 무효화
  trades: () => queryClient.invalidateQueries({ queryKey: queryKeys.trades }),
  trade: (id: string) => queryClient.invalidateQueries({ queryKey: queryKeys.trade(id) }),

  // 시세 관련 쿼리 무효화
  // markets: () => queryClient.invalidateQueries({ queryKey: queryKeys.markets }),

  // 알림 관련 쿼리 무효화
  notifications: () => queryClient.invalidateQueries({ queryKey: queryKeys.notifications }),
};

// 특정 쿼리 데이터 업데이트 헬퍼
export const setQueryData = {
  user: <T>(id: string, data: T) => queryClient.setQueryData(queryKeys.user(id), data),
  product: <T>(id: string, data: T) => queryClient.setQueryData(queryKeys.product(id), data),
  // trade: <T>(id: string, data: T) => queryClient.setQueryData(queryKeys.trade(id), data),
};

export default queryClient;
