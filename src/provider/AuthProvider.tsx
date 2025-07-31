'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useUserRole } from '@/features/signup/hooks/useUserRole';
import { Loading } from '@/shared';

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [hasRedirected, setHasRedirected] = useState(false);

  const isLoginSignupPage = pathname.startsWith('/login') || pathname.startsWith('/signup');

  // 로그인, 회원가입을 제외한 모든 페이지에서 사용자 정보를 가져옴
  const { userRole, isLoading, error } = useUserRole(!isLoginSignupPage);

  useEffect(() => {
    // 이미 리다이렉트했거나 로딩 중이면 처리하지 않음
    if (hasRedirected || isLoading) return;

    // 에러 발생 시 로그인 페이지로 (로그인 관련 페이지가 아닌 경우만)
    if (error && !pathname.startsWith('/login') && !pathname.startsWith('/signup')) {
      setHasRedirected(true);
      router.replace('/login');
      return;
    }

    // 사용자 역할에 따른 처리
    if (userRole) {
      // 1. ROLE_REPORTED 유저는 블랙홀로
      if (userRole === 'ROLE_REPORTED' && pathname !== '/blackhole') {
        setHasRedirected(true);
        router.replace('/blackhole?mode=self');
        return;
      }

      // 2. ROLE_NO_INFO 유저는 회원가입으로 (단, 이미 회원가입 페이지에 있지 않은 경우만)
      if (userRole === 'ROLE_NO_INFO' && !pathname.startsWith('/signup')) {
        setHasRedirected(true);
        router.replace('/signup/privacy');
        return;
      }

      // 3. ROLE_ADMIN이 아닌 사용자가 관리자 페이지 접근
      if (pathname.startsWith('/admin') && userRole !== 'ROLE_ADMIN') {
        setHasRedirected(true);
        router.replace('/');
        return;
      }

      // 4. 일반 사용자가 회원가입 페이지 접근
      if (userRole === 'ROLE_USER' && pathname.startsWith('/signup')) {
        setHasRedirected(true);
        router.replace('/');
        return;
      }

      // 5. 홈 리다이렉트
      // 로그인된 사용자가 로그인 페이지 접근 시 홈으로 리다이렉트
      // 만약 어드민이라면 백오피스로 이동
      if (userRole === 'ROLE_USER' && pathname.startsWith('/login')) {
        setHasRedirected(true);
        router.replace('/');
        return;
      } else if (userRole === 'ROLE_ADMIN' && pathname.startsWith('/login')) {
        setHasRedirected(true);
        router.replace('/admin');
        return;
      }
    }

    // 홈페이지에서 비로그인 사용자 처리
    if (pathname === '/' && !userRole && !isLoading && !error) {
      setHasRedirected(true);
      router.replace('/login');
      return;
    }
  }, [pathname, router, userRole, isLoading, error, hasRedirected]);

  // 로딩 중일 때
  if (isLoading) {
    return <Loading />;
  }

  return <>{children}</>;
}
