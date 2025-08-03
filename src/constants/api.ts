/**
 * API 관련 상수들
 */

// 타임아웃 설정 (밀리초)
export const TIMEOUT = {
  /** 기본 API 요청 타임아웃 (10초) */
  DEFAULT: 10000,
  /** Next.js API 라우트 타임아웃 (30초) - 데이터베이스 쿼리 + OpenAI API 호출을 고려 */
  NEXT_API: 30000,
  /** 토큰 리프레시 타임아웃 (5초) */
  REFRESH: 5000,
  /** 로그인 리디렉션 지연 시간 (1초) */
  REDIRECT_DELAY: 1000,
} as const;

// API 베이스 URL
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

// HTTP 상태 코드
export const HTTP_STATUS = {
  UNAUTHORIZED: 401,
  INTERNAL_SERVER_ERROR: 500,
} as const;

// API 응답 메시지
export const API_MESSAGES = {
  AUTH_EXPIRED: '로그인이 만료되었습니다. 다시 로그인해주세요.',
  AUTH_FAILED: '인증이 만료되었습니다.',
  REQUEST_ERROR: '요청 처리 중 오류가 발생했습니다.',
  TIMEOUT_ERROR: '요청 시간이 초과되었습니다. 잠시 후 다시 시도해주세요.',
  NO_REFRESH_TOKEN: 'No refresh token',
  AUTH_FAILED_LOGIN_PAGE: 'Authentication failed on login success page',
  TOKEN_REFRESH_FAILED: 'Token refresh failed',
  AUTHENTICATION_EXPIRED: 'Authentication expired',
  AUTH_ERROR: '인증 오류',
} as const;

// 쿠키 설정
export const COOKIE_CONFIG = {
  EXPIRES_DATE: 'Thu, 01 Jan 1970 00:00:00 UTC',
  PATH: '/',
  SAME_SITE: 'SameSite=Strict',
} as const;

// API 엔드포인트
export const API_ENDPOINTS = {
  // User(6)
  USER: {
    SIGNUP_USER_INFO: '/signup/user-info',
    PROFILE: (userId: number) => `/${userId}/profile`,
    PROFILE_UPDATE: (userId: number) => `/${userId}/profile`,
    ANOTHER_PROFILE: (anotherUserId: number) => `/${anotherUserId}/profile`,
    ROLE: (userId: number) => `/${userId}/role`,
    REPORTED_USERS: '/users/role/reported',
  },

  // UserPlan(3)
  USER_PLAN: {
    SIGNUP: '/user-plan',
    GET_MY_PLAN: '/user-plan',
    UPDATE_GET_MY_PLAN: (userPlanId: number) => `/user-plan/${userPlanId}`,
  },

  // Plan(1)
  PLANS: '/plans',

  // TradePost(5)
  TRADE_POST: {
    UPDATE: (postId: number) => `/posts/${postId}`,
    DELETE: (postId: number) => `/posts/${postId}`,
    LIST: '/posts', // 전체조회
    CREATE: '/posts',
    BULK_PURCHASE_GET: '/posts/bulk-purchase', // 일괄구매 조회
  },

  // Order(5)
  ORDER: {
    SALE_HISTORIES: '/trade-histories/sale', // 판매내역 조회
    PURCHASE_HISTORIES: '/trade-histories/purchase', // 구매내역 조회
    PURCHASE_DETAIL: (tradeHistoryId: number) => `/trade-histories/${tradeHistoryId}`, // 내역 상세보기
    PURCHASE: '/posts/purchase', // 구매
    BULK_PURCHASE_POST: '/posts/bulk-purchase', // 일괄구매 요청
  },

  // bannedword(4)
  BANNED_WORDS: {
    LIST: '/banned-words',
    CREATE: '/banned-word',
    DELETE_BULK: '/banned-words',
    DELETE_SINGLE: (bannedWordId: number) => `/banned-words/${bannedWordId}`,
  },

  // Follow(4)
  FOLLOW: {
    FOLLOW: (followId: number) => `/follow/${followId}`,
    UNFOLLOW: (followingId: number) => `/follow/${followingId}`,
    FOLLOWINGS: '/follows/followings',
    FOLLOWERS: '/follows/followers',
  },

  // Notification(4)
  NOTIFICATION: {
    FCM_TOKEN: '/fcm/token',
    INTERESTED_POST_FILTER: '/notification-filters/interested-post',
    SETTINGS_GET: '/notification-settings',
    SETTINGS_UPDATE: '/notification-settings',
  },

  // InterestedPost

  // Payment(2)
  PAYMENT: {
    STATUS: '/payment/status', // 결제 정보 검증 및 승인
    CHARGE: '/payment', // 충전
  },

  // Report(2)
  REPORT: {
    ROLL_BACK: '/reports/report', // 어드민 신고 해지
    REPORT_POST: (tradePostId: number) => `/trade-posts/${tradePostId}/report`, // 신고하기
  },

  // Statistics(2)
  STATISTICS: {
    BASIC: '/statistics',
    REPORTS: '/statistics/reports',
  },

  REFRESH: '/refresh',
  LOGOUT: '/logout',
} as const;
