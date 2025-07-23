import { apiRequest } from '@/api/client/axios';
import type {
  NotificationSettings,
  UpdateNotificationSettingRequest,
} from '@/api/types/notification';

export const notificationAPI = {
  async getSettings(): Promise<NotificationSettings | undefined> {
    try {
      const response = await apiRequest.get<{ content: NotificationSettings }>(
        '/v1/mypage/notification-settings',
      );
      return response.data.content;
    } catch (error) {
      console.error('알림 설정 조회 실패:', error);
      return undefined;
    }
  },

  async updateSetting(params: UpdateNotificationSettingRequest): Promise<void> {
    try {
      await apiRequest.patch('/v1/mypage/notification-settings', null, { params });
    } catch (error) {
      console.error('알림 설정 변경 실패:', error);
      throw error;
    }
  },
};
