import { apiRequest } from '@/backend/client/axios';
import { PurchaseRequest, PurchaseResponse } from '@/backend/types/exchange';
import { API_ENDPOINTS } from '@/constants';

export const purchaseAPI = {
  async purchase(data: PurchaseRequest): Promise<PurchaseResponse> {
    const response = await apiRequest.post<PurchaseResponse>(API_ENDPOINTS.ORDER.PURCHASE, {
      postId: data.postId,
      sellerId: data.sellerId,
      totalZet: data.totalZet,
      sellMobileDataAmountGB: data.sellMobileDataAmountGB,
    });
    return response.data;
  },
};
