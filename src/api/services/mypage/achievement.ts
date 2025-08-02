import { nextApiRequest } from '@/api/client/axios';
import { ApiError } from '@/api/client/axios';
import { Honorific, UpdateAchievement } from '@/types/Achievement';

export const achievementsAPI = {
  async updateAchievements(): Promise<UpdateAchievement> {
    const response = await nextApiRequest.post<{ content: UpdateAchievement }>(
      '/api/achievements/update',
    );
    return response.data.content;
  },

  async getHonorifics(): Promise<Honorific[]> {
    const response = await nextApiRequest.get<{ content: Honorific[] }>('/api/achievements/honor');
    return response.data.content;
  },

  async updateUserHonorific(honorificName: string): Promise<void> {
    try {
      await nextApiRequest.post('/api/achievements/honor/select', {
        name: honorificName,
      });
    } catch (error) {
      if (error instanceof ApiError) {
        console.error('칭호 변경 ApiError:', {
          message: error.message,
          statusCode: error.statusCode,
        });

        throw new Error(
          `칭호 변경 실패 (${error.statusCode}): ${error.message || '알 수 없는 오류'}`,
        );
      }

      console.error('알 수 없는 오류 발생:', error);
      throw new Error('칭호 변경 중 알 수 없는 오류가 발생했습니다.');
    }
  },
};
