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
import { API_ENDPOINTS } from '@/constants';

export const reportAPI = {
  // 정지된 사용자 목록 조회 (페이지네이션)
  async getReportedUsers(params?: {
    page?: number;
    size?: number;
  }): Promise<GetReportedUsersResponse> {
    const response = await apiRequest.get<GetReportedUsersResponse>(
      API_ENDPOINTS.USER.REPORTED_USERS,
      {
        params: {
          page: params?.page || 0,
          size: params?.size || 10,
        },
      },
    );
    return response.data;
  },

  // 신고된 게시물 목록 조회
  getReportedPosts: async (): Promise<GetReportedPostsResponse> => {
    const res = await apiRequest.get<GetReportedPostsResponse>(API_ENDPOINTS.REPORT.REPORT_CHECK);
    return res.data;
  },

  // 신고 해지
  rollBackReport: async (payload: RollBackReportRequest): Promise<RollBackReportResponse> => {
    const res = await apiRequest.put<RollBackReportResponse>(
      API_ENDPOINTS.REPORT.ROLL_BACK,
      payload,
    );
    return res.data;
  },

  // 사용자 비활성화 해제
  grantUser: async (payload: GrantUserRequest): Promise<GrantUserResponse> => {
    const res = await apiRequest.put<GrantUserResponse>(API_ENDPOINTS.USER.ROLE, payload);
    return res.data;
  },

  // 게시물 신고
  reportPosts: async (payload: ReportPostsRequest): Promise<ReportPostsResponse> => {
    const { tradePostId, ...body } = payload;
    const res = await apiRequest.post<ReportPostsResponse>(
      API_ENDPOINTS.REPORT.REPORT_POST(tradePostId),
      body,
    );
    return res.data;
  },
};
