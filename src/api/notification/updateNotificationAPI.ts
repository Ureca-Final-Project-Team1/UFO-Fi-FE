import axiosInstance from '../axios';
import { updateNotificationRequest, updateNotificationResponse } from './notification.types';

export const updateNotificationAPI = async ({
  type,
  enable,
  userId,
}: updateNotificationRequest): Promise<updateNotificationResponse | undefined> => {
  try {
    const response = await axiosInstance.patch('/v1/mypage/notification-settings', null, {
      params: { type, enable, userId },
    });
    return response.data;
  } catch (error) {
    console.error('알림 설정 변경 실패:', error);
  }
};
