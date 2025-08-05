import { apiRequest } from '@/backend/client/axios';
import { getUserInfoResponse } from '@/backend/types/userInfo';

export const getUserInfoAPI = {
  async getInfo(): Promise<getUserInfoResponse> {
    const response = await apiRequest.get<getUserInfoResponse>('/users/me/users-info');
    return response.data;
  },
};
