import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import { toast } from 'sonner';

// 커스텀 에러 클래스 (상태코드 포함)
export class ApiError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
  }
}

// axios 인스턴스
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080',
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Next.js API 라우트 전용 axios 인스턴스
const nextAxiosInstance = axios.create({
  baseURL: '',
  timeout: 10000,
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
    const statusCode = error.response?.status || 500;

    if (statusCode === 401 && !originalRequest._retry) {
      // 로그인 성공 페이지에서는 리프레시 시도하지 않고 바로 에러 반환
      if (isLoginSuccessPage()) {
        return Promise.reject(new ApiError('Authentication failed on login success page', 401));
      }

      // Refresh 쿠키 없으면 바로 로그인 만료 처리
      if (!hasRefreshCookie()) {
        if (typeof window !== 'undefined') {
          toast.error('로그인이 만료되었습니다. 다시 로그인해주세요.');
          setTimeout(() => {
            window.location.href = '/login';
          }, 1000);
        }
        return Promise.reject(new ApiError('No refresh token', 401));
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
        const refreshResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/refresh`, {
          withCredentials: true,
          timeout: 5000,
        });

        if (refreshResponse.data?.content?.reissueSuccess) {
          processQueue(null, 'refreshed');
          return axiosInstance(originalRequest);
        } else {
          throw new Error('Token refresh failed');
        }
      } catch (refreshError: unknown) {
        console.error('Token refresh failed:', refreshError);
        processQueue(refreshError, null);

        if (typeof window !== 'undefined') {
          /*
              클라이언트에서 쿠키를 삭제해도 HttpOnly 쿠키는 제거되지 않음
              → 브라우저는 같은 이름의 새 쿠키를 생성해 두 개를 따로 저장함 (중복 쿠키 문제 발생)
          */
          // document.cookie =
          //   'Authorization=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict;';
          // document.cookie =
          //   'Refresh=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict;';

          toast.error('로그인이 만료되었습니다. 다시 로그인해주세요.');
          setTimeout(() => {
            window.location.href = '/login';
          }, 1000);
        }

        return Promise.reject(new ApiError('Authentication expired', 401));
      } finally {
        isRefreshing = false;
      }
    }

    // 일반 오류 처리
    const errorData = error.response?.data as { message?: string; content?: string } | undefined;
    const message = errorData?.message || errorData?.content || '요청 처리 중 오류가 발생했습니다.';
    return Promise.reject(new ApiError(message, statusCode));
  },
);

// nextAxiosInstance 응답 인터셉터 (변경 없음)
nextAxiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const statusCode = error.response?.status || 500;

    if (statusCode === 401) {
      if (typeof window !== 'undefined') {
        toast.error('인증이 만료되었습니다.');
        setTimeout(() => {
          window.location.href = '/login';
        }, 1000);
      }
      return Promise.reject(new ApiError('인증 오류', 401));
    }

    const errorData = error.response?.data as { message?: string; content?: string } | undefined;
    const message = errorData?.message || errorData?.content || '요청 처리 중 오류가 발생했습니다.';
    return Promise.reject(new ApiError(message, statusCode));
  },
);

// API 요청 함수들 (변경 없음)
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
