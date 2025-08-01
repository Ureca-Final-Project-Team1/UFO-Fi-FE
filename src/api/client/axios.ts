import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import { toast } from 'sonner';

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
  timeout: 30000, // 30초로 증가 (데이터베이스 쿼리 + OpenAI API 호출을 고려함)
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
          document.cookie =
            'Authorization=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict;';
          document.cookie =
            'Refresh=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict;';
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

    // 에러 메시지 파싱 개선
    const errorData = error.response?.data as
      | { message?: string; content?: string; error?: string }
      | undefined;
    console.error('[API 응답 에러]', errorData); // 디버깅용 콘솔

    const message =
      errorData?.message ||
      errorData?.content ||
      errorData?.error ||
      '요청 처리 중 오류가 발생했습니다.';

    return Promise.reject(new ApiError(message, statusCode, errorData));
  },
);

// nextAxiosInstance 응답 인터셉터 확장
nextAxiosInstance.interceptors.response.use(
  (response) => {
    console.log('[Next API 성공 응답]', {
      url: response.config?.url,
      status: response.status,
      dataType: typeof response.data,
      dataLength: Array.isArray(response.data) ? response.data.length : 'not array',
    });
    return response;
  },
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

    // 에러 응답 데이터 더 안전하게 처리
    const errorData = error.response?.data as
      | { message?: string; content?: string; error?: string }
      | string
      | undefined;

    console.error('[Next API 응답 에러] 상세 정보:', {
      url: error.config?.url,
      method: error.config?.method?.toUpperCase(),
      status: statusCode,
      statusText: error.response?.statusText,
      data: errorData,
      message: error.message,
      code: error.code,
      hasResponse: !!error.response,
      hasRequest: !!error.request && !error.response,
      isTimeout: error.code === 'ECONNABORTED' || error.message.includes('timeout'),
    });

    let message: string;

    // 타임아웃 에러 특별 처리
    if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
      message = '요청 시간이 초과되었습니다. 잠시 후 다시 시도해주세요.';
    } else if (typeof errorData === 'string') {
      message = errorData;
    } else if (errorData && typeof errorData === 'object') {
      message = errorData.message || errorData.content || errorData.error || error.message;
    } else {
      message = error.message || '요청 처리 중 오류가 발생했습니다.';
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
