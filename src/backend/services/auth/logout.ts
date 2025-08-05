import { apiRequest } from '@/backend/client/axios';
import { SetLogoutResponse } from '@/backend/types';

export const logoutAPI = {
  async setLogout(): Promise<SetLogoutResponse> {
    const response = await apiRequest.post<SetLogoutResponse>('/logout');
    return response.data;
  },
};
