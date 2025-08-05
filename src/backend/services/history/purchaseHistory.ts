import { apiRequest } from '@/backend/client/axios';
import { PurchaseHistoryResponse } from '@/backend/types/history';

export const purchaseHistory = async (): Promise<PurchaseHistoryResponse[] | undefined> => {
  const response = await apiRequest.get<{
    content: {
      purchaseHistoriesRes: PurchaseHistoryResponse[];
    };
  }>('/trade-histories/purchase');
  return response.data.content.purchaseHistoriesRes;
};
