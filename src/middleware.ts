import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { ROUTE_CONFIG, routeUtils } from '@/constants/routes';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 개발 환경에서는 모든 접근 허용
  if (process.env.NODE_ENV === 'development') {
    return NextResponse.next();
  }

  // 예외 라우트는 통과
  if (routeUtils.isExemptRoute(pathname)) {
    return NextResponse.next();
  }

  // 보호된 라우트는 온보딩으로 리다이렉트
  if (routeUtils.isProtectedRoute(pathname)) {
    return NextResponse.redirect(new URL(ROUTE_CONFIG.ONBOARDING_PATH, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
};
