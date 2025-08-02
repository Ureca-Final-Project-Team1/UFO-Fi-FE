import React from 'react';

import { DotBadge, Icon } from '@/shared';
import { formatTimeAgo } from '@/utils/formatTimeAgo';

import { NotificationType } from './NotificationDropdown.types';

interface NotificationItem {
  id?: string;
  type: NotificationType;
  title: string;
  content: string;
  url?: string;
  notifiedAt: string;
  isRead?: boolean;
}

interface NotificationItemProps {
  notification: NotificationItem;
  onClick: () => void;
}

const notificationConfig = {
  BENEFIT: {
    icon: 'Gift',
    bgColor: 'var(--color-primary-100)',
    iconColor: 'var(--color-primary-300)',
  },
  SELL: {
    icon: 'CirclePlus',
    bgColor: 'var(--color-primary-100)',
    iconColor: 'var(--color-primary-300)',
  },
  INTERESTED_POST: {
    icon: 'Heart',
    bgColor: 'var(--color-primary-100)',
    iconColor: 'var(--color-primary-300)',
  },
  REPORTED: {
    icon: 'Shield',
    bgColor: 'var(--color-danger-100)',
    iconColor: 'var(--color-danger-600)',
  },
  FOLLOWER_POST: {
    icon: 'Users',
    bgColor: 'var(--color-info-100)',
    iconColor: 'var(--color-info-600)',
  },
  TRADE: {
    icon: 'RadioTower',
    bgColor: 'var(--color-info-100)',
    iconColor: 'var(--color-info-600)',
  },
} as const;

export const NotificationItem: React.FC<NotificationItemProps> = ({ notification, onClick }) => {
  const config = notificationConfig[notification.type];
  const isUnread = !notification.isRead;

  return (
    <div
      className={`flex items-start gap-3 p-4 w-full cursor-pointer transition-colors border-l-4 ${
        isUnread
          ? 'bg-blue-50/50 border-blue-200 hover:bg-blue-50'
          : 'border-transparent hover:bg-gray-50'
      }`}
      onClick={onClick}
    >
      {/* 아이콘 */}
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center relative">
        <Icon name={config.icon} className="w-5 h-5" color="blue-400" />

        {/* 읽지 않은 알림 표시 닷배지 */}
        {isUnread && (
          <div className="absolute -top-1 -right-1">
            <DotBadge color="red" size="sm" />
          </div>
        )}
      </div>

      {/* 콘텐츠 */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between mb-1">
          <h4
            className={`text-sm leading-5 ${
              isUnread ? 'font-bold text-gray-900' : 'font-semibold text-gray-700'
            }`}
          >
            {notification.title}
            {isUnread && (
              <span className="inline-block ml-1 w-2 h-2 bg-blue-500 rounded-full"></span>
            )}
          </h4>
          <span className="text-xs text-gray-500 ml-3 flex-shrink-0 mt-0.5">
            {formatTimeAgo(notification.notifiedAt)}
          </span>
        </div>

        <p
          className={`text-sm leading-5 line-clamp-2 ${
            isUnread ? 'text-gray-800' : 'text-gray-600'
          }`}
        >
          {notification.content}
        </p>

        {/* 읽지 않은 상태 텍스트 표시 */}
        {isUnread && (
          <div className="mt-2">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              새 알림
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
