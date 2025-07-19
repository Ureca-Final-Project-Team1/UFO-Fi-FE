import axiosInstance from '../axios';
import { purchaseHistoryRequest, purchaseHistoryResponse } from './history.types';

export const purchaseHistoryAPI = async ({
  // TODO: 인증 처리 후 제거할 것
  userId,
}: purchaseHistoryRequest): Promise<purchaseHistoryResponse[] | undefined> => {
  try {
    const response = await axiosInstance.get('/v1/mypage/purchase-histories', {
      params: { userId },
    });
    console.log(response);
    return response.data.content.purchaseHistoriesRes;
  } catch (error) {
    console.error('구매내역 호출 중 오류 발생:', error);
    return;
  }
};
