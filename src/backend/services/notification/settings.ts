import { apiRequest } from '@/backend/client/axios';
import type {
  NotificationSettings,
  UpdateNotificationSettingRequest,
} from '@/backend/types/notification';

export const notificationAPI = {
  async getSettings(): Promise<NotificationSettings | undefined> {
    const response = await apiRequest.get<{ content: NotificationSettings }>(
      '/notification-settings',
    );
    return response.data.content;
  },

  async updateSetting(params: UpdateNotificationSettingRequest): Promise<void> {
    await apiRequest.patch('/notification-settings', null, { params });
  },
};
