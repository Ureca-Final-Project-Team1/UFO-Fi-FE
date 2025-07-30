'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

import { ROUTE_CONFIG, routeUtils } from '@/constants/routes';
import { useUserRole } from '@/features/signup/hooks/useUserRole';
import { Loading } from '@/shared';

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
    if (isPublicRoute) {
      return;
    }

    // 로딩 중이면 대기
    if (shouldFetchUserInfo && isLoading) {
      return;
    }

    // 에러가 발생한 경우 로그인 페이지로 이동
    if (shouldFetchUserInfo && error) {
      router.replace('/login');
      return;
    }

    // 사용자 정보를 가져왔지만 userRole이 없는 경우
    if (shouldFetchUserInfo && !isLoading && !userRole) {
      router.replace('/login');
      return;
    }

    if (shouldFetchUserInfo && userRole) {
      // 1. ROLE_REPORTED 유저는 모든 경로 차단 후 블랙홀로 이동
      if (userRole === 'ROLE_REPORTED' && pathname !== '/blackhole') {
        router.replace('/blackhole?mode=self');
        return;
      }

      // 2. ROLE_NO_INFO 유저는 회원가입 페이지로 이동
      if (userRole === 'ROLE_NO_INFO' && !routeUtils.isSignupRoute(pathname)) {
        router.replace('/signup/privacy');
        return;
      }

      // 3. 관리자 페이지는 관리자만 접근 가능
      if (routeUtils.isAdminRoute(pathname) && userRole !== 'ROLE_ADMIN') {
        router.replace(ROUTE_CONFIG.DEFAULT_REDIRECT);
        return;
      }

      // 4. 일반 사용자가 회원가입 페이지에 접근하면 홈으로 이동
      if (userRole === 'ROLE_USER' && routeUtils.isSignupRoute(pathname)) {
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
    return <Loading />;
  }

  // 에러나 권한 없으면 처리하지 않고 useEffect에서 리다이렉트하도록 함
  if (shouldFetchUserInfo && (error || !userRole)) {
    // 로딩 화면을 보여주면서 useEffect에서 리다이렉트 처리
    return <Loading />;
  }

  return <>{children}</>;
}
