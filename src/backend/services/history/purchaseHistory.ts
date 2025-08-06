import { apiRequest } from '@/backend/client/axios';
import { PurchaseHistoryResponse } from '@/backend/types/history';
import { API_ENDPOINTS } from '@/constants';

export const purchaseHistory = async (): Promise<PurchaseHistoryResponse[] | undefined> => {
  const response = await apiRequest.get<{
    content: {
      purchaseHistoriesRes: PurchaseHistoryResponse[];
    };
  }>(API_ENDPOINTS.ORDER.PURCHASE_HISTORIES);
  return response.data.content.purchaseHistoriesRes;
};
