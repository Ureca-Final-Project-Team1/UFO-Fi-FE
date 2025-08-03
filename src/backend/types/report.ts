import { SuccessApiResponse } from './api';

// 정지된 사용자 조회
export interface ReportedUser {
  userid: number;
  nickname: string;
  name: string;
  email: string;
}
export type GetReportedUsersResponse = SuccessApiResponse<{
  reportedUsersReadRes: ReportedUser[];
}>;

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
export type RollBackReportResponse = SuccessApiResponse<object>;

// 사용자 비활성화 해제 요청
export interface GrantUserRequest {
  userId: number;
}
export type GrantUserResponse = SuccessApiResponse<object>;

// 게시물 신고 요청
export interface ReportPostsRequest {
  content: string;
  reportedUserId: number;
  tradePostId: number;
}
export type ReportPostsResponse = SuccessApiResponse<object>;
