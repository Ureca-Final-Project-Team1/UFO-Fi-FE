import { apiRequest, type StatisticsResponse, type ReportsStatisticsResponse } from '@/api';

export const statisticsService = {
  // 기본 통계 데이터 api 호출
  getStatistics: async (): Promise<StatisticsResponse> => {
    const response = await apiRequest.get<StatisticsResponse>('/v1/statistics');
    return response.data;
  },

  // 비활성화 통계 데이터 api 호출
  getReportsStatistics: async (): Promise<ReportsStatisticsResponse> => {
    const response = await apiRequest.get<ReportsStatisticsResponse>('/v1/statistics/reports');
    return response.data;
  },
};
