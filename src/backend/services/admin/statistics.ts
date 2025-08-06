import { apiRequest } from '@/backend/client/axios';
import type { StatisticsResponse, ReportsStatisticsResponse } from '@/backend/types';
import { API_ENDPOINTS } from '@/constants';

export const statisticsService = {
  // 기본 통계 데이터 api 호출
  getStatistics: async (): Promise<StatisticsResponse> => {
    const response = await apiRequest.get<StatisticsResponse>(API_ENDPOINTS.STATISTICS.BASIC);
    return response.data;
  },

  // 비활성화 통계 데이터 api 호출
  getReportsStatistics: async (): Promise<ReportsStatisticsResponse> => {
    const response = await apiRequest.get<ReportsStatisticsResponse>(
      API_ENDPOINTS.STATISTICS.REPORTS,
    );
    return response.data;
  },
};
