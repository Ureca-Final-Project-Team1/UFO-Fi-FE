import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios';

import { ApiResponse, SuccessApiResponse, ErrorApiResponse, HttpStatusCode } from '@/types/api';

const isSuccessResponse = <T>(response: ApiResponse<T>): response is SuccessApiResponse<T> => {
  return response.statusCode >= 200 && response.statusCode < 300;
};

// 토큰 관리 유틸리티
const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
};

const setAuthToken = (token: string): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('accessToken', token);
};

const removeAuthToken = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('accessToken');
  sessionStorage.removeItem('accessToken');
};

// 재시도 가능한 요청 설정 타입
interface RetryableRequest extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// 커스텀 에러 클래스
export class ApiError extends Error {
  public statusCode: number;
  public response?: ErrorApiResponse;

  constructor(message: string, statusCode: number, response?: ErrorApiResponse) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.response = response;
  }
}

// Axios 인스턴스 생성
const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080',
    timeout: 30000, // 30초
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  // 요청 인터셉터
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // 토큰이 있다면 Authorization 헤더에 추가
      const token = getAuthToken();
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error: AxiosError) => {
      console.error('Request Error:', error);
      return Promise.reject(error);
    },
  );

  // 응답 인터셉터
  instance.interceptors.response.use(
    (response: AxiosResponse<ApiResponse>) => {
      // 응답 데이터가 API 형식과 일치하는지 확인
      const apiResponse = response.data;
      if (
        typeof apiResponse === 'object' &&
        'statusCode' in apiResponse &&
        'message' in apiResponse
      ) {
        return response;
      }

      // API 응답 형식이 아닌 경우 래핑
      response.data = {
        statusCode: response.status as HttpStatusCode,
        message: 'OK',
        data: response.data,
      } as SuccessApiResponse<unknown>;

      return response;
    },
    async (error: AxiosError<ErrorApiResponse>) => {
      const originalRequest = error.config as RetryableRequest;
      // 401 Unauthorized (토큰 만료)
      if (
        error.response?.status === HttpStatusCode.UNAUTHORIZED &&
        originalRequest &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;

        try {
          // 리프레시 토큰으로 새 토큰 요청
          const refreshResponse =
            await instance.post<SuccessApiResponse<{ accessToken: string }>>('/auth/refresh');

          if (isSuccessResponse(refreshResponse.data)) {
            const newToken = refreshResponse.data.data.accessToken;

            if (newToken) {
              setAuthToken(newToken);
              // 원래 요청에 새 토큰으로 재시도
              if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
              }
              return instance(originalRequest);
            }
          }
        } catch {
          // 리프레시 실패 시 로그아웃 처리
          removeAuthToken();
          if (typeof window !== 'undefined') {
            window.location.href = '/login';
          }
        }
      }

      // 커스텀 에러 생성
      const apiError = new ApiError(
        error.response?.data?.message || error.message || '알 수 없는 오류가 발생했습니다.',
        error.response?.status || HttpStatusCode.INTERNAL_SERVER_ERROR,
        error.response?.data,
      );

      return Promise.reject(apiError);
    },
  );

  return instance;
};

// 싱글톤 패턴으로 인스턴스 생성
const axiosInstance = createAxiosInstance();

// API 호출 래퍼 함수들
export const apiRequest = {
  get: async <T = unknown>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<SuccessApiResponse<T>> => {
    const response = await axiosInstance.get<ApiResponse<T>>(url, config);
    if (isSuccessResponse(response.data)) {
      return response.data;
    }
    throw new ApiError(response.data.message, response.data.statusCode, response.data);
  },

  post: async <T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<SuccessApiResponse<T>> => {
    const response = await axiosInstance.post<ApiResponse<T>>(url, data, config);
    if (isSuccessResponse(response.data)) {
      return response.data;
    }
    throw new ApiError(response.data.message, response.data.statusCode, response.data);
  },

  put: async <T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<SuccessApiResponse<T>> => {
    const response = await axiosInstance.put<ApiResponse<T>>(url, data, config);
    if (isSuccessResponse(response.data)) {
      return response.data;
    }
    throw new ApiError(response.data.message, response.data.statusCode, response.data);
  },

  patch: async <T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<SuccessApiResponse<T>> => {
    const response = await axiosInstance.patch<ApiResponse<T>>(url, data, config);
    if (isSuccessResponse(response.data)) {
      return response.data;
    }
    throw new ApiError(response.data.message, response.data.statusCode, response.data);
  },

  delete: async <T = unknown>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<SuccessApiResponse<T>> => {
    const response = await axiosInstance.delete<ApiResponse<T>>(url, config);
    if (isSuccessResponse(response.data)) {
      return response.data;
    }
    throw new ApiError(response.data.message, response.data.statusCode, response.data);
  },
};

// 토큰 관리 함수들 내보내기
export { setAuthToken, removeAuthToken, getAuthToken };

export default axiosInstance;
