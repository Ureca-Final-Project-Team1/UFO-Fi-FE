import { NextRequest, NextResponse } from 'next/server';

import { routeUtils } from '@/constants/routes';

export function middleware(request: NextRequest) {
  if (process.env.DISABLE_AUTH_MIDDLEWARE === 'true') {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;
  const authToken = request.cookies.get('Authorization')?.value;
  const isAuthenticated = !!authToken;

  // 예외 경로들 (미들웨어에서 처리하지 않음)
  const exemptPaths = [
    '/api',
    '/_next',
    '/favicon.ico',
    '/images',
    '/icons',
    '/login',
    '/signup',
    '/blackhole',
  ];

  const conditionalRoutes = ['/', '/onboarding'];

  // 예외 경로 체크
  if (exemptPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // 공개 라우트는 인증 체크 안함
  if (routeUtils.isPublicRoute(pathname)) {
    return NextResponse.next();
  }

  // 홈페이지와 온보딩은 로그인된 사용자만 접근 가능
  if (conditionalRoutes.includes(pathname)) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
  }

  // 1. 비로그인 유저가 보호된 라우트 접근 시 → /login
  if (!isAuthenticated && routeUtils.isProtectedRoute(pathname)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 2. 비로그인 유저가 관리자 페이지 접근 시 → /login
  if (pathname.startsWith('/admin') && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images|icons).*)'],
};
