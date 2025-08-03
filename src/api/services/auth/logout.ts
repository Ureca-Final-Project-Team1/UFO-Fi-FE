import { apiRequest, SetLogoutResponse } from '@/api';

export const logoutAPI = {
  async setLogout(): Promise<SetLogoutResponse> {
    const response = await apiRequest.post<SetLogoutResponse>('/v1/logout');
    return response.data;
  },
};
