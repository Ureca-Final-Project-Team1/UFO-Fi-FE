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
let queue: ((token: string) => void)[] = [];

const processQueue = (token: string) => {
  queue.forEach((cb) => cb(token));
  queue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
    const statusCode = error.response?.status || 500;

    if (statusCode === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve) => {
          queue.push(() => resolve(axiosInstance(originalRequest)));
        });
      }

      isRefreshing = true;

      try {
        const refreshToken = sessionStorage.getItem('refreshToken');
        if (!refreshToken) throw new Error('RefreshToken 없음');

        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/refresh`,
          {},
          {
            headers: {
              Refresh: refreshToken,
            },
            withCredentials: true,
          },
        );

        const newAccessToken = res.data.accessToken;
        processQueue(newAccessToken);

        return axiosInstance(originalRequest);
      } catch (err) {
        toast.error('로그인이 만료되었습니다.');
        window.location.href = '/login';
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }
    const message =
      (error.response?.data as { message?: string })?.message ||
      (error.response?.data as { content?: string })?.content ||
      '요청 처리 중 오류가 발생했습니다.';

    const apiError = new ApiError(message, statusCode);
    return Promise.reject(apiError);
  },
);

nextAxiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
    const statusCode = error.response?.status || 500;

    if (statusCode === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      toast.error('인증이 만료되었습니다.');
      window.location.href = '/login';
      return Promise.reject(new ApiError('인증 오류', 401));
    }

    const message =
      (error.response?.data as { message?: string })?.message ||
      (error.response?.data as { content?: string })?.content ||
      '요청 처리 중 오류가 발생했습니다.';

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
