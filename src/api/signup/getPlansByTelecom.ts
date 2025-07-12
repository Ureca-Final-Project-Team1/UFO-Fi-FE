import { Plan } from '@/shared/types/plan';

import axiosInstance from '../axios';

export const getPlanByTelecom = async (telecom: string): Promise<Plan[]> => {
  try {
    const response = await axiosInstance.get('/plans', {
      params: { carrier: telecom },
    });

    return response.data?.content?.plans;
  } catch (error) {
    console.error('요금제 조회에 실패했습니다.:', error);
    return [];
  }
};
