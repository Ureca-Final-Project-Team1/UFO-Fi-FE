import { SellHistoryResponse } from '@/api';
import { apiRequest } from '@/api/client/axios';

export const sellHistory = async (): Promise<SellHistoryResponse[] | undefined> => {
  const response = await apiRequest.get<{
    content: {
      saleHistoriesRes: SellHistoryResponse[];
    };
  }>('/v1/mypage/sale-histories');
  return response.data.content.saleHistoriesRes;
};
