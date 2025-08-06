import { apiRequest } from '@/backend/client/axios';
import { UserPlanResponse } from '@/backend/types/userPlan';
import { API_ENDPOINTS } from '@/constants';

export const userPlanAPI = {
  async get(): Promise<UserPlanResponse['content']> {
    const response = await apiRequest.get<UserPlanResponse>(API_ENDPOINTS.USER_PLAN.GET_MY_PLAN);
    return response.data.content;
  },
};
