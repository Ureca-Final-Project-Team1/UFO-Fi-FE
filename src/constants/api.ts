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
  REFRESH: '/refresh',
} as const;
