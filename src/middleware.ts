import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const onboardingCompleted = request.cookies.get('ufo_fi_onboarding_completed')?.value === 'true';

  const protectedRoutes = ['/', '/sell', '/exchange', '/market', '/mypage'];
  const exemptRoutes = ['/onboarding', '/login', '/signup', '/api'];

  // 1. 예외 라우트는 통과
  if (exemptRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // 2. 온보딩이 필요한 경로인데 완료되지 않았을 경우
  if (protectedRoutes.some((route) => pathname.startsWith(route)) && !onboardingCompleted) {
    return NextResponse.redirect(new URL('/onboarding', request.url));
  }

  // 3. 온보딩 완료 상태에서 온보딩 페이지 접근 시 홈으로 이동
  if (pathname.startsWith('/onboarding') && onboardingCompleted) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
