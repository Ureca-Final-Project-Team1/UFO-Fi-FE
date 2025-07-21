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

// 요청 인터셉터
axiosInstance.interceptors.request.use((config) => {
  // 로그인, 회원가입 등 인증이 필요없는 API는 제외
  const publicAPIs = ['/v1/auth/login', '/v1/auth/signup', '/v1/auth/refresh'];
  const isPublicAPI = publicAPIs.some((api) => config.url?.includes(api));

  if (!isPublicAPI) {
    const accessToken = sessionStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  }

  return config;
});

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

    // 401 에러 시 토큰 갱신 시도
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
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/auth/refresh`,
          {},
          {
            headers: {
              Refresh: refreshToken,
            },
            withCredentials: true,
          },
        );

        const newAccessToken = res.data.content?.accessToken;
        if (newAccessToken) {
          sessionStorage.setItem('accessToken', newAccessToken);

          // 새 토큰으로 헤더 업데이트
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          }

          processQueue(newAccessToken);
          return axiosInstance(originalRequest);
        }
      } catch (err) {
        // 토큰 갱신 실패 시 로그아웃 처리
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('refreshToken');
        toast.error('로그인이 만료되었습니다.');
        window.location.href = '/login';
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    const message =
      (error.response?.data as { message?: string })?.message ||
      '요청 처리 중 오류가 발생했습니다.';

    // 상태코드별 토스트 처리
    switch (statusCode) {
      case 401:
        if (!originalRequest._retry) {
          toast.error('인증이 필요합니다.');
          window.location.href = '/login';
        }
        break;
      case 403:
        toast.error('접근 권한이 없습니다.');
        break;
      case 404:
        toast.error('요청한 리소스를 찾을 수 없습니다.');
        break;
      case 422:
        toast.error('입력 데이터를 확인해주세요.');
        break;
      case 500:
        toast.error('서버 오류가 발생했습니다.');
        break;
      default:
        if (statusCode >= 400) {
          toast.error(message);
        }
    }

    // 커스텀 에러로 변환
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

export default axiosInstance;
