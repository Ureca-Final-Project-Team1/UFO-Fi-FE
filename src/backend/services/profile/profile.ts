import { apiRequest, nextApiRequest } from '@/backend/client/axios';
import type { GetProfileResponse, ProfileUser, UserStats } from '@/backend/types/profile';

export const profileAPI = {
  async getProfile(anotherUserId: number): Promise<GetProfileResponse> {
    if (!anotherUserId || anotherUserId <= 0 || !Number.isInteger(anotherUserId)) {
      throw new Error('유효하지 않은 사용자 ID입니다.');
    }

    const response = await apiRequest.get<GetProfileResponse>(`/v1/profile/${anotherUserId}`);
    return response.data;
  },

  async getProfileData(anotherUserId: number): Promise<ProfileUser> {
    const response = await this.getProfile(anotherUserId);
    return response.content;
  },

  async getUserStats(anotherUserId: number): Promise<{
    success: boolean;
    content: UserStats;
  }> {
    const response = await nextApiRequest.get<{
      success: boolean;
      content: UserStats;
    }>('/api/collections/user-stats', {
      params: { userId: anotherUserId },
    });
    return response.data;
  },
};
