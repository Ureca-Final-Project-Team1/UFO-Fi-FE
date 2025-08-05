import { apiRequest } from '@/backend/client/axios';
import { SuccessApiResponse } from '@/backend/types/api';

export interface PurchaseDetail {
  postId: number;
  purchaseHistoryId: number;
  createdAt: string;
  carrier: string;
  title: string;
  totalZet: number;
  mobileDataType: string;
  totalGB: number;
}

export const purchaseDetailService = {
  /**
   * 구매 내역 상세 조회
   * @param purchaseHistoryId 구매 내역 ID
   * @returns 구매 내역 상세 정보
   */
  getPurchaseDetail: async (tradeHistoryId: string): Promise<PurchaseDetail> => {
    const response = await apiRequest.get<SuccessApiResponse<PurchaseDetail>>(
      `/trade-histories/${tradeHistoryId}`,
    );

    if (response.data.statusCode === 200) {
      return response.data.content;
    }

    throw new Error(response.data.message || '구매 상세내역을 불러오는데 실패했습니다.');
  },
};
