import { apiRequest } from '@/backend/client/axios';
import { getUserInfoResponse } from '@/backend/types/userInfo';
import { API_ENDPOINTS } from '@/constants';

export const getUserInfoAPI = {
  async getInfo(): Promise<getUserInfoResponse> {
    const response = await apiRequest.get<getUserInfoResponse>(API_ENDPOINTS.USER.PROFILE);
    return response.data;
  },
};
