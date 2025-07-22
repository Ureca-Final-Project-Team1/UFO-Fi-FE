import { apiRequest } from '@/api/client/axios';

export interface ApiResponse {
  success: boolean;
  message?: string;
}

function parseError(error: unknown, defaultMsg: string): string {
  if (error && typeof error === 'object' && 'message' in error) {
    return (error as { message: string }).message;
  }
  return defaultMsg;
}

export const editProfileAPI = {
  // 닉네임 변경 (PATCH)
  async updateNickname(nickname: string): Promise<ApiResponse> {
    try {
      await apiRequest.patch('/v1/mypage/nickname', { nickname });
      return { success: true };
    } catch (error: unknown) {
      return { success: false, message: parseError(error, '닉네임 변경에 실패했습니다.') };
    }
  },

  // 요금제 변경 (PUT)
  async updatePlan(planId: number, planName: string): Promise<ApiResponse> {
    try {
      await apiRequest.put('/v1/mypage/plan', { planId, planName });
      return { success: true };
    } catch (error: unknown) {
      return { success: false, message: parseError(error, '요금제 변경에 실패했습니다.') };
    }
  },
};
