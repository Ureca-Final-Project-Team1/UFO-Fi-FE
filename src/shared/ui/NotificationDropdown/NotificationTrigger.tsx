import React, { ComponentProps } from 'react';

import { DotBadge, Icon } from '@/shared';

type NotificationTriggerProps = ComponentProps<'button'> & {
  unreadCount?: number;
  onClick?: () => void;
};

export const NotificationTrigger: React.FC<NotificationTriggerProps> = (props) => {
  const { unreadCount = 0, onClick = () => {}, className = '', ...rest } = props;

  return (
    <button
      className={`relative w-10 h-10 rounded-full transition-all duration-200 hover:bg-white/10 active:scale-95 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white/30 ${className}`}
      onClick={onClick}
      aria-label={`알림 ${unreadCount > 0 ? `(${unreadCount}개의 새 알림)` : ''}`}
      {...rest}
    >
      <Icon name="Bell" className="w-5 h-5" color="white" />

      {/* 읽지 않은 알림이 있을 때만 표시 */}
      {unreadCount > 0 && (
        <div className="absolute -top-0.5 -right-0.5">
          <DotBadge color="red" size="default" className="animate-pulse" />
        </div>
      )}
    </button>
  );
};
