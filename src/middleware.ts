import { NextRequest, NextResponse } from 'next/server';

import { routeUtils } from '@/constants/routes';

export function middleware(request: NextRequest) {
  if (process.env.DISABLE_AUTH_MIDDLEWARE === 'true') {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;
  const authToken = request.cookies.get('Authorization')?.value;
  const isAuthenticated = !!authToken;

  // 예외 라우트 처리
  if (routeUtils.isExemptRoute(pathname)) {
    return NextResponse.next();
  }

  // 공개 라우트 확인
  if (routeUtils.isPublicRoute(pathname) || routeUtils.isSignupRoute(pathname)) {
    return NextResponse.next();
  }

  // 보호된 라우트 확인
  const isProtectedRoute = routeUtils.isProtectedRoute(pathname);

  // 보호된 라우트에 비인증 사용자가 접근하려고 할 때
  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL('/login', request.url);
    // 원래 접근하려던 URL을 리다이렉트 파라미터로 저장
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 인증된 사용자가 블랙홀 라우트 접근 시
  if (routeUtils.isBlackholeRoute(pathname)) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * 다음을 제외한 모든 요청 경로에 매칭:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images, icons (static assets)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|images|icons).*)',
  ],
};
