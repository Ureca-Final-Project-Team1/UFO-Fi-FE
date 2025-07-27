import { apiRequest } from '@/api/client/axios';
import { SetLogoutResponse } from '@/api/types';

export const logoutAPI = {
  async setLogout(): Promise<SetLogoutResponse> {
    const response = await apiRequest.get<SetLogoutResponse>('/v1/logout');
    return response.data;
  },
};
