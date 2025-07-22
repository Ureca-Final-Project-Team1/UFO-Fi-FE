export interface NotificationSettings {
  benefit: boolean;
  sell: boolean;
  interestedPost: boolean;
  reported: boolean;
  followerPost: boolean;
  tradeAll: boolean;
}

export interface UpdateNotificationSettingRequest {
  type: 'BENEFIT' | 'SELL' | 'INTERESTED_POST' | 'REPORTED' | 'FOLLOWER_POST' | 'TRADE';
  enable: boolean;
}
