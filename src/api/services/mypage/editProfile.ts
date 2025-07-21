import { apiRequest } from '@/api/client/axios';

export const editProfileAPI = {
  // 닉네임 변경 (PATCH)
  async updateNickname(nickname: string): Promise<void> {
    await apiRequest.patch('/v1/mypage/nickname', { nickname });
  },

  // 요금제 변경 (POST)
  async updatePlan(planId: number, planName: string): Promise<void> {
    await apiRequest.put('/v1/mypage/plan', {
      planId,
      planName,
    });
  },
};
