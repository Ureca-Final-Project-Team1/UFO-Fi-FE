export const ROUTE_CONFIG = {
  // 보호된 라우트 (인증 필요)
  PROTECTED_ROUTES: ['/sell', '/exchange', '/signal', '/mypage', '/onboarding'],

  // 공개 라우트 (인증 불필요)
  PUBLIC_ROUTES: ['/', '/login', '/login/success', '/signup/**'],

  // 회원가입 관련 라우트
  SIGNUP_ROUTES: ['/signup/privacy', '/signup/profile', '/signup/plan'],

  // 관리자 전용 라우트
  ADMIN_ROUTES: ['/admin/**'],

  // 정지된 사용자 라우트
  BLACKHOLE_ROUTES: ['/blackhole'],

  // 리디렉션 경로
  DEFAULT_REDIRECT: '/',
  ONBOARDING_PATH: '/onboarding',
  LOGIN_PATH: '/login',
  BLACKHOLE_PATH: '/blackhole',
} as const;

export const routeUtils = {
  // 보호된 라우트 확인 (인증 필요)
  isProtectedRoute: (pathname: string): boolean => {
    return ROUTE_CONFIG.PROTECTED_ROUTES.some((route) => pathname.startsWith(route));
  },

  // 공개 라우트 확인 (인증 불필요)
  isPublicRoute: (pathname: string): boolean => {
    return ROUTE_CONFIG.PUBLIC_ROUTES.some((route) => {
      if (route.endsWith('/**')) {
        return pathname.startsWith(route.slice(0, -3));
      }
      return pathname === route || pathname.startsWith(route + '/');
    });
  },

  // 회원가입 라우트 확인
  isSignupRoute: (pathname: string): boolean => {
    return ROUTE_CONFIG.SIGNUP_ROUTES.some((route) => pathname.startsWith(route));
  },

  // 관리자 라우트 확인
  isAdminRoute: (pathname: string): boolean => {
    return pathname.startsWith('/admin');
  },

  // 블랙홀 라우트 확인
  isBlackholeRoute: (pathname: string): boolean => {
    return pathname === ROUTE_CONFIG.BLACKHOLE_PATH;
  },

  // 예외 라우트 확인
  isExemptRoute: (pathname: string): boolean => {
    return (
      routeUtils.isPublicRoute(pathname) ||
      pathname.startsWith('/_next') ||
      pathname === '/favicon.ico'
    );
  },
};
