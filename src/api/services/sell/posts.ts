import { apiRequest } from '@/api/client/axios';
import type { SellDataRequest, SellDataResponse } from '@/api/types/sell';

export const sellAPI = {
  async createPost(
    data: SellDataRequest,
    userId: string = '2', // TODO: userId 더미데이터 변경 필요
  ): Promise<SellDataResponse> {
    const isDev = process.env.NODE_ENV === 'development';
    const url = isDev ? `/posts?userId=${userId}` : '/posts';

    const response = await apiRequest.post<{ content: SellDataResponse }>(url, data);
    return response.data.content;
  },
};
