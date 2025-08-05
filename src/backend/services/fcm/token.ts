import { apiRequest } from '@/backend/client/axios';
import type {
  FCMTokenRequest,
  FCMTokenResponse,
  NotificationFilterRequest,
} from '@/backend/types/fcm';
import { API_ENDPOINTS } from '@/constants';

export const fcmAPI = {
  async saveToken(data: FCMTokenRequest): Promise<FCMTokenResponse> {
    const response = await apiRequest.post<FCMTokenResponse>(API_ENDPOINTS.FCM.FCM_TOKEN, data);
    return response.data;
  },

  async setInterestedPostFilter(data: NotificationFilterRequest): Promise<void> {
    await apiRequest.patch(API_ENDPOINTS.INTERESTED_POST.NOTIFICATION_FILTER, data);
  },
};
