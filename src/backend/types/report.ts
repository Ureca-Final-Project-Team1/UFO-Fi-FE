import { SuccessApiResponse, PaginationResponse } from './api';

// 정지된 사용자 조회
export interface ReportedUser {
  userid: number;
  nickname: string;
  name: string;
  email: string;
}

// 페이지네이션이 적용된 사용자 응답
export interface ReportedUsersPageResponse {
  reportedUsersReadRes: PaginationResponse<ReportedUser>;
}

export interface ReportedUsersArrayResponse {
  reportedUsersReadRes: ReportedUser[];
}

export type GetReportedUsersResponse =
  | SuccessApiResponse<ReportedUsersPageResponse>
  | SuccessApiResponse<ReportedUsersArrayResponse>;

// 신고된 게시물 조회
export interface ReportedPost {
  postId: number;
  userId: number;
  reportCount: number;
  tradePostStatus: 'SELLING' | 'SOLD_OUT' | 'REPORTED' | 'EXPIRED' | 'DELETED';
  createdAt: string;
  reportContents: string[];
}
export type GetReportedPostsResponse = SuccessApiResponse<{
  rollBackReportsReadRes: ReportedPost[];
}>;

// 게시물 신고 해지 요청
export interface RollBackReportRequest {
  tradePostId: number;
}
export type RollBackReportResponse = SuccessApiResponse<Record<string, never>>;

// 사용자 비활성화 해제 요청
export interface GrantUserRequest {
  userId: number;
}
export type GrantUserResponse = SuccessApiResponse<Record<string, never>>;

// 게시물 신고 요청
export interface ReportPostsRequest {
  content: string;
  reportedUserId: number;
  tradePostId: number;
}
export type ReportPostsResponse = SuccessApiResponse<Record<string, never>>;
