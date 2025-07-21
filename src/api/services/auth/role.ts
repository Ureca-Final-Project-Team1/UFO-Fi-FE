import { apiRequest } from '@/api/client/axios';
import { getRoleResponse } from '@/api/types/role';

export const getRoleAPI = {
  async getRole(): Promise<getRoleResponse> {
    const response = await apiRequest.get<getRoleResponse>('/v1/signup/user-role');
    return response.data;
  },
};
