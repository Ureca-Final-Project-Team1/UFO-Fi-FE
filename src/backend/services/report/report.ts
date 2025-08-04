import { apiRequest } from '@/backend/client/axios';
import {
  GetReportedUsersResponse,
  GetReportedPostsResponse,
  RollBackReportRequest,
  RollBackReportResponse,
  GrantUserRequest,
  GrantUserResponse,
  ReportPostsResponse,
  ReportPostsRequest,
} from '@/backend/types/report';

export const reportAPI = {
  // 정지된 사용자 목록 조회 (페이지네이션)
  async getReportedUsers(params?: {
    page?: number;
    size?: number;
  }): Promise<GetReportedUsersResponse> {
    const response = await apiRequest.get<GetReportedUsersResponse>('/v1/users/reported', {
      params: {
        page: params?.page || 0,
        size: params?.size || 10,
      },
    });
    return response.data;
  },

  // 신고된 게시물 목록 조회
  getReportedPosts: async (): Promise<GetReportedPostsResponse> => {
    const res = await apiRequest.get<GetReportedPostsResponse>('/v1/admin/trade-posts/reported');
    return res.data;
  },

  // 신고 해지
  rollBackReport: async (payload: RollBackReportRequest): Promise<RollBackReportResponse> => {
    const res = await apiRequest.put<RollBackReportResponse>('/v1/admin/roll-back-report', payload);
    return res.data;
  },

  // 사용자 비활성화 해제
  grantUser: async (payload: GrantUserRequest): Promise<GrantUserResponse> => {
    const res = await apiRequest.put<GrantUserResponse>('/v1/user/grant-user', payload);
    return res.data;
  },

  // 게시물 신고
  reportPosts: async (payload: ReportPostsRequest): Promise<ReportPostsResponse> => {
    const { tradePostId, ...body } = payload;
    const res = await apiRequest.post<ReportPostsResponse>(
      `/v1/trade-posts/${tradePostId}/report`,
      body,
    );
    return res.data;
  },
};
