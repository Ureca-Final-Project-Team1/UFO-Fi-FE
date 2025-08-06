import React from 'react';

import { cn } from '@/lib/utils';
import { DotBadge, Icon } from '@/shared';
import type { IconType } from '@/shared';
import { formatTimeAgo } from '@/shared/utils/formatTimeAgo';

import { NotificationType } from './NotificationDropdown.types';
import type { NotificationItemProps } from './NotificationDropdown.types';
import {
  notificationItemVariants,
  notificationItemIconVariants,
  notificationItemContentVariants,
  notificationItemTitleVariants,
  notificationItemDescriptionVariants,
  notificationItemTimeVariants,
  notificationItemUnreadBadgeVariants,
} from './NotificationDropdownVariants';

const notificationConfig: Record<
  NotificationType,
  {
    icon: IconType;
    bgColor: string;
    iconColor: string;
  }
> = {
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

export const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onClick,
  className,
  variant = 'default',
  size = 'md',
  layout = 'horizontal',
  unreadStyle = 'border',
  iconSize = 'md',
  iconVariant = 'default',
  contentLayout = 'horizontal',
  titleSize = 'md',
  descriptionSize = 'md',
  timeSize = 'md',
  timeVariant = 'default',
  unreadBadgeVariant = 'default',
}) => {
  const config = notificationConfig[notification.type];
  const isUnread = !notification.isRead;

  return (
    <div
      className={cn(
        notificationItemVariants({
          variant,
          size,
          layout,
          unreadStyle,
          isUnread,
        }),
        className,
      )}
      onClick={onClick}
    >
      {/* 아이콘 */}
      <div className={cn(notificationItemIconVariants({ size: iconSize, variant: iconVariant }))}>
        <Icon name={config.icon} className="size-5" color="blue-400" />

        {/* 읽지 않은 알림 표시 닷배지 */}
        {isUnread && unreadStyle === 'badge' && (
          <div className="absolute -top-1 -right-1">
            <DotBadge color="red" size="sm" />
          </div>
        )}
      </div>

      {/* 콘텐츠 */}
      <div className={cn(notificationItemContentVariants({ layout: contentLayout }))}>
        <div className="flex items-start justify-between mb-1">
          <h4 className={cn(notificationItemTitleVariants({ size: titleSize, unread: isUnread }))}>
            {notification.title}
            {isUnread && unreadStyle === 'text' && (
              <span className="inline-block ml-1 size-2 bg-blue-500 rounded-full"></span>
            )}
          </h4>
          <span
            className={cn(notificationItemTimeVariants({ size: timeSize, variant: timeVariant }))}
          >
            {formatTimeAgo(notification.notifiedAt)}
          </span>
        </div>

        <p
          className={cn(
            notificationItemDescriptionVariants({ size: descriptionSize, unread: isUnread }),
          )}
        >
          {notification.content}
        </p>

        {/* 읽지 않은 상태 텍스트 표시 */}
        {isUnread && (
          <div className="mt-2">
            <span
              className={cn(notificationItemUnreadBadgeVariants({ variant: unreadBadgeVariant }))}
            >
              새 알림
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
