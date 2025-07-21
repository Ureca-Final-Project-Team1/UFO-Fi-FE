import axiosInstance from '@/api/client/axios';
import { SellHistoryResponse } from '@/api/types/history';

export const sellHistory = async (): Promise<SellHistoryResponse[] | undefined> => {
  const response = await axiosInstance.get('/v1/mypage/sale-histories');
  return response.data.content.saleHistoriesRes;
};
