import { apiRequest } from '@/backend/client/axios';
import { getUserInfoResponse } from '@/backend/types/userInfo';

export const getUserInfoAPI = {
  async getInfo(): Promise<getUserInfoResponse> {
    const response = await apiRequest.get<getUserInfoResponse>('/v1/signup/user-info');
    return response.data;
  },
};
