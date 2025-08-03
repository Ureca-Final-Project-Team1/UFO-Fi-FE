import type {
  GetNotificationsResponse,
  MarkNotificationReadRequest,
  MarkAllNotificationsReadRequest,
  NotificationReadResponse,
} from '@/api';
import { apiRequest } from '@/api/client/axios';

export const notificationsAPI = {
  // 알림 목록 조회
  async getNotifications(): Promise<GetNotificationsResponse> {
    const response = await apiRequest.get<GetNotificationsResponse>('/v1/notifications');
    return response.data;
  },

  // 단일 알림 읽음 처리
  async markAsRead(data: MarkNotificationReadRequest): Promise<NotificationReadResponse> {
    const response = await apiRequest.patch<NotificationReadResponse>(
      `/v1/notifications/${data.notificationId}/read`,
    );
    return response.data;
  },

  // 모든 알림 읽음 처리
  async markAllAsRead(data?: MarkAllNotificationsReadRequest): Promise<NotificationReadResponse> {
    const response = await apiRequest.patch<NotificationReadResponse>(
      '/v1/notifications/read-all',
      data,
    );
    return response.data;
  },

  // 읽지 않은 알림 개수 조회
  async getUnreadCount(): Promise<{ unreadCount: number }> {
    const response = await apiRequest.get<{ content: { unreadCount: number } }>(
      '/v1/notifications/unread-count',
    );
    return response.data.content;
  },
};
