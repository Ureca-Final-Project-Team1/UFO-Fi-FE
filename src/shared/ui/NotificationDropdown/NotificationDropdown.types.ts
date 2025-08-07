import { VariantProps } from 'class-variance-authority';

import type { NotificationItem } from '@/backend/types/notification';
export type { NotificationItem };
import type { IconType } from '@/shared';

import {
  notificationDropdownVariants,
  notificationTriggerVariants,
  notificationBadgeVariants,
  notificationItemVariants,
  notificationItemIconVariants,
  notificationItemContentVariants,
  notificationItemTitleVariants,
  notificationItemDescriptionVariants,
  notificationItemTimeVariants,
  notificationItemUnreadBadgeVariants,
  notificationHeaderVariants,
  notificationHeaderTitleVariants,
  notificationHeaderBadgeVariants,
  notificationHeaderMarkAllReadVariants,
  notificationEmptyVariants,
  notificationEmptyIconVariants,
  notificationEmptyTitleVariants,
  notificationEmptyDescriptionVariants,
  notificationListVariants,
  notificationDropdownContentVariants,
} from './NotificationDropdownVariants';

export type NotificationType =
  | 'BENEFIT'
  | 'SELL'
  | 'INTERESTED_POST'
  | 'REPORTED'
  | 'FOLLOWER_POST'
  | 'TRADE';

// 메인 NotificationDropdown Props
export interface NotificationDropdownProps {
  isOpen: boolean;
  onToggle: () => void;
  onNotificationClick?: (notification: NotificationItem) => void;
  onMarkAllRead?: () => void;
  className?: string;
  notifications?: NotificationItem[];
  isLoading?: boolean;
  // Container variants
  variant?: VariantProps<typeof notificationDropdownVariants>['variant'];
  size?: VariantProps<typeof notificationDropdownVariants>['size'];
  // Content variants
  contentSize?: VariantProps<typeof notificationDropdownContentVariants>['size'];
  contentVariant?: VariantProps<typeof notificationDropdownContentVariants>['variant'];
  // List variants
  listMaxHeight?: VariantProps<typeof notificationListVariants>['maxHeight'];
  // Header variants
  headerVariant?: VariantProps<typeof notificationHeaderVariants>['variant'];
  headerSize?: VariantProps<typeof notificationHeaderVariants>['size'];
  showHeaderBadge?: boolean;
  showMarkAllRead?: boolean;
  // Empty state variants
  emptyVariant?: VariantProps<typeof notificationEmptyVariants>['variant'];
  emptySize?: VariantProps<typeof notificationEmptyVariants>['size'];
}

// NotificationTrigger Props
export interface NotificationTriggerProps {
  unreadCount: number;
  onClick: () => void;
  className?: string;
  // Trigger variants
  variant?: VariantProps<typeof notificationTriggerVariants>['variant'];
  size?: VariantProps<typeof notificationTriggerVariants>['size'];
  badgePosition?: VariantProps<typeof notificationTriggerVariants>['badgePosition'];
  // Badge variants
  badgeVariant?: VariantProps<typeof notificationBadgeVariants>['variant'];
  badgePositionVariant?: VariantProps<typeof notificationBadgeVariants>['position'];
  // Customization
  showBadge?: boolean;
  customIcon?: React.ReactNode;
}

// NotificationItem Props
export interface NotificationItemProps {
  notification: NotificationItem;
  onClick: () => void;
  className?: string;
  // Item variants
  variant?: VariantProps<typeof notificationItemVariants>['variant'];
  size?: VariantProps<typeof notificationItemVariants>['size'];
  layout?: VariantProps<typeof notificationItemVariants>['layout'];
  unreadStyle?: VariantProps<typeof notificationItemVariants>['unreadStyle'];
  // Icon variants
  iconSize?: VariantProps<typeof notificationItemIconVariants>['size'];
  iconVariant?: VariantProps<typeof notificationItemIconVariants>['variant'];
  // Content variants
  contentLayout?: VariantProps<typeof notificationItemContentVariants>['layout'];
  // Title variants
  titleSize?: VariantProps<typeof notificationItemTitleVariants>['size'];
  // Description variants
  descriptionSize?: VariantProps<typeof notificationItemDescriptionVariants>['size'];
  // Time variants
  timeSize?: VariantProps<typeof notificationItemTimeVariants>['size'];
  timeVariant?: VariantProps<typeof notificationItemTimeVariants>['variant'];
  // Unread badge variants
  unreadBadgeVariant?: VariantProps<typeof notificationItemUnreadBadgeVariants>['variant'];
}

// NotificationHeader Props
export interface NotificationHeaderProps {
  unreadCount: number;
  onMarkAllRead?: () => void;
  className?: string;
  // Header variants
  variant?: VariantProps<typeof notificationHeaderVariants>['variant'];
  size?: VariantProps<typeof notificationHeaderVariants>['size'];
  // Title variants
  titleSize?: VariantProps<typeof notificationHeaderTitleVariants>['size'];
  titleVariant?: VariantProps<typeof notificationHeaderTitleVariants>['variant'];
  // Badge variants
  badgeVariant?: VariantProps<typeof notificationHeaderBadgeVariants>['variant'];
  // Mark all read button variants
  markAllReadVariant?: VariantProps<typeof notificationHeaderMarkAllReadVariants>['variant'];
  // Customization
  showBadge?: boolean;
  showMarkAllRead?: boolean;
  customTitle?: string;
  customIcon?: React.ReactNode;
}

// NotificationEmpty Props
export interface NotificationEmptyProps {
  className?: string;
  // Empty variants
  variant?: VariantProps<typeof notificationEmptyVariants>['variant'];
  size?: VariantProps<typeof notificationEmptyVariants>['size'];
  // Icon variants
  iconSize?: VariantProps<typeof notificationEmptyIconVariants>['size'];
  iconVariant?: VariantProps<typeof notificationEmptyIconVariants>['variant'];
  // Title variants
  titleSize?: VariantProps<typeof notificationEmptyTitleVariants>['size'];
  titleVariant?: VariantProps<typeof notificationEmptyTitleVariants>['variant'];
  // Description variants
  descriptionSize?: VariantProps<typeof notificationEmptyDescriptionVariants>['size'];
  descriptionVariant?: VariantProps<typeof notificationEmptyDescriptionVariants>['variant'];
  // Customization
  customIcon?: React.ReactNode;
  customTitle?: string;
  customDescription?: string;
}

// 알림 타입별 설정
export interface NotificationConfig {
  label: string;
  icon: IconType;
}
