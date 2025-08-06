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
// Next.js API 라우트 베이스 URL
export const API_NEXT_URL = process.env.NEXT_PUBLIC_NEXT_SERVER_URL || 'http://localhost:3000';
// Next.js API 라우트 URL
export const API_SELF_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

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
  // Plan(1)
  PLANS: '/plans', // 요금제 조회

  // User(6)
  USER: {
    ROLE: '/admin/user/grant-user', // 사용자 비활성화 풀기
    PROFILE_UPDATE: '/users/me/profile', // 나의 프로필 수정
    REPORTED_USERS: '/users/role/reported', // 비활성 사용자 조회
    SIGNUP_USER_INFO: '/users/me/user-info', // 회원가입
    ANOTHER_PROFILE: (anotherUserId: number) => `/users/${anotherUserId}/profile`, // 상대방 유저 조회
    PROFILE: '/users/me/profile', // 나의 프로필 조회
  },

  // Order(5)
  ORDER: {
    PURCHASE: '/trade-posts/purchase', // 구매(Zet <-> Data)
    BULK_PURCHASE_POST: '/trade-posts/bulk-purchase', // 일괄 구매 요청
    SALE_HISTORIES: '/trade-histories/sales', // 판매 내역 조회
    PURCHASE_HISTORIES: '/trade-histories/purchases', // 구매 내역 조회
    PURCHASE_DETAIL: (tradeHistoryId: number) => `/trade-histories/${tradeHistoryId}`, // 구매 내역 상세 보기
  },

  // InterestedPost(1)
  INTERESTED_POST: {
    NOTIFICATION_FILTER: '/v1/notification-filters/interested-post', // 관심 상품 등록 조건 설정
  },

  // Notification(1)
  NOTIFICATION: {
    NOTIFICATION: '/notifications', // 최근 알림 내역 조회
  },

  // Report(3)
  REPORT: {
    ROLL_BACK: '/admin/reports/report', // 관리자용 신고 해지하기
    REPORT_POST: (tradePostId: number) => `/trade-posts/${tradePostId}/report`, // 신고하기
    REPORT_CHECK: '/admin/trade-posts/reported', // 관리자용 신고된 게시물 조회
  },

  // UserPlan(3)
  USER_PLAN: {
    UPDATE_GET_MY_PLAN: (userPlanId: number) => `/user-plan/${userPlanId}`, // 요금제 정보 변경
    SIGNUP: '/user-plan', // 회원가입
    GET_MY_PLAN: '/user-plan', // 나의 요금제 정보 조회
  },

  // Statistics(2)
  STATISTICS: {
    BASIC: '/admin/statistics', // 기본 통계
    REPORTS: '/admin/statistics/reports', // 비활성화 통계
  },

  // Payment(3)
  PAYMENT: {
    STATUS: '/payment/status', // 결제 정보 검증 및 승인
    CHARGE: '/payment', // 충전
    RECOVERY: '/admin/zet-recovery', // 관리자 zet 복구
  },

  // FCM Token(1)
  FCM: {
    FCM_TOKEN: '/fcm/token', // FCM 토큰 저장
  },

  // TradePost(6)
  TRADE_POST: {
    CHECK: (postId: number) => `/posts/${postId}`, // 판매 게시물 상세 조회
    UPDATE: (postId: number) => `/posts/${postId}`, // 판매 게시물 수정
    DELETE: (postId: number) => `/posts/${postId}`, // 판매 게시물 삭제
    LIST: '/posts', // 게시글 전체 조회
    CREATE: '/posts', // 판매 게시물 생성
    BULK_PURCHASE_GET: '/posts/bulk-purchase', // 일괄 구매 조회
  },

  // Follow(4)
  FOLLOW: {
    FOLLOW: (followId: number) => `/follows/${followId}`, // 팔로워 팔로잉 맺기
    FOLLOWINGS: '/follows/followings', // 내 팔로잉 목록 조회
    FOLLOWERS: '/follows/followers', // 내 팔로워 목록 조회
    UNFOLLOW: (followingId: number) => `/follows/${followingId}`, // 팔로워 팔로잉 끊기
  },

  // Auth(2)
  AUTH: {
    LOGOUT: '/logout',
    REFRESH: '/refresh',
  },

  // NotificationSetting(2)
  NOTIFICATION_SETTING: {
    SETTINGS_GET: '/v1/mypage/notification-settings', // 알림 목록 조회
    SETTINGS_UPDATE: '/v1/mypage/notification-settings', // Notification ON/OFF
  },

  // bannedword(4)
  BANNED_WORDS: {
    LIST: '/admin/banned-words', // 금칙어 전체 조회
    CREATE: '/admin/banned-words', // 금칙어 등록
    DELETE_BULK: '/admin/banned-words', // 금칙어 일괄 삭제
    DELETE_SINGLE: (bannedWordId: number) => `/admin/banned-words/${bannedWordId}`, // 금칙어 단일 삭제
  },

  //NextAPI

  //Collections(3)
  COLLECTIONS: {
    CREATE: '/api/collections',
    SEARCH: '/api/collections/search',
    USER_STAT: '/api/collections/user-stats',
  },

  // Achievements(3)
  ACHIEVEMENTS: {
    UPDATE: '/api/achievements/update',
    HONOR: '/api/achievements/honor',
    SELECT_HONOR: '/api/achievements/honor/select',
  },

  // Story(2)
  STORY: {
    GET_LETTERS: '/api/story/letters',
    POST_LETTERS: '/api/story/letters',
  },

  // NextNotification
  NEXT_NOTIFICATION: {
    GET_NOTIFICATION: '/api/notifications',
    UPDATE_NOTIFICATION: (notificationId: string) => `/api/notifications/${notificationId}/read`,
    READ_NOTIFICATION: (notificationId: string) => `/api/notifications/${notificationId}/read`,
    READ_NOTIFICATION_ALL: '/api/notifications',
    COUNT_UNNOTIFICATION: (notificationId: string) => `/api/notifications/${notificationId}/read`,
  },

  REFRESH: '/refresh',
  LOGOUT: '/logout',
} as const;
