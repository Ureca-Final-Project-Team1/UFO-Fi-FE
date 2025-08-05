import React from 'react';

import { cn } from '@/lib/utils';
import { DotBadge, Icon } from '@/shared';
import { NotificationTriggerProps } from '@/shared';

import { notificationTriggerVariants } from './NotificationDropdownVariants';

export const NotificationTrigger: React.FC<NotificationTriggerProps> = ({
  unreadCount,
  onClick,
  className = '',
  variant = 'default',
}) => {
  return (
    <button
      className={cn(notificationTriggerVariants({ variant }), className)}
      onClick={onClick}
      aria-label={`알림 ${unreadCount > 0 ? `(${unreadCount}개의 새 알림)` : ''}`}
    >
      <Icon name="Bell" className="size-5" color="white" />

      {/* 읽지 않은 알림이 있을 때만 표시 */}
      {unreadCount > 0 && (
        <div className="absolute -top-0.5 -right-0.5">
          <DotBadge color="red" size="default" className="animate-pulse" />
        </div>
      )}
    </button>
  );
};
