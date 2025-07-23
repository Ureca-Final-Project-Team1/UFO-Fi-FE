import { apiRequest } from '@/api/client/axios';
import type { GetProfileResponse } from '@/api/types/profile';

export const profileAPI = {
  async getProfile(anotherUserId: number): Promise<GetProfileResponse> {
    const response = await apiRequest.get<GetProfileResponse>(`/v1/profile/${anotherUserId}`);
    return response.data;
  },
};
