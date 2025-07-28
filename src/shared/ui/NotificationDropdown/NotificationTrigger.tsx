import React from 'react';

import { Icon } from '@/shared';

interface NotificationTriggerProps {
  unreadCount: number;
  onClick: () => void;
  className?: string;
}

export const NotificationTrigger: React.FC<NotificationTriggerProps> = ({
  unreadCount,
  onClick,
  className = '',
}) => {
  return (
    <button
      className={`relative w-10 h-10 rounded-full transition-all duration-200 hover:bg-white/10 active:scale-95 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white/30 ${className}`}
      onClick={onClick}
      aria-label={`알림 ${unreadCount > 0 ? `(${unreadCount}개의 새 알림)` : ''}`}
    >
      <Icon name="Bell" className="w-5 h-5" color="white" />
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 min-w-[20px] h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center px-1 animate-pulse">
          {unreadCount > 99 ? '99+' : unreadCount}
        </span>
      )}
    </button>
  );
};
