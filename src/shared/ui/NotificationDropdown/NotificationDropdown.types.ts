import type { IconType } from '@/shared/ui/Icons';

export interface NotificationItem {
  type: 'BENEFIT' | 'SELL' | 'INTERESTED_POST' | 'REPORTED' | 'FOLLOWER_POST' | 'TRADE';
  title: string;
  content: string;
  url?: string;
  notifiedAt: string;
}

export interface NotificationDropdownProps {
  isOpen: boolean;
  onToggle: () => void;
  onNotificationClick?: (notification: NotificationItem) => void;
  onMarkAllRead?: () => void;
  className?: string;
}

export interface NotificationItemProps {
  notification: NotificationItem;
  onClick: () => void;
}

export interface NotificationTriggerProps {
  unreadCount: number;
  onClick: () => void;
  className?: string;
}

// 알림 타입별 설정
export interface NotificationConfig {
  label: string;
  icon: IconType;
}
