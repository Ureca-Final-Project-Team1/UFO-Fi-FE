import { apiRequest } from '@/backend/client/axios';
import { API_ENDPOINTS } from '@/constants';
import {
  GetBulkPurchaseRequest,
  GetBulkPurchaseResponse,
  PostBulkPurchaseResponse,
} from '@/features/bulk/types/bulkResult.types';

export const bulkPurchaseAPI = {
  async getBulkPurchaseResult(params: GetBulkPurchaseRequest): Promise<GetBulkPurchaseResponse> {
    const response = await apiRequest.get<GetBulkPurchaseResponse>(
      API_ENDPOINTS.TRADE_POST.BULK_PURCHASE_GET,
      {
        params,
      },
    );
    return response.data;
  },

  async postBulkPurchaseResult(postIds: number[]): Promise<PostBulkPurchaseResponse> {
    const response = await apiRequest.post<PostBulkPurchaseResponse>(
      API_ENDPOINTS.ORDER.BULK_PURCHASE_POST,
      {
        postIds,
      },
    );
    return response.data;
  },
};
