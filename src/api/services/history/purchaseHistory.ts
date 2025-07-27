import { apiRequest } from '@/api/client/axios';
import { PurchaseHistoryResponse } from '@/api/types/history';

export const purchaseHistory = async (): Promise<PurchaseHistoryResponse[] | undefined> => {
  const response = await apiRequest.get<{
    content: {
      purchaseHistoriesRes: PurchaseHistoryResponse[];
    };
  }>('/v1/mypage/purchase-histories');
  return response.data.content.purchaseHistoriesRes;
};
