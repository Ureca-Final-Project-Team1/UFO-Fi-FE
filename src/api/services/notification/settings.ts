import { apiRequest } from '@/api/client/axios';
import type {
  NotificationSettings,
  GetNotificationSettingsRequest,
  UpdateNotificationSettingRequest,
} from '@/api/types/notification';

export const notificationAPI = {
  async getSettings(
    params: GetNotificationSettingsRequest,
  ): Promise<NotificationSettings | undefined> {
    try {
      const response = await apiRequest.get<{ content: NotificationSettings }>(
        '/v1/mypage/notification-settings',
        { params },
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
