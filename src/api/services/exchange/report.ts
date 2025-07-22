import { apiRequest } from '@/api/client/axios';

interface ReportPostsRequest {
  content: string;
  postOwnerUserId: number;
  postId: number;
}

interface ReportPostsResponse {
  statusCode: number;
  message: string;
  content: {
    tradePostTitle: string;
    reportContent: string;
    reportCount: number;
  };
}

export const reportAPI = {
  async reportPosts({
    content,
    postOwnerUserId,
    postId,
  }: ReportPostsRequest): Promise<ReportPostsResponse> {
    const response = await apiRequest.post<ReportPostsResponse>(`/v1/reports/${postId}`, {
      content,
      postOwnerUserId,
    });
    console.log(response);
    return response.data;
  },
};
