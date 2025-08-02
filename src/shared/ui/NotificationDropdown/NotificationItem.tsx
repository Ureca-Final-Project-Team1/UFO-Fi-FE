import React, { ComponentProps } from 'react';

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

type NotificationItemProps = ComponentProps<'div'> & {
  notification: NotificationItem;
  onClick?: () => void;
};

// 스타일 맵 객체들
const notificationConfig = {
  BENEFIT: {
    icon: 'Gift',
    bgColor: '#f8efff', // --color-primary-100
    iconColor: '#b284f7', // --color-primary-300
  },
  SELL: {
    icon: 'CirclePlus',
    bgColor: '#f8efff', // --color-primary-100
    iconColor: '#b284f7', // --color-primary-300
  },
  INTERESTED_POST: {
    icon: 'Heart',
    bgColor: '#f8efff', // --color-primary-100
    iconColor: '#b284f7', // --color-primary-300
  },
  REPORTED: {
    icon: 'Shield',
    bgColor: 'bg-red-100',
    iconColor: '#DC2626', // red-600
  },
  FOLLOWER_POST: {
    icon: 'Users',
    bgColor: 'bg-blue-100',
    iconColor: '#2563EB', // blue-600
  },
  TRADE: {
    icon: 'RadioTower',
    bgColor: 'bg-blue-100',
    iconColor: '#2563EB', // blue-600
  },
} as const;

const defaultValues = {
  onClick: () => {},
} as const;

const containerStyleMap = {
  base: 'flex items-start gap-3 p-4 w-full cursor-pointer transition-colors border-l-4',
  unread: 'bg-blue-50/50 border-blue-200 hover:bg-blue-50',
  read: 'border-transparent hover:bg-gray-50',
} as const;

const titleStyleMap = {
  base: 'text-sm leading-5',
  unread: 'font-bold text-gray-900',
  read: 'font-semibold text-gray-700',
} as const;

const contentStyleMap = {
  base: 'text-sm leading-5 line-clamp-2',
  unread: 'text-gray-800',
  read: 'text-gray-600',
} as const;

const badgeStyleMap = {
  container: 'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
  unread: 'bg-blue-100 text-blue-800',
} as const;

export const NotificationItem: React.FC<NotificationItemProps> = (props) => {
  const { notification, onClick = defaultValues.onClick, ...rest } = props;
  const config = notificationConfig[notification.type];
  const isUnread = !notification.isRead;

  return (
    <div
      className={`${containerStyleMap.base} ${
        isUnread ? containerStyleMap.unread : containerStyleMap.read
      }`}
      onClick={onClick}
      {...rest}
    >
      {/* 아이콘 */}
      <div className="flex-shrink-0 size-10 rounded-full bg-blue-50 flex items-center justify-center relative">
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
            className={`${titleStyleMap.base} ${
              isUnread ? titleStyleMap.unread : titleStyleMap.read
            }`}
          >
            {notification.title}
            {isUnread && (
              <span className="inline-block ml-1 size-2 bg-blue-500 rounded-full"></span>
            )}
          </h4>
          <span className="text-xs text-gray-500 ml-3 flex-shrink-0 mt-0.5">
            {formatTimeAgo(notification.notifiedAt)}
          </span>
        </div>

        <p
          className={`${contentStyleMap.base} ${
            isUnread ? contentStyleMap.unread : contentStyleMap.read
          }`}
        >
          {notification.content}
        </p>

        {/* 읽지 않은 상태 텍스트 표시 */}
        {isUnread && (
          <div className="mt-2">
            <span className={`${badgeStyleMap.container} ${badgeStyleMap.unread}`}>새 알림</span>
          </div>
        )}
      </div>
    </div>
  );
};
