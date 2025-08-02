import React, { ComponentProps } from 'react';

import { DotBadge, Icon } from '@/shared';
import { formatTimeAgo } from '@/utils/formatTimeAgo';

import { NotificationType } from './NotificationDropdown.types';
import {
  notificationConfig,
  defaultValues,
  containerVariants,
  titleVariants,
  contentVariants,
  badgeVariants,
} from './NotificationItemVariants';

interface NotificationItem {
  id?: string;
  type: NotificationType;
  title: string;
  content: string;
  url?: string;
  notifiedAt: string;
  isRead?: boolean;
}

type NotificationItemProps = ComponentProps<'button'> & {
  notification: NotificationItem;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export const NotificationItem: React.FC<NotificationItemProps> = (props) => {
  const { notification, onClick = defaultValues.onClick, ...rest } = props;
  const config = notificationConfig[notification.type];
  const isUnread = !notification.isRead;

  return (
    <button
      type="button"
      className={containerVariants({ variant: isUnread ? 'unread' : 'read' })}
      onClick={onClick}
      aria-label={`${notification.title} - ${notification.content}`}
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
          <h4 className={titleVariants({ variant: isUnread ? 'unread' : 'read' })}>
            {notification.title}
            {isUnread && (
              <span className="inline-block ml-1 size-2 bg-blue-500 rounded-full"></span>
            )}
          </h4>
          <span className="text-xs text-gray-500 ml-3 flex-shrink-0 mt-0.5">
            {formatTimeAgo(notification.notifiedAt)}
          </span>
        </div>

        <p className={contentVariants({ variant: isUnread ? 'unread' : 'read' })}>
          {notification.content}
        </p>

        {/* 읽지 않은 상태 텍스트 표시 */}
        {isUnread && (
          <div className="mt-2">
            <span className={badgeVariants({ variant: 'unread' })}>새 알림</span>
          </div>
        )}
      </div>
    </button>
  );
};
