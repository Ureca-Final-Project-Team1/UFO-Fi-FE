'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

import { ROUTE_CONFIG, routeUtils } from '@/constants/routes';
import { onboardingUtils } from '@/features/onboarding/utils/onboarding';
import { useUserRole } from '@/features/signup/hooks/useUserRole';

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const isPublicRoute = routeUtils.isPublicRoute(pathname);
  const shouldFetchUserInfo = !isPublicRoute;
  const { userRole, permissions, isLoading, error } = useUserRole(shouldFetchUserInfo);

  useEffect(() => {
    // 개발 환경에서는 체크 안함
    if (process.env.NODE_ENV === 'development') return;

    // 공개 라우트는 체크하지 않음
    if (isPublicRoute) return;

    // 로딩 중이면 대기
    if (shouldFetchUserInfo && isLoading) return;

    // API 에러 발생 시 로그인 페이지로
    if (shouldFetchUserInfo && error) {
      router.replace('/login');
      return;
    }

    if (shouldFetchUserInfo && userRole) {
      // 1. 회원가입 미완료
      if (userRole === 'ROLE_NO_INFO' && !pathname.startsWith('/signup')) {
        router.replace('/signup/privacy');
        return;
      }

      // 2. 정지된 유저
      if (userRole === 'ROLE_REPORTED' && pathname !== '/blackhole') {
        router.replace('/blackhole?mode=self');
        return;
      }

      // 3. 관리자 페이지는 관리자만
      if (pathname.startsWith('/admin') && userRole !== 'ROLE_ADMIN') {
        router.replace('/');
        return;
      }

      // 4. 보호된 라우트는 로그인한 유저만
      if (routeUtils.isProtectedRoute(pathname) && userRole === 'ROLE_USER') {
        const isOnboardingCompleted = onboardingUtils.isCompleted();
        if (!isOnboardingCompleted) {
          router.replace(ROUTE_CONFIG.ONBOARDING_PATH);
          return;
        }
      }
    } else if (shouldFetchUserInfo && !userRole) {
      // 유저 정보가 없으면 로그인 필요
      router.replace('/login');
      return;
    }

    // 기존 온보딩 체크
    if (routeUtils.shouldCheckOnboarding(pathname)) {
      const isCompleted = onboardingUtils.isCompleted();
      if (!isCompleted) {
        router.push(ROUTE_CONFIG.ONBOARDING_PATH);
      }
    }
  }, [
    pathname,
    router,
    userRole,
    permissions,
    isLoading,
    error,
    isPublicRoute,
    shouldFetchUserInfo,
  ]);

  // 공개 라우트는 바로 렌더링
  if (isPublicRoute) {
    return <>{children}</>;
  }

  // TODO: 로딩 중일 때 스피너 표시, 추후 로딩 컴포넌트로 변경 예정
  if (shouldFetchUserInfo && isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  // 에러나 권한 없으면 처리
  if (
    shouldFetchUserInfo &&
    (error ||
      (pathname.startsWith('/admin') && userRole !== 'ROLE_ADMIN') ||
      (routeUtils.isProtectedRoute(pathname) &&
        userRole === 'ROLE_USER' &&
        !onboardingUtils.isCompleted()))
  ) {
    return null;
  }

  return <>{children}</>;
}
