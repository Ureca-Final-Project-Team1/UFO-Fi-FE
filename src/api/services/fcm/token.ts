import { apiRequest } from '@/api/client/axios';
import type { FCMTokenRequest, FCMTokenResponse, NotificationFilterRequest } from '@/api/types/fcm';

export const fcmAPI = {
  async saveToken(data: FCMTokenRequest): Promise<FCMTokenResponse> {
    const response = await apiRequest.post<{
      statusCode: number;
      message: string;
      content: { id: number };
    }>('/v1/fcm/token', data);
    return response.data as FCMTokenResponse;
  },

  async setInterestedPostFilter(data: NotificationFilterRequest): Promise<void> {
    await apiRequest.post('/v1/notification-filters/interested-post', data);
  },
};
