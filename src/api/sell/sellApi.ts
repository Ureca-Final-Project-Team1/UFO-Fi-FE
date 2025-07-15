import axiosInstance from '@/api/axios';
import { SuccessApiResponse, HttpStatusCode } from '@/api/types/api';

import { SellDataRequest, SellDataResponse } from './sell.types';

export const sellApi = {
  createSellPost: async (
    data: SellDataRequest,
    userId: string = '2', // TODO: userId 더미데이터 변경 필요
  ): Promise<SuccessApiResponse<SellDataResponse>> => {
    const isDev = process.env.NODE_ENV === 'development';
    const url = isDev ? `/posts?userId=${userId}` : '/posts';
    const response = await axiosInstance.post(url, data);
    const id = response.data?.data?.id;

    return {
      statusCode: HttpStatusCode.OK,
      message: 'Success',
      data: { id },
    };
  },
};
