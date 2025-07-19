export interface GetNotificationSettingsRequest {
  userId: number;
}

export interface NotificationSettings {
  benefit: boolean;
  sell: boolean;
  interestedPost: boolean;
  reported: boolean;
  followerPost: boolean;
  tradeAll: boolean;
}

export interface UpdateNotificationSettingRequest {
  userId: number;
  type: keyof NotificationSettings;
  enable: boolean;
}
