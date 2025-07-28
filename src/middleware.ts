import { NextRequest, NextResponse } from 'next/server';

import { routeUtils } from '@/constants/routes';

export function middleware(request: NextRequest) {
  if (process.env.DISABLE_AUTH_MIDDLEWARE === 'true') {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;
  const authToken = request.cookies.get('Authorization')?.value;
  const isAuthenticated = !!authToken;

  // 1. 비로그인 유저가 보호된 라우트 접근 시 → /login
  if (!isAuthenticated && routeUtils.isProtectedRoute(pathname)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 2. 비로그인 유저가 관리자 페이지 접근 시 → /login
  if (pathname.startsWith('/admin') && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 3. 온보딩 미완료 유저가 보호 라우트 접근 시 → /onboarding 리디렉션
  if (
    isAuthenticated &&
    routeUtils.isProtectedRoute(pathname) &&
    !pathname.startsWith('/onboarding') &&
    request.cookies.get('ufo_fi_onboarding_completed')?.value !== 'true'
  ) {
    return NextResponse.redirect(new URL('/onboarding', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images|icons).*)'],
};
