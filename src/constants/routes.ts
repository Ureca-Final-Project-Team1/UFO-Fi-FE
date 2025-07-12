export const ROUTE_CONFIG = {
  // 온보딩이 필요한 보호된 라우트
  PROTECTED_ROUTES: ['/sell', '/exchange', '/market', '/mypage'],

  // 온보딩 없이 접근 가능한 예외 라우트
  EXEMPT_ROUTES: ['/onboarding', '/login', '/signup', '/blackhole', '/_next', '/favicon.ico'],

  // 온보딩 완료 후 이동할 페이지
  DEFAULT_REDIRECT: '/',

  ONBOARDING_PATH: '/onboarding',
} as const;

// 라우트 체크 유틸리티 함수들
export const routeUtils = {
  isProtectedRoute: (pathname: string): boolean => {
    return ROUTE_CONFIG.PROTECTED_ROUTES.some((route) => pathname.startsWith(route));
  },

  isExemptRoute: (pathname: string): boolean => {
    return ROUTE_CONFIG.EXEMPT_ROUTES.some((route) => pathname.startsWith(route));
  },

  shouldRedirectToOnboarding: (pathname: string, isOnboarded: boolean): boolean => {
    return (
      routeUtils.isProtectedRoute(pathname) && !routeUtils.isExemptRoute(pathname) && !isOnboarded
    );
  },

  shouldRedirectToMain: (pathname: string, isOnboarded: boolean): boolean => {
    return pathname === ROUTE_CONFIG.ONBOARDING_PATH && isOnboarded;
  },
};
