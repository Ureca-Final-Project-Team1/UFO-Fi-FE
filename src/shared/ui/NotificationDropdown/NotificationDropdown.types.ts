import type { NotificationItem } from '@/backend/types/notification';
export type { NotificationItem };
import type { IconType } from '@/shared';

export type NotificationType =
  | 'BENEFIT'
  | 'SELL'
  | 'INTERESTED_POST'
  | 'REPORTED'
  | 'FOLLOWER_POST'
  | 'TRADE';

export interface NotificationDropdownProps {
  isOpen: boolean;
  onToggle: () => void;
  onNotificationClick?: (notification: NotificationItem) => void;
  onMarkAllRead?: () => void;
  className?: string;
  notifications?: NotificationItem[];
  isLoading?: boolean;
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
