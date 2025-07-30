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
  baseURL: '', // 현재 origin 기준으로 /api 경로 접근
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터
axiosInstance.interceptors.request.use((config) => config);
nextAxiosInstance.interceptors.request.use((config) => config);

// 응답 인터셉터
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

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
    const statusCode = error.response?.status || 500;

    // 401 에러이고 아직 재시도하지 않은 경우
    if (statusCode === 401 && !originalRequest._retry) {
      // 이미 리프레시 중인 경우 큐에 추가
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            return axiosInstance(originalRequest);
          })
          .catch((err: unknown) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // GET 방식으로 /refresh 호출
        const refreshResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/refresh`, {
          withCredentials: true, // 쿠키 포함하여 요청
          timeout: 5000,
        });

        // 리프레시 성공 확인
        if (refreshResponse.data?.content?.reissueSuccess) {
          // 큐에 있던 요청들 재실행
          processQueue(null, 'refreshed');

          // 원래 요청 재실행
          return axiosInstance(originalRequest);
        } else {
          throw new Error('Token refresh failed');
        }
      } catch (refreshError: unknown) {
        // 큐에 있던 요청들에게 에러 전파
        processQueue(refreshError, null);

        // 쿠키 정리
        if (typeof window !== 'undefined') {
          // Authorization 쿠키 삭제
          document.cookie =
            'Authorization=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict;';
          document.cookie =
            'Refresh=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict;';

          toast.error('로그인이 만료되었습니다. 다시 로그인해주세요.');

          // 로그인 페이지로 리다이렉트
          setTimeout(() => {
            window.location.href = '/login';
          }, 1000);
        }

        return Promise.reject(new ApiError('Authentication expired', 401));
      } finally {
        isRefreshing = false;
      }
    }

    const errorData = error.response?.data as { message?: string; content?: string } | undefined;
    const message = errorData?.message || errorData?.content || '요청 처리 중 오류가 발생했습니다.';

    const apiError = new ApiError(message, statusCode);
    return Promise.reject(apiError);
  },
);

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

    const apiError = new ApiError(message, statusCode);
    return Promise.reject(apiError);
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
