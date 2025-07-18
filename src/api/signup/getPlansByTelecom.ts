import { Plan } from '@/shared/types/plan';

import axiosInstance from '../axios';
import { PlansResponse } from './types/SignupWithPlanTypes';

export const getPlanByTelecom = async (carrier: string): Promise<Plan[]> => {
  try {
    const response = await axiosInstance.get<PlansResponse>('/v1/plans', {
      params: { carrier },
    });

    return response.data?.content?.plansReadRes || [];
  } catch (error) {
    console.error('요금제 조회에 실패했습니다.:', error);
    return [];
  }
};
