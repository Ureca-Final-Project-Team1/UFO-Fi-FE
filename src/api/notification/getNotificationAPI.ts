import axiosInstance from '../axios';
import { getNotificationRequest, getNotificationResponse } from './notification.types';

export const getNotificationAPI = async ({
  userId,
}: getNotificationRequest): Promise<getNotificationResponse | undefined> => {
  try {
    const response = await axiosInstance.get('/v1/mypage/notification-settings', {
      params: { userId },
    });
    return response.data.content;
  } catch (error) {
    console.error('알림 설정 변경 실패:', error);
  }
};
