import { apiRequest } from '@/backend/client/axios';
import type { Plan } from '@/backend/types/plan';
import { API_ENDPOINTS } from '@/constants';

export const plansAPI = {
  async getByCarrier(carrier: string): Promise<Plan[]> {
    const response = await apiRequest.get<{ content: { plansReadRes: Plan[] } }>(
      API_ENDPOINTS.PLANS,
      {
        params: { carrier },
      },
    );
    return response.data.content.plansReadRes || [];
  },
};
