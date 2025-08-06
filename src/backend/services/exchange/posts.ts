import { apiRequest } from '@/backend/client/axios';
import type { GetExchangePostsRequest, GetExchangePostsResponse } from '@/backend/types/exchange';
import { API_ENDPOINTS } from '@/constants';

export const exchangeAPI = {
  async getPosts(params?: GetExchangePostsRequest): Promise<GetExchangePostsResponse> {
    const response = await apiRequest.get<{ content: GetExchangePostsResponse }>(
      API_ENDPOINTS.TRADE_POST.LIST,
      {
        params,
      },
    );
    return response.data.content;
  },
};
