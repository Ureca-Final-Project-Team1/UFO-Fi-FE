'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { routeUtils } from '@/constants';
import { useUserRole } from '@/features';
import { Loading } from '@/shared';

interface AuthProviderProps {
  children: React.ReactNode;
}

/**
 * 인증 및 권한에 따라 접근을 제어하는 프로바이더 컴포넌트
 * - 보호된 라우트에서는 유저 역할을 기반으로 리다이렉션 처리
 * - 공개 라우트 또는 예외 경로는 그대로 접근 허용
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [hasRedirected, setHasRedirected] = useState(false);

  // 공개 또는 예외 라우트가 아닌 경우에만 사용자 정보를 조회
  const shouldFetchUser =
    !routeUtils.isPublicRoute(pathname) && !routeUtils.isExemptRoute(pathname);

  const { userRole, isLoading, error } = useUserRole(shouldFetchUser);

  useEffect(() => {
    if (hasRedirected || isLoading) return;

    // 공개 또는 예외 라우트는 인증 검사 없이 통과
    if (routeUtils.isPublicRoute(pathname) || routeUtils.isExemptRoute(pathname)) {
      return;
    }

    // 사용자 정보 조회 중 에러 → 로그인 페이지로 이동
    if (error) {
      // eslint-disable-next-line no-console
      console.log('AuthProvider - Error occurred, redirecting to login');
      setHasRedirected(true);
      router.replace('/login');
      return;
    }

    if (userRole) {
      // 1. 신고된 유저 → 블랙홀로 강제 이동
      if (userRole === 'ROLE_REPORTED' && pathname !== '/blackhole') {
        // eslint-disable-next-line no-console
        console.log('AuthProvider - ROLE_REPORTED user, redirecting to blackhole');
        setHasRedirected(true);
        router.replace('/blackhole?mode=self');
        return;
      }

      // 2. 회원정보 미입력 유저 → 회원가입 절차로 이동
      if (userRole === 'ROLE_NO_INFO' && !pathname.startsWith('/signup')) {
        // eslint-disable-next-line no-console
        console.log('AuthProvider - ROLE_NO_INFO user, redirecting to signup');
        setHasRedirected(true);
        router.replace('/signup/privacy');
        return;
      }

      // 3. 일반 유저가 관리자 페이지 접근 시 → 홈으로 이동
      if (routeUtils.isAdminRoute(pathname) && userRole !== 'ROLE_ADMIN') {
        // eslint-disable-next-line no-console
        console.log('AuthProvider - Non-admin accessing admin route, redirecting to home');
        setHasRedirected(true);
        router.replace('/');
        return;
      }

      // 4. 일반 유저가 회원가입 라우트 접근 시 → 홈으로 이동
      if (userRole === 'ROLE_USER' && routeUtils.isSignupRoute(pathname)) {
        // eslint-disable-next-line no-console
        console.log('AuthProvider - Regular user accessing signup, redirecting to home');
        setHasRedirected(true);
        router.replace('/');
        return;
      }
    }
  }, [pathname, router, userRole, isLoading, error, hasRedirected]);

  // 보호된 라우트에서 유저 정보 로딩 중일 경우
  if (isLoading && shouldFetchUser) {
    return <Loading />;
  }

  return <>{children}</>;
}
