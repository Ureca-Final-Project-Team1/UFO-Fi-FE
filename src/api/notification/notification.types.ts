export interface getNotificationRequest {
  userId: number;
}

export interface getNotificationResponse {
  benefit: boolean;
  sell: boolean;
  interestedPost: boolean;
  reported: boolean;
  followerPost: boolean;
  tradeAll: boolean;
}

export interface updateNotificationRequest {
  userId: number;
  type: string;
  enable: boolean;
}

export interface updateNotificationResponse {
  statusCode: number;
  message: string;
}
