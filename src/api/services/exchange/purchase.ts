import { PurchaseRequest, PurchaseResponse } from '@/api';
import { apiRequest } from '@/api/client/axios';

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
