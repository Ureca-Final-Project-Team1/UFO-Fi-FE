import { apiRequest } from '@/backend/client/axios';
import { UserPlanResponse } from '@/backend/types/userPlan';

export const userPlanAPI = {
  async get(): Promise<UserPlanResponse['content']> {
    const response = await apiRequest.get<UserPlanResponse>('/v1/mypage/user-plan');
    return response.data.content;
  },
};
