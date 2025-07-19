import { sellHistoryResponse } from './history.types';
import axiosInstance from '../client/axios';

export const sellHistoryAPI = async (): Promise<sellHistoryResponse[] | undefined> => {
  try {
    const response = await axiosInstance.get('/v1/mypage/sale-histories');
    return response.data.content.saleHistoriesRes;
  } catch (error) {
    throw error;
  }
};
