// 기본 API 응답 베이스 타입
export interface BaseApiResponse {
  statusCode: number;
  message: string;
}

// 성공 응답 타입
export interface SuccessApiResponse<T = unknown> extends BaseApiResponse {
  statusCode: 200 | 201 | 204;
  data: T;
}

// 에러 응답 타입
export interface ErrorApiResponse extends BaseApiResponse {
  statusCode: 400 | 401 | 403 | 404 | 409 | 422 | 500;
}

// 전체 API 응답 타입 (Union)
export type ApiResponse<T = unknown> = SuccessApiResponse<T> | ErrorApiResponse;

// 페이지네이션 기본 타입
export interface PaginationRequest {
  page?: number;
  size?: number;
  sort?: string;
}

export interface PaginationResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

// HTTP 상태 코드 enum
export enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,
  INTERNAL_SERVER_ERROR = 500,
}

// 타입 가드 함수들
export const isSuccessResponse = <T>(
  response: ApiResponse<T>,
): response is SuccessApiResponse<T> => {
  return response.statusCode >= 200 && response.statusCode < 300;
};

export const isErrorResponse = (response: ApiResponse): response is ErrorApiResponse => {
  return response.statusCode >= 400;
};
