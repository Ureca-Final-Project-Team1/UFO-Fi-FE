import { apiRequest } from '@/api/client/axios';
import { PurchaseRequest, PurchaseResponse } from '@/api/types';

export const purchaseAPI = async ({
  postId,
  sellerId,
  totalZet,
  sellMobileDataAmountGB,
}: PurchaseRequest): Promise<PurchaseResponse> => {
  const response = await apiRequest.post<PurchaseResponse>('v1/posts/purchase', {
    postId,
    sellerId,
    totalZet,
    sellMobileDataAmountGB,
  });
  return response.data;
};
