import { apiRequest } from '@/api/client/axios';
import { BulkResultData } from '@/features/bulk/types/bulkResult.types';
interface BulkPurchaseParams {
  desiredGb: number;
  maxPrice: number;
}

export const bulkPurchaseAPI = async (params: BulkPurchaseParams): Promise<BulkResultData> => {
  const response = await apiRequest.get<BulkResultData>('v1/posts/lump-sum-purchase', {
    params,
  });
  return response.data;
};
