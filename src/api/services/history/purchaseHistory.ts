import axiosInstance from '@/api/client/axios';
import { PurchaseHistoryResponse } from '@/api/types/history';

export const purchaseHistory = async (): Promise<PurchaseHistoryResponse[] | undefined> => {
  try {
    const response = await axiosInstance.get('/v1/mypage/purchase-histories');
    return response.data.content.purchaseHistoriesRes;
  } catch (error) {
    throw error;
  }
};
