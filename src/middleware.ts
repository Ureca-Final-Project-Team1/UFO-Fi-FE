import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  if (process.env.DISABLE_AUTH_MIDDLEWARE === 'true') {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;
  const authToken = request.cookies.get('Authorization')?.value;
  const isAuthenticated = !!authToken;

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname === '/favicon.ico' ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/icons')
  ) {
    return NextResponse.next();
  }

  // 보호된 라우트 (인증 필요)
  const protectedRoutes = [
    '/sell',
    '/exchange',
    '/signal',
    '/mypage',
    '/admin',
    '/onboarding',
    '/payment',
    '/profile',
    '/charge',
  ];

  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));

  // 보호된 라우트에 비인증 사용자가 접근하려고 할 때
  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images|icons).*)'],
};
