'use client';

import React from 'react';

import type { NotificationItem as NotificationItemType } from '@/backend';
import { nextApiRequest } from '@/backend/client/axios';
import { API_ENDPOINTS } from '@/constants';
import { Icon, NotificationTrigger, NotificationDropdownProps, NotificationItem } from '@/shared';

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from './DropdownMenu';

// 메인 드롭다운 컴포넌트
export const NotificationDropdown: React.FC<NotificationDropdownProps> = ({
  isOpen,
  onToggle,
  onNotificationClick,
  onMarkAllRead,
  className = '',
  notifications = [],
  isLoading = false,
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
        <div>
          <NotificationTrigger unreadCount={unreadCount} onClick={onToggle} className={className} />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-80 max-h-[500px] overflow-hidden p-0 shadow-xl border border-gray-200 bg-white"
        sideOffset={12}
        avoidCollisions={true}
      >
        {/* 헤더 */}
        <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/80 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <Icon name="Bell" className="size-4" color="white" />
              알림
              {unreadCount > 0 && (
                <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded-full">
                  {unreadCount}
                </span>
              )}
            </h3>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                className="text-xs text-blue-600 hover:text-blue-800 font-semibold transition-colors hover:underline"
              >
                모두 읽음
              </button>
            )}
          </div>
        </div>

        {/* 알림 목록 */}
        <div className="max-h-96 overflow-y-auto overscroll-contain">
          {isLoading ? null : notifications.length === 0 ? (
            <div className="py-12 px-6 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Bell" className="w-8 h-8 text-gray-400" color="white" />
              </div>
              <h4 className="text-sm font-semibold text-gray-900 mb-2">알림이 없습니다</h4>
              <p className="text-xs text-gray-500">새로운 알림이 도착하면 여기에 표시됩니다</p>
            </div>
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
