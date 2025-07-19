export const ROUTE_CONFIG = {
  // 온보딩이 필요한 보호된 라우트
  PROTECTED_ROUTES: ['/sell', '/exchange', '/signal', '/mypage'],

  // 온보딩 없이 접근 가능한 예외 라우트
  EXEMPT_ROUTES: [
    '/onboarding',
    '/login',
    '/signup/**', // 회원가입 관련 페이지 전체
    '/blackhole',
    '/_next',
    '/favicon.ico',
    '/', // 홈 페이지
  ],

  // 온보딩 완료 후 이동할 페이지
  DEFAULT_REDIRECT: '/',

  ONBOARDING_PATH: '/onboarding',
} as const;

// 라우트 체크 유틸리티 함수들
export const routeUtils = {
  isProtectedRoute: (pathname: string): boolean => {
    const isProtected = ROUTE_CONFIG.PROTECTED_ROUTES.some((route) => pathname.startsWith(route));
    return isProtected;
  },

  isExemptRoute: (pathname: string): boolean => {
    const isExempt = ROUTE_CONFIG.EXEMPT_ROUTES.some((route) => pathname.startsWith(route));
    return isExempt;
  },

  shouldRedirectToOnboarding: (pathname: string, isOnboarded: boolean): boolean => {
    return (
      routeUtils.isProtectedRoute(pathname) && !routeUtils.isExemptRoute(pathname) && !isOnboarded
    );
  },

  shouldRedirectToMain: (pathname: string, isOnboarded: boolean): boolean => {
    return pathname === ROUTE_CONFIG.ONBOARDING_PATH && isOnboarded;
  },

  shouldCheckOnboarding: (pathname: string): boolean => {
    return routeUtils.isProtectedRoute(pathname) && !routeUtils.isExemptRoute(pathname);
  },
};
