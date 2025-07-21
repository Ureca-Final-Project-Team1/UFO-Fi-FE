import { apiRequest } from '@/api/client/axios';
import type { GetExchangePostsRequest, GetExchangePostsResponse } from '@/api/types/exchange';

export const exchangeAPI = {
  async getPosts(params?: GetExchangePostsRequest): Promise<GetExchangePostsResponse> {
    const response = await apiRequest.get<{ content: GetExchangePostsResponse }>('/v1/posts', {
      params,
    });
    return response.data.content;
  },
};
