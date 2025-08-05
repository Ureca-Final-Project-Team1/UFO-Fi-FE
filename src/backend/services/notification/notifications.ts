import { apiRequest } from '@/backend/client/axios';
import type {
  GetNotificationsResponse,
  MarkNotificationReadRequest,
  MarkAllNotificationsReadRequest,
  NotificationReadResponse,
} from '@/backend/types/notification';
import { API_ENDPOINTS } from '@/constants';

export const notificationsAPI = {
  // 알림 목록 조회
  async getNotifications(): Promise<GetNotificationsResponse> {
    const response = await apiRequest.get<GetNotificationsResponse>(API_ENDPOINTS.FCM.FCM_TOKEN);
    return response.data;
  },

  // 단일 알림 읽음 처리
  async markAsRead(data: MarkNotificationReadRequest): Promise<NotificationReadResponse> {
    const response = await apiRequest.patch<NotificationReadResponse>(
      `${API_ENDPOINTS.FCM.FCM_TOKEN}/${data.notificationId}/read`,
    );
    return response.data;
  },

  // 모든 알림 읽음 처리
  async markAllAsRead(data?: MarkAllNotificationsReadRequest): Promise<NotificationReadResponse> {
    const response = await apiRequest.patch<NotificationReadResponse>(
      API_ENDPOINTS.NOTIFICATION_SETTING.SETTINGS_UPDATE,
      data,
    );
    return response.data;
  },

  // 읽지 않은 알림 개수 조회
  async getUnreadCount(): Promise<{ unreadCount: number }> {
    const response = await apiRequest.get<{ content: { unreadCount: number } }>(
      API_ENDPOINTS.NOTIFICATION_SETTING.SETTINGS_GET,
    );
    return response.data.content;
  },
};
