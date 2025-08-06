import { apiRequest } from '@/backend/client/axios';
import type {
  NotificationSettings,
  UpdateNotificationSettingRequest,
} from '@/backend/types/notification';
import { API_ENDPOINTS } from '@/constants';

export const notificationAPI = {
  async getSettings(): Promise<NotificationSettings | undefined> {
    const response = await apiRequest.get<{ content: NotificationSettings }>(
      API_ENDPOINTS.NOTIFICATION_SETTING.SETTINGS_GET,
    );
    return response.data.content;
  },

  async updateSetting(params: UpdateNotificationSettingRequest): Promise<void> {
    await apiRequest.patch(API_ENDPOINTS.NOTIFICATION_SETTING.SETTINGS_UPDATE, null, { params });
  },
};
