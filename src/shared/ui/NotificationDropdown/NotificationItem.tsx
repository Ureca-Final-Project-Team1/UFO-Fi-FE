import React from 'react';

import { Icon } from '@/shared';

interface NotificationItem {
  type: 'BENEFIT' | 'SELL' | 'INTERESTED_POST' | 'REPORTED' | 'FOLLOWER_POST' | 'TRADE';
  title: string;
  content: string;
  url?: string;
  notifiedAt: string;
}

interface NotificationItemProps {
  notification: NotificationItem;
  onClick: () => void;
}

// 시간 포맷팅 함수
const formatNotificationTime = (dateString: string): string => {
  const now = new Date();
  const notifiedAt = new Date(dateString);
  const diffInMinutes = Math.floor((now.getTime() - notifiedAt.getTime()) / (1000 * 60));

  if (diffInMinutes < 1) return '방금 전';
  if (diffInMinutes < 60) return `${diffInMinutes}분 전`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}시간 전`;

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays}일 전`;

  return notifiedAt.toLocaleDateString('ko-KR');
};

const notificationConfig = {
  BENEFIT: {
    icon: 'Gift',
  },
  SELL: {
    icon: 'CirclePlus',
  },
  INTERESTED_POST: {
    icon: 'Heart',
  },
  REPORTED: {
    icon: 'Shield',
  },
  FOLLOWER_POST: {
    icon: 'Users',
  },
  TRADE: {
    icon: 'RadioTower',
  },
} as const;

export const NotificationItem: React.FC<NotificationItemProps> = ({ notification, onClick }) => {
  const config = notificationConfig[notification.type];

  return (
    <div
      className="flex items-start gap-3 p-4 w-full cursor-pointer hover:bg-gray-50 transition-colors border-l-4 border-transparent hover:border-blue-200"
      onClick={onClick}
    >
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
        <Icon name={config.icon} className="w-5 h-5" color="blue-400" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between mb-1">
          <h4 className="text-sm font-semibold text-gray-900 leading-5">{notification.title}</h4>
          <span className="text-xs text-gray-500 ml-3 flex-shrink-0 mt-0.5">
            {formatNotificationTime(notification.notifiedAt)}
          </span>
        </div>

        <p className="text-sm text-gray-600 leading-5 line-clamp-2">{notification.content}</p>
      </div>
    </div>
  );
};
