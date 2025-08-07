'use client';

import React from 'react';

import type { NotificationItem as NotificationItemType } from '@/backend';
import { nextApiRequest } from '@/backend/client/axios';
import { API_ENDPOINTS } from '@/constants';
import { cn } from '@/lib/utils';

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from './DropdownMenu';
import { NotificationDropdownProps } from './NotificationDropdown.types';
import {
  notificationDropdownVariants,
  notificationDropdownContentVariants,
  notificationListVariants,
} from './NotificationDropdownVariants';
import { NotificationEmpty } from './NotificationEmpty';
import { NotificationHeader } from './NotificationHeader';
import { NotificationItem } from './NotificationItem';
import { NotificationTrigger } from './NotificationTrigger';

// 메인 드롭다운 컴포넌트
export const NotificationDropdown: React.FC<NotificationDropdownProps> = ({
  isOpen,
  onToggle,
  onNotificationClick,
  onMarkAllRead,
  className = '',
  notifications = [],
  isLoading = false,
  variant = 'default',
  size = 'md',
  contentSize = 'md',
  contentVariant = 'default',
  listMaxHeight = 'md',
  headerVariant = 'default',
  headerSize = 'md',
  showHeaderBadge = true,
  showMarkAllRead = true,
  emptyVariant = 'default',
  emptySize = 'md',
}) => {
  // 단일 알림 읽음 처리
  const handleNotificationClick = async (notification: NotificationItemType) => {
    try {
      // 읽지 않은 알림인 경우 읽음 처리
      if (!notification.isRead && notification.id) {
        await nextApiRequest.patch(
          API_ENDPOINTS.NEXT_NOTIFICATION.READ_NOTIFICATION(notification.id),
        );
      }

      if (notification.url) {
        window.open(notification.url, '_blank');
      }

      onNotificationClick?.(notification);
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
      // 에러가 발생해도 알림 클릭 처리는 계속 진행
      if (notification.url) {
        window.open(notification.url, '_blank');
      }
      onNotificationClick?.(notification);
    }
  };

  // 모든 알림 읽음 처리
  const handleMarkAllRead = async () => {
    try {
      await nextApiRequest.patch(API_ENDPOINTS.NEXT_NOTIFICATION.READ_NOTIFICATION_ALL);
      onMarkAllRead?.();
    } catch (error) {
      console.error('Failed to mark all notifications as read:', error);
      // 에러가 발생해도 UI 업데이트는 진행
      onMarkAllRead?.();
    }
  };

  // 읽지 않은 알림 개수 계산
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <DropdownMenu open={isOpen} onOpenChange={onToggle}>
      <DropdownMenuTrigger asChild>
        <div className={cn(notificationDropdownVariants({ variant, size }), className)}>
          <NotificationTrigger unreadCount={unreadCount} onClick={onToggle} />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className={cn(
          notificationDropdownContentVariants({ size: contentSize, variant: contentVariant }),
        )}
        sideOffset={12}
        avoidCollisions={true}
      >
        {/* 헤더 */}
        <NotificationHeader
          unreadCount={unreadCount}
          onMarkAllRead={handleMarkAllRead}
          variant={headerVariant}
          size={headerSize}
          showBadge={showHeaderBadge}
          showMarkAllRead={showMarkAllRead}
        />

        {/* 알림 목록 */}
        <div className={cn(notificationListVariants({ maxHeight: listMaxHeight }))}>
          {isLoading ? null : notifications.length === 0 ? (
            <NotificationEmpty variant={emptyVariant} size={emptySize} />
          ) : (
            <div className="divide-y divide-gray-50">
              {notifications.map((notification) => (
                <NotificationItem
                  key={
                    notification.id ||
                    `${notification.type}-${notification.title}-${notification.notifiedAt}`
                  }
                  notification={notification}
                  onClick={() => handleNotificationClick(notification)}
                />
              ))}
            </div>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
