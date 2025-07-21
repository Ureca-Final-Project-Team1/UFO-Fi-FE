import { apiRequest } from '@/api/client/axios';
import { BulkPurchaseParams } from '@/api/types';
import { BulkResultData } from '@/features/bulk/types/bulkResult.types';

export const bulkPurchaseAPI = async (params: BulkPurchaseParams): Promise<BulkResultData> => {
  const response = await apiRequest.get<BulkResultData>('v1/posts/lump-sum-purchase', {
    params,
  });
  return response.data;
};
