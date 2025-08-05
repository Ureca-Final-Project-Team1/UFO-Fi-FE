import { apiRequest } from '@/backend/client/axios';
import { SellHistoryResponse } from '@/backend/types/history';

export const sellHistory = async (): Promise<SellHistoryResponse[] | undefined> => {
  const response = await apiRequest.get<{
    content: {
      saleHistoriesRes: SellHistoryResponse[];
    };
  }>('/trade-histories/sale');
  return response.data.content.saleHistoriesRes;
};
