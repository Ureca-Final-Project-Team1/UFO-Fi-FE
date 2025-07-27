import { NextRequest, NextResponse } from 'next/server';

import { routeUtils } from '@/constants/routes';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const authToken = request.cookies.get('Authorization')?.value;
  const isAuthenticated = !!authToken;

  if (!isAuthenticated && routeUtils.isProtectedRoute(pathname)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (pathname.startsWith('/admin') && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images|icons).*)'],
};
