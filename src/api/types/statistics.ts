// 통계 데이터 타입
export interface StatisticsData {
  allUsersCount: number;
  notReportedUsersCount: number;
  allTradePostsCount: number;
  allReportCount: number;
}

// 비활성화 통계 데이터 타입
export interface ReportsStatisticsData {
  allUsersCount: number;
  reportedUsersCount: number;
  pendingReportPostCount: number;
  confirmedReportPostCount: number;
}

// 통계 API 응답 타입
export interface StatisticsResponse {
  statusCode: number;
  message: string;
  content: StatisticsData;
}

// 비활성화 통계 API 응답 타입
export interface ReportsStatisticsResponse {
  statusCode: number;
  message: string;
  content: ReportsStatisticsData;
}
