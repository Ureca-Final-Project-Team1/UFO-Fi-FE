import React from 'react';

import { Icon } from '@/shared';
import { formatTimeAgo } from '@/utils/formatTimeAgo';

import { NotificationType } from './NotificationDropdown.types';

interface NotificationItem {
  type: NotificationType;
  title: string;
  content: string;
  url?: string;
  notifiedAt: string;
}

interface NotificationItemProps {
  notification: NotificationItem;
  onClick: () => void;
}

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
            {formatTimeAgo(notification.notifiedAt)}
          </span>
        </div>

        <p className="text-sm text-gray-600 leading-5 line-clamp-2">{notification.content}</p>
      </div>
    </div>
  );
};
