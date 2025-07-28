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

  // 미들웨어는 단순히 인증 상태만 체크하고, 나머지는 AuthProvider에서 처리
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images|icons).*)'],
};
