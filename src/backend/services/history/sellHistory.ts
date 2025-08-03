import { apiRequest } from '@/backend/client/axios';
import { SellHistoryResponse } from '@/backend/types/history';

export const sellHistory = async (): Promise<SellHistoryResponse[] | undefined> => {
  const response = await apiRequest.get<{
    content: {
      saleHistoriesRes: SellHistoryResponse[];
    };
  }>('/v1/mypage/sale-histories');
  return response.data.content.saleHistoriesRes;
};
