import { VariantProps } from 'class-variance-authority';

import type { NotificationItem } from '@/backend/types/notification';
export type { NotificationItem };
import type { IconType } from '@/shared';

import {
  notificationDropdownVariants,
  notificationHeaderVariants,
  notificationTitleVariants,
  notificationBadgeVariants,
  markAllReadButtonVariants,
  emptyStateContainerVariants,
  emptyStateIconVariants,
  emptyStateTitleVariants,
  emptyStateDescriptionVariants,
  notificationTriggerVariants,
  notificationItemVariants,
  notificationItemIconVariants,
  notificationItemTitleVariants,
  notificationItemContentVariants,
  notificationItemTimeVariants,
  notificationItemBadgeVariants,
} from './NotificationDropdownVariants';

export type NotificationType =
  | 'BENEFIT'
  | 'SELL'
  | 'INTERESTED_POST'
  | 'REPORTED'
  | 'FOLLOWER_POST'
  | 'TRADE';

export interface NotificationDropdownProps
  extends VariantProps<typeof notificationDropdownVariants> {
  isOpen: boolean;
  onToggle: () => void;
  onNotificationClick?: (notification: NotificationItem) => void;
  onMarkAllRead?: () => void;
  className?: string;
  notifications?: NotificationItem[];
  isLoading?: boolean;
}

export interface NotificationItemProps extends VariantProps<typeof notificationItemVariants> {
  notification: NotificationItem;
  onClick: () => void;
}

export interface NotificationTriggerProps extends VariantProps<typeof notificationTriggerVariants> {
  unreadCount: number;
  onClick: () => void;
  className?: string;
}

// 알림 타입별 설정
export interface NotificationConfig {
  label: string;
  icon: IconType;
}

// 내부 컴포넌트용 타입들
export interface NotificationHeaderProps extends VariantProps<typeof notificationHeaderVariants> {
  unreadCount: number;
  onMarkAllRead?: () => void;
}

export interface NotificationTitleProps extends VariantProps<typeof notificationTitleVariants> {
  unreadCount: number;
}

export interface NotificationBadgeProps extends VariantProps<typeof notificationBadgeVariants> {
  count: number;
}

export interface MarkAllReadButtonProps extends VariantProps<typeof markAllReadButtonVariants> {
  onClick: () => void;
}

export type EmptyStateProps = VariantProps<typeof emptyStateContainerVariants>;

export type EmptyStateIconProps = VariantProps<typeof emptyStateIconVariants>;

export type EmptyStateTitleProps = VariantProps<typeof emptyStateTitleVariants>;

export type EmptyStateDescriptionProps = VariantProps<typeof emptyStateDescriptionVariants>;

export interface NotificationItemIconProps
  extends VariantProps<typeof notificationItemIconVariants> {
  icon: IconType;
  isUnread: boolean;
}

export interface NotificationItemTitleProps
  extends VariantProps<typeof notificationItemTitleVariants> {
  title: string;
  isUnread: boolean;
}

export interface NotificationItemContentProps
  extends VariantProps<typeof notificationItemContentVariants> {
  content: string;
  isUnread: boolean;
}

export interface NotificationItemTimeProps
  extends VariantProps<typeof notificationItemTimeVariants> {
  time: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface NotificationItemBadgeProps
  extends VariantProps<typeof notificationItemBadgeVariants> {}
