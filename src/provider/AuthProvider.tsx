'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

import { ROUTE_CONFIG, routeUtils } from '@/constants/routes';
import { useUserRole } from '@/features/signup/hooks/useUserRole';

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const isPublicRoute = routeUtils.isPublicRoute(pathname);
  const shouldFetchUserInfo = !isPublicRoute;
  const { userRole, isLoading, error } = useUserRole(shouldFetchUserInfo);

  useEffect(() => {
    // 개발 환경에서는 체크 안함
    if (process.env.NODE_ENV === 'development') return;

    // 공개 라우트는 체크하지 않음
    if (isPublicRoute) return;

    // 로딩 중이면 대기
    if (shouldFetchUserInfo && isLoading) return;

    if (shouldFetchUserInfo && userRole) {
      // 1. ROLE_REPORTED 유저는 모든 경로 차단 후 블랙홀로 이동
      if (userRole === 'ROLE_REPORTED' && pathname !== '/blackhole') {
        router.replace('/blackhole?mode=self');
        return;
      }

      // 2. 관리자 페이지는 관리자만 접근 가능
      if (routeUtils.isAdminRoute(pathname) && userRole !== 'ROLE_ADMIN') {
        router.replace(ROUTE_CONFIG.DEFAULT_REDIRECT);
        return;
      }
    }
  }, [pathname, router, userRole, isLoading, error, isPublicRoute, shouldFetchUserInfo]);

  // 공개 라우트는 바로 렌더링
  if (isPublicRoute) {
    return <>{children}</>;
  }

  // 로딩 중일 때 스피너 표시
  if (shouldFetchUserInfo && isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  // 에러나 권한 없으면 처리
  if (shouldFetchUserInfo && (error || !userRole)) {
    return null;
  }

  return <>{children}</>;
}
