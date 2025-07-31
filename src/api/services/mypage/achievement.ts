import { nextApiRequest } from '@/api/client/axios';
import { ApiError } from '@/api/client/axios';
import { AchievementUpdateResponse, GetHonorificsResponse } from '@/types/Achievement';

export const achievementsAPI = {
  async updateAchievements(): Promise<AchievementUpdateResponse> {
    try {
      const response = await nextApiRequest.post<AchievementUpdateResponse>(
        '/api/achievements/update',
      );
      return response.data;
    } catch (error) {
      if (error instanceof ApiError) {
        console.error('업적 업데이트 ApiError:', {
          message: error.message,
          statusCode: error.statusCode,
        });

        throw new Error(
          `업적 업데이트 실패 (${error.statusCode}): ${error.message || '알 수 없는 오류'}`,
        );
      }

      console.error('알 수 없는 오류 발생:', error);
      throw new Error('업적 업데이트 중 알 수 없는 오류가 발생했습니다.');
    }
  },

  async getHonorifics(): Promise<GetHonorificsResponse> {
    try {
      const response = await nextApiRequest.get<GetHonorificsResponse>('/api/achievements/honor');
      return response.data;
    } catch (error) {
      if (error instanceof ApiError) {
        console.error('칭호 조회 ApiError:', {
          message: error.message,
          statusCode: error.statusCode,
        });

        throw new Error(
          `칭호 조회 실패 (${error.statusCode}): ${error.message || '알 수 없는 오류'}`,
        );
      }

      console.error('알 수 없는 오류 발생:', error);
      throw new Error('칭호 조회 중 알 수 없는 오류가 발생했습니다.');
    }
  },
};
