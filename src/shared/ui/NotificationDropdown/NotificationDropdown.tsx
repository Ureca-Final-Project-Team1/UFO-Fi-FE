'use client';

import React, { ComponentProps } from 'react';

import type { NotificationItem as NotificationItemType } from '@/api';
import { nextApiRequest } from '@/api/client/axios';
import { Icon, NotificationTrigger, NotificationItem } from '@/shared';

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from './DropdownMenu';
import {
  dropdownContentVariants,
  headerVariants,
  headerTitleVariants,
  headerBadgeVariants,
  markAllButtonVariants,
  contentVariants,
  loadingContainerVariants,
  loadingIconVariants,
  loadingTextVariants,
  emptyContainerVariants,
  emptyIconContainerVariants,
  emptyIconVariants,
  emptyTitleVariants,
  emptyDescriptionVariants,
  listContainerVariants,
  messageMap,
} from './NotificationDropdownVariants';

type NotificationDropdownProps = Omit<ComponentProps<'div'>, 'onClick'> & {
  isOpen?: boolean;
  onToggle?: () => void;
  onNotificationClick?: (notification: NotificationItemType) => void;
  onMarkAllRead?: () => void;
  notifications?: NotificationItemType[];
  isLoading?: boolean;
};

// 메인 드롭다운 컴포넌트
export const NotificationDropdown: React.FC<NotificationDropdownProps> = (props) => {
  // props에서 필요한 값들을 추출하고 기본값 설정
  const {
    isOpen = false,
    onToggle = () => {},
    onNotificationClick = () => {},
    onMarkAllRead = () => {},
    className = '',
    notifications = [],
    isLoading = false,
    ...rest
  } = props;

  // 단일 알림 읽음 처리
  const handleNotificationClick = async (notification: NotificationItemType) => {
    try {
      // 읽지 않은 알림인 경우 읽음 처리
      if (!notification.isRead && notification.id) {
        await nextApiRequest.patch(`/api/notifications/${notification.id}/read`);
      }

      if (notification.url) {
        window.open(notification.url, '_blank');
      }

      onNotificationClick(notification);
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
      // 에러가 발생해도 알림 클릭 처리는 계속 진행
      if (notification.url) {
        window.open(notification.url, '_blank');
      }
      onNotificationClick(notification);
    }
  };

  // 모든 알림 읽음 처리
  const handleMarkAllRead = async () => {
    try {
      await nextApiRequest.patch('/api/notifications');
      onMarkAllRead();
    } catch (error) {
      console.error('Failed to mark all notifications as read:', error);
      // 에러가 발생해도 UI 업데이트는 진행
      onMarkAllRead();
    }
  };

  // 읽지 않은 알림 개수 계산
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div {...rest}>
      <DropdownMenu open={isOpen} onOpenChange={onToggle}>
        <DropdownMenuTrigger asChild>
          <div>
            <NotificationTrigger
              unreadCount={unreadCount}
              onClick={onToggle}
              className={className}
            />
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className={dropdownContentVariants()}
          sideOffset={12}
          avoidCollisions={true}
        >
          {/* 헤더 */}
          <div className={headerVariants()}>
            <div className="flex items-center justify-between">
              <h3 className={headerTitleVariants()}>
                <Icon name="Bell" className="w-4 h-4" />
                알림
                {unreadCount > 0 && <span className={headerBadgeVariants()}>{unreadCount}</span>}
              </h3>
              {unreadCount > 0 && (
                <button onClick={handleMarkAllRead} className={markAllButtonVariants()}>
                  {messageMap.markAllRead}
                </button>
              )}
            </div>
          </div>

          {/* 알림 목록 */}
          <div className={contentVariants()}>
            {isLoading ? (
              <div className={loadingContainerVariants()}>
                <Icon name="Loader2" className={loadingIconVariants()} />
                <span className={loadingTextVariants()}>{messageMap.loading}</span>
              </div>
            ) : notifications.length === 0 ? (
              <div className={emptyContainerVariants()}>
                <div className={emptyIconContainerVariants()}>
                  <Icon name="Bell" className={emptyIconVariants()} />
                </div>
                <h4 className={emptyTitleVariants()}>{messageMap.empty.title}</h4>
                <p className={emptyDescriptionVariants()}>{messageMap.empty.description}</p>
              </div>
            ) : (
              <div className={listContainerVariants()}>
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
    </div>
  );
};
