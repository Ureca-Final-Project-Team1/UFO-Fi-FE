import { apiRequest } from '@/api/client/axios';
import type { Plan } from '@/api/types/plan';

export const plansAPI = {
  async getByCarrier(carrier: string): Promise<Plan[]> {
    const response = await apiRequest.get<{ content: { plansReadRes: Plan[] } }>('/v1/plans', {
      params: { carrier },
    });
    return response.data.content.plansReadRes || [];
  },
};
