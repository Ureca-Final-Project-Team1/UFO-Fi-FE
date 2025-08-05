import { apiRequest } from '@/backend/client/axios';
import type {
  FCMTokenRequest,
  FCMTokenResponse,
  NotificationFilterRequest,
} from '@/backend/types/fcm';

export const fcmAPI = {
  async saveToken(data: FCMTokenRequest): Promise<FCMTokenResponse> {
    const response = await apiRequest.post<FCMTokenResponse>('/fcm/token', data);
    return response.data;
  },

  async setInterestedPostFilter(data: NotificationFilterRequest): Promise<void> {
    await apiRequest.patch('/notification-filters/interested-post', data);
  },
};
