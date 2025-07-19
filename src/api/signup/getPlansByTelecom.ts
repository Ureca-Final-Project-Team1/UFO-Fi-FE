import { Plan } from '@/shared/types/plan';

import axiosInstance from '../axios';
import { PlansResponse } from './types/SignupWithPlanTypes';

export const getPlanByTelecom = async (carrier: string): Promise<Plan[]> => {
  try {
    const response = await axiosInstance.get<PlansResponse>('/v1/plans', {
      params: { carrier },
    });
    const plans = response.data?.content?.plansReadRes || [];
    return plans;
  } catch (error) {
    throw error;
  }
};
