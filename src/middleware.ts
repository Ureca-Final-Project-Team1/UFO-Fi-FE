import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 개발 환경에서는 모든 접근 허용
  if (process.env.NODE_ENV === 'development') {
    return NextResponse.next();
  }

  // 온보딩이 필요한 보호된 라우트
  const protectedRoutes = ['/', '/sell', '/exchange', '/market', '/mypage'];

  // 미들웨어를 통과할 예외 라우트
  const exemptRoutes = [
    '/api', // API 라우트
    '/login', // 로그인 페이지
    '/signup', // 회원가입 페이지
    '/blackhole', // 블랙홀 페이지
    '/onboarding', // 온보딩 페이지
    '/_next', // Next.js 내부 파일
    '/favicon.ico', // 파비콘
  ];

  // 1. 정적 파일 및 예외 라우트는 통과
  if (exemptRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // 2. 보호된 라우트 접근 시 온보딩 체크
  const isProtectedRoute = protectedRoutes.some((route) => {
    // 정확한 경로 매칭
    if (route === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(route);
  });

  if (isProtectedRoute) {
    return NextResponse.redirect(new URL('/onboarding', request.url));
  }

  // 3. 기타 모든 라우트는 통과
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
};
