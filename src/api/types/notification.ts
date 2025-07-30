import { NotificationType } from '@/shared';

export interface NotificationSettings {
  benefit: boolean;
  sell: boolean;
  interestedPost: boolean;
  reported: boolean;
  followerPost: boolean;
  tradeAll: boolean;
}

export interface UpdateNotificationSettingRequest {
  type: NotificationType;
  enable: boolean;
}

export interface NotificationItem {
  type: NotificationType;
  title: string;
  content: string;
  url?: string;
  notifiedAt: string;
}

export interface GetNotificationsResponse {
  statusCode: number;
  message: string;
  content: {
    notifications: NotificationItem[];
  };
}

export const NOTIFICATION_CONFIG = {
  BENEFIT: {
    label: '혜택',
    icon: 'Gift',
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  SELL: {
    label: '판매',
    icon: 'CirclePlus',
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  INTERESTED_POST: {
    label: '관심 게시물',
    icon: 'Heart',
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  REPORTED: {
    label: '신고 처리',
    icon: 'Shield',
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  FOLLOWER_POST: {
    label: '팔로워 게시물',
    icon: 'Users',
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  TRADE: {
    label: '거래',
    icon: 'RadioTower',
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
} as const;
