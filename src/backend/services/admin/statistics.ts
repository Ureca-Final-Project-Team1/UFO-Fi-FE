import { apiRequest } from '@/backend/client/axios';
import type { StatisticsResponse, ReportsStatisticsResponse } from '@/backend/types';

export const statisticsService = {
  // 기본 통계 데이터 api 호출
  getStatistics: async (): Promise<StatisticsResponse> => {
    const response = await apiRequest.get<StatisticsResponse>('/admin/statistics');
    return response.data;
  },

  // 비활성화 통계 데이터 api 호출
  getReportsStatistics: async (): Promise<ReportsStatisticsResponse> => {
    const response = await apiRequest.get<ReportsStatisticsResponse>('/admin/statistics/reports');
    return response.data;
  },
};
