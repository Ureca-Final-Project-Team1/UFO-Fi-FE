import { purchaseHistoryResponse } from './history.types';
import axiosInstance from '../client/axios';

export const purchaseHistoryAPI = async (): Promise<purchaseHistoryResponse[] | undefined> => {
  try {
    const response = await axiosInstance.get('/v1/mypage/purchase-histories');
    return response.data.content.purchaseHistoriesRes;
  } catch (error) {
    throw error;
  }
};
