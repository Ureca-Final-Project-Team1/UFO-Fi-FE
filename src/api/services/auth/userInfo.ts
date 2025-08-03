import { apiRequest, getUserInfoResponse } from '@/api';

export const getUserInfoAPI = {
  async getInfo(): Promise<getUserInfoResponse> {
    const response = await apiRequest.get<getUserInfoResponse>('/v1/signup/user-info');
    return response.data;
  },
};
