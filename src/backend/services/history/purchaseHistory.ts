import { apiRequest } from '@/backend/client/axios';
import { PurchaseHistoryResponse } from '@/backend/types/history';

export const purchaseHistory = async (): Promise<PurchaseHistoryResponse[] | undefined> => {
  const response = await apiRequest.get<{
    content: {
      purchaseHistoriesRes: PurchaseHistoryResponse[];
    };
  }>('/v1/mypage/purchase-histories');
  return response.data.content.purchaseHistoriesRes;
};
