import React from 'react';

import { cn } from '@/lib/utils';
import { Icon } from '@/shared';

import { NotificationHeaderProps } from './NotificationDropdown.types';
import {
  notificationHeaderVariants,
  notificationHeaderTitleVariants,
  notificationHeaderBadgeVariants,
  notificationHeaderMarkAllReadVariants,
} from './NotificationDropdownVariants';

export const NotificationHeader: React.FC<NotificationHeaderProps> = ({
  unreadCount,
  onMarkAllRead,
  className,
  variant = 'default',
  size = 'md',
  titleSize = 'md',
  titleVariant = 'default',
  badgeVariant = 'default',
  markAllReadVariant = 'default',
  showBadge = true,
  showMarkAllRead = true,
  customTitle = '알림',
  customIcon,
}) => {
  return (
    <div className={cn(notificationHeaderVariants({ variant, size }), className)}>
      <div className="flex items-center justify-between">
        <h3
          className={cn(
            notificationHeaderTitleVariants({ size: titleSize, variant: titleVariant }),
          )}
        >
          {customIcon || <Icon name="Bell" className="size-4" />}
          {customTitle}
          {showBadge && unreadCount > 0 && (
            <span className={cn(notificationHeaderBadgeVariants({ variant: badgeVariant }))}>
              {unreadCount}
            </span>
          )}
        </h3>
        {showMarkAllRead && unreadCount > 0 && (
          <button
            onClick={onMarkAllRead}
            className={cn(notificationHeaderMarkAllReadVariants({ variant: markAllReadVariant }))}
          >
            모두 읽음
          </button>
        )}
      </div>
    </div>
  );
};
