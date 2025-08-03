import { apiRequest } from '@/backend/client/axios';
import { SellHistoryResponse } from '@/backend/types/history';
import { API_ENDPOINTS } from '@/constants';

export const sellHistory = async (): Promise<SellHistoryResponse[] | undefined> => {
  const response = await apiRequest.get<{
    content: {
      saleHistoriesRes: SellHistoryResponse[];
    };
  }>(API_ENDPOINTS.ORDER.SALE_HISTORIES);
  return response.data.content.saleHistoriesRes;
};
