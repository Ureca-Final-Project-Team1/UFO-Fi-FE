import React from 'react';

import { cn } from '@/lib/utils';
import { DotBadge, Icon } from '@/shared';

import { NotificationTriggerProps } from './NotificationDropdown.types';
import {
  notificationTriggerVariants,
  notificationBadgeVariants,
} from './NotificationDropdownVariants';

export const NotificationTrigger: React.FC<NotificationTriggerProps> = ({
  unreadCount,
  onClick,
  className = '',
  variant = 'default',
  size = 'md',
  badgePosition = 'top-right',
  badgeVariant = 'dot',
  badgePositionVariant = 'top-right',
  showBadge = true,
  customIcon,
}) => {
  return (
    <button
      className={cn(notificationTriggerVariants({ variant, size, badgePosition }), className)}
      onClick={onClick}
      aria-label={`알림 ${unreadCount > 0 ? `(${unreadCount}개의 새 알림)` : ''}`}
    >
      {customIcon || <Icon name="Bell" className="size-5" color="white" />}

      {/* 읽지 않은 알림이 있을 때만 표시 */}
      {showBadge && unreadCount > 0 && (
        <div
          className={cn(
            notificationBadgeVariants({ variant: badgeVariant, position: badgePositionVariant }),
          )}
        >
          <DotBadge color="red" size="default" className="animate-pulse" />
        </div>
      )}
    </button>
  );
};
