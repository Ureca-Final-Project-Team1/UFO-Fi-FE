import { apiRequest } from '@/api/client/axios';
import type { StatisticsResponse } from '@/api/types';

export const statisticsService = {
  // 기본 통계 데이터 api 호출
  getStatistics: async (): Promise<StatisticsResponse> => {
    const response = await apiRequest.get<StatisticsResponse>('/v1/statistics');
    return response.data;
  },
};
