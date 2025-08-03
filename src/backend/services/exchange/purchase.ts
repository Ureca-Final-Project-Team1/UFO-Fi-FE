import { apiRequest } from '@/backend/client/axios';
import { PurchaseRequest, PurchaseResponse } from '@/backend/types/exchange';

export const purchaseAPI = {
  async purchase(data: PurchaseRequest): Promise<PurchaseResponse> {
    const response = await apiRequest.post<PurchaseResponse>('/v1/posts/purchase', {
      postId: data.postId,
      sellerId: data.sellerId,
      totalZet: data.totalZet,
      sellMobileDataAmountGB: data.sellMobileDataAmountGB,
    });
    return response.data;
  },
};
