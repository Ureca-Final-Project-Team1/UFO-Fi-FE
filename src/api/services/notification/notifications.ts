import { apiRequest } from '@/api/client/axios';
import type { GetNotificationsResponse } from '@/api/types/notification';

export const notificationsAPI = {
  // 알림 목록 조회
  async getNotifications(): Promise<GetNotificationsResponse> {
    const response = await apiRequest.get<GetNotificationsResponse>('/v1/notifications');
    return response.data;
  },
};
