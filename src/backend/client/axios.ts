import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import { toast } from 'sonner';

import {
  TIMEOUT,
  API_BASE_URL,
  HTTP_STATUS,
  API_MESSAGES,
  API_ENDPOINTS,
  API_NEXT_URL,
} from '@/constants/api';

// 커스텀 에러 클래스 확장변경 (상태코드 포함)
export class ApiError extends Error {
  public statusCode: number;
  public response?: unknown;

  constructor(message: string, statusCode: number, response?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.response = response;
  }
}

// axios 인스턴스
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: TIMEOUT.DEFAULT,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Next.js API 라우트 전용 axios 인스턴스
const nextAxiosInstance = axios.create({
  baseURL: API_NEXT_URL,
  timeout: TIMEOUT.NEXT_API, // 30초로 증가 (데이터베이스 쿼리 + OpenAI API 호출을 고려함)
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터
axiosInstance.interceptors.request.use((config) => config);
nextAxiosInstance.interceptors.request.use((config) => config);

// 응답 인터셉터 관련 상태 관리
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (error?: unknown) => void;
}> = [];

const processQueue = (error: unknown = null, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });
  failedQueue = [];
};

// Helper: Refresh 쿠키 존재 여부 확인
const hasRefreshCookie = (): boolean => {
  if (typeof document === 'undefined') return false;
  return document.cookie.includes('Refresh=');
};

// Helper: 로그인 성공 페이지인지 확인
const isLoginSuccessPage = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.location.pathname === '/login/success';
};

// axiosInstance 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
    const statusCode = error.response?.status || HTTP_STATUS.INTERNAL_SERVER_ERROR;

    if (statusCode === HTTP_STATUS.UNAUTHORIZED && !originalRequest._retry) {
      // 로그인 성공 페이지에서는 리프레시 시도하지 않고 바로 에러 반환
      if (isLoginSuccessPage()) {
        return Promise.reject(
          new ApiError(API_MESSAGES.AUTH_FAILED_LOGIN_PAGE, HTTP_STATUS.UNAUTHORIZED),
        );
      }

      // Refresh 쿠키 없으면 바로 로그인 만료 처리
      if (!hasRefreshCookie()) {
        if (typeof window !== 'undefined') {
          toast.error(API_MESSAGES.AUTH_EXPIRED);
          setTimeout(() => {
            window.location.href = '/login';
          }, TIMEOUT.REDIRECT_DELAY);
        }
        return Promise.reject(
          new ApiError(API_MESSAGES.NO_REFRESH_TOKEN, HTTP_STATUS.UNAUTHORIZED),
        );
      }

      // 중복 리프레시 방지
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => axiosInstance(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshResponse = await axios.get(`${API_BASE_URL}${API_ENDPOINTS.REFRESH}`, {
          withCredentials: true,
          timeout: TIMEOUT.REFRESH,
        });

        if (refreshResponse.data?.content?.reissueSuccess) {
          processQueue(null, 'refreshed');
          return axiosInstance(originalRequest);
        } else {
          throw new Error(API_MESSAGES.TOKEN_REFRESH_FAILED);
        }
      } catch (refreshError: unknown) {
        processQueue(refreshError, null);

        if (typeof window !== 'undefined') {
          /*
              클라이언트에서 쿠키를 삭제해도 HttpOnly 쿠키는 제거되지 않음
              → 브라우저는 같은 이름의 새 쿠키를 생성해 두 개를 따로 저장함 (중복 쿠키 문제 발생)
          */
          // document.cookie = `Authorization=; expires=${COOKIE_CONFIG.EXPIRES_DATE}; path=${COOKIE_CONFIG.PATH}; ${COOKIE_CONFIG.SAME_SITE};`;
          // document.cookie = `Refresh=; expires=${COOKIE_CONFIG.EXPIRES_DATE}; path=${COOKIE_CONFIG.PATH}; ${COOKIE_CONFIG.SAME_SITE};`;
          toast.error(API_MESSAGES.AUTH_EXPIRED);
          setTimeout(() => {
            window.location.href = '/login';
          }, TIMEOUT.REDIRECT_DELAY);
        }

        return Promise.reject(
          new ApiError(API_MESSAGES.AUTHENTICATION_EXPIRED, HTTP_STATUS.UNAUTHORIZED),
        );
      } finally {
        isRefreshing = false;
      }
    }

    // 에러 메시지 파싱 개선
    const errorData = error.response?.data as
      | { message?: string; content?: string; error?: string }
      | undefined;

    const message =
      errorData?.message || errorData?.content || errorData?.error || API_MESSAGES.REQUEST_ERROR;

    return Promise.reject(new ApiError(message, statusCode, errorData));
  },
);

// nextAxiosInstance 응답 인터셉터 확장
nextAxiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const statusCode = error.response?.status || HTTP_STATUS.INTERNAL_SERVER_ERROR;

    if (statusCode === HTTP_STATUS.UNAUTHORIZED) {
      if (typeof window !== 'undefined') {
        toast.error(API_MESSAGES.AUTH_FAILED);
        setTimeout(() => {
          window.location.href = '/login';
        }, TIMEOUT.REDIRECT_DELAY);
      }
      return Promise.reject(new ApiError(API_MESSAGES.AUTH_ERROR, HTTP_STATUS.UNAUTHORIZED));
    }

    // 에러 응답 데이터 더 안전하게 처리
    const errorData = error.response?.data as
      | { message?: string; content?: string; error?: string }
      | string
      | undefined;

    let message: string;

    // 타임아웃 에러 특별 처리
    if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
      message = API_MESSAGES.TIMEOUT_ERROR;
    } else if (typeof errorData === 'string') {
      message = errorData;
    } else if (errorData && typeof errorData === 'object') {
      message = errorData.message || errorData.content || errorData.error || error.message;
    } else {
      message = error.message || API_MESSAGES.REQUEST_ERROR;
    }

    return Promise.reject(new ApiError(message, statusCode, errorData));
  },
);

// API 요청 함수들
export const apiRequest = {
  get: <T>(url: string, config?: AxiosRequestConfig) => axiosInstance.get<T>(url, config),
  post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    axiosInstance.post<T>(url, data, config),
  patch: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    axiosInstance.patch<T>(url, data, config),
  put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    axiosInstance.put<T>(url, data, config),
  delete: <T>(url: string, config?: AxiosRequestConfig) => axiosInstance.delete<T>(url, config),
};

export const nextApiRequest = {
  get: <T>(url: string, config?: AxiosRequestConfig) => nextAxiosInstance.get<T>(url, config),
  post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    nextAxiosInstance.post<T>(url, data, config),
  patch: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    nextAxiosInstance.patch<T>(url, data, config),
  put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    nextAxiosInstance.put<T>(url, data, config),
  delete: <T>(url: string, config?: AxiosRequestConfig) => nextAxiosInstance.delete<T>(url, config),
};

export default axiosInstance;
