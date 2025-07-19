import axiosInstance from '../axios';
import { sellHistoryRequest, sellHistoryResponse } from './history.types';

export const sellHistoryAPI = async ({
  // TODO: 인증 처리 후 제거할 것
  userId,
}: sellHistoryRequest): Promise<sellHistoryResponse[] | undefined> => {
  try {
    const response = await axiosInstance.get('/v1/mypage/sale-histories', {
      params: { userId },
    });
    console.log(response);
    return response.data.content.saleHistoriesRes;
  } catch (error) {
    console.error('판매내역 호출 중 오류 발생:', error);
    return;
  }
};
