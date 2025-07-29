import { apiRequest } from '@/api/client/axios';
import {
  GetBulkPurchaseRequest,
  GetBulkPurchaseResponse,
  PostBulkPurchaseResponse,
} from '@/features/bulk/types/bulkResult.types';

export const bulkPurchaseAPI = {
  async getBulkPurchaseResult(params: GetBulkPurchaseRequest): Promise<GetBulkPurchaseResponse> {
    const response = await apiRequest.get<GetBulkPurchaseResponse>('v1/posts/bulk-purchase', {
      params,
    });
    return response.data;
  },

  async postBulkPurchaseResult(postIds: number[]): Promise<PostBulkPurchaseResponse> {
    const response = await apiRequest.post<PostBulkPurchaseResponse>('v1/posts/bulk-purchase', {
      postIds,
    });
    return response.data;
  },
};
