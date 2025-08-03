import type { NotificationSettings, UpdateNotificationSettingRequest } from '@/api';
import { apiRequest } from '@/api/client/axios';

export const notificationAPI = {
  async getSettings(): Promise<NotificationSettings | undefined> {
    const response = await apiRequest.get<{ content: NotificationSettings }>(
      '/v1/mypage/notification-settings',
    );
    return response.data.content;
  },

  async updateSetting(params: UpdateNotificationSettingRequest): Promise<void> {
    await apiRequest.patch('/v1/mypage/notification-settings', null, { params });
  },
};
