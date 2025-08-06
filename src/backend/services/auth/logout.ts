import { apiRequest } from '@/backend/client/axios';
import { SetLogoutResponse } from '@/backend/types';
import { API_ENDPOINTS } from '@/constants';

export const logoutAPI = {
  async setLogout(): Promise<SetLogoutResponse> {
    const response = await apiRequest.post<SetLogoutResponse>(API_ENDPOINTS.LOGOUT);
    return response.data;
  },
};
