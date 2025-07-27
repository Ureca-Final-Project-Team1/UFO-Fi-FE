'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

import { ROUTE_CONFIG, routeUtils } from '@/constants/routes';
import { onboardingUtils } from '@/features/onboarding/utils/onboarding';
import { useUserRole } from '@/features/signup/hooks/useUserRole';

interface RouteGuardProps {
  children: React.ReactNode;
  requireOnboarding?: boolean;
  requireAdmin?: boolean;
  requireAuth?: boolean;
  disableAutoRedirect?: boolean;
}

export function RouteGuard({
  children,
  requireOnboarding = false,
  requireAdmin = false,
  requireAuth = false,
  disableAutoRedirect = false,
}: RouteGuardProps) {
  const router = useRouter();
  const pathname = usePathname();

  const isPublicRoute = routeUtils.isPublicRoute(pathname);
  const shouldFetchUserInfo = !isPublicRoute && (requireAdmin || requireAuth);
  const { userRole, permissions, isLoading, error } = useUserRole(shouldFetchUserInfo);

  useEffect(() => {
    // 공개 라우트는 체크하지 않음
    if (isPublicRoute) return;

    // 자동 리디렉션이 비활성화된 경우 체크하지 않음
    if (disableAutoRedirect) return;

    // 로딩 중이면 대기
    if (shouldFetchUserInfo && isLoading) return;

    // API 에러 발생 시 로그인 페이지로
    if (shouldFetchUserInfo && error) {
      router.replace('/login');
      return;
    }

    // 🔧 통합된 유저 상태 체크 로직
    if (shouldFetchUserInfo && userRole) {
      // 1. 회원가입 미완료 (최우선)
      if (userRole === 'ROLE_NO_INFO' && !pathname.startsWith('/signup')) {
        router.replace('/signup/privacy');
        return;
      }

      // 2. 정지된 유저
      if (userRole === 'ROLE_REPORTED' && pathname !== '/blackhole') {
        router.replace('/blackhole?mode=self');
        return;
      }

      // 3. 관리자 권한 체크
      if (requireAdmin && userRole !== 'ROLE_ADMIN') {
        router.replace('/');
        return;
      }

      // 4. 일반 인증 체크
      if (requireAuth && !permissions.hasAccess) {
        router.replace('/login');
        return;
      }

      // 5. 온보딩 체크 (ROLE_USER인 경우에만)
      if (requireOnboarding && userRole === 'ROLE_USER') {
        const isOnboardingCompleted = onboardingUtils.isCompleted();
        if (!isOnboardingCompleted) {
          router.replace(ROUTE_CONFIG.ONBOARDING_PATH);
          return;
        }
      }
    }

    // userRole이 없어도 온보딩은 체크
    if (requireOnboarding && !shouldFetchUserInfo) {
      const isOnboardingCompleted = onboardingUtils.isCompleted();
      if (!isOnboardingCompleted) {
        router.replace(ROUTE_CONFIG.ONBOARDING_PATH);
        return;
      }
    }
  }, [
    pathname,
    userRole,
    permissions,
    isLoading,
    error,
    router,
    shouldFetchUserInfo,
    requireOnboarding,
    requireAdmin,
    requireAuth,
    disableAutoRedirect,
    isPublicRoute,
  ]);

  // 공개 라우트는 바로 렌더링
  if (isPublicRoute) {
    return <>{children}</>;
  }

  // TODO: 추후 로딩 컴포넌트로 교체 필요
  if (shouldFetchUserInfo && isLoading) {
    return (
      <div className="flex items-center justify-center min-h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  // 에러가 있거나 권한이 없으면 렌더링하지 않음
  if (
    shouldFetchUserInfo &&
    (error || (requireAdmin && !permissions.isAdmin) || (requireAuth && !permissions.hasAccess))
  ) {
    return null;
  }

  return <>{children}</>;
}
