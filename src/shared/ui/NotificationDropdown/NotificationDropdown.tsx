'use client';

import React, { useState, useEffect } from 'react';

import { Icon, NotificationItem, NotificationTrigger } from '@/shared';
import { NotificationDropdownProps } from '@/shared';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/shared/ui/NotificationDropdown/DropdownMenu';

import { NotificationType } from './NotificationDropdown.types';

interface NotificationItem {
  type: NotificationType;
  title: string;
  content: string;
  url?: string;
  notifiedAt: string;
}

// TODO:
const fetchNotifications = async (): Promise<NotificationItem[]> => {
  await new Promise((resolve) => setTimeout(resolve, 800));

  return [
    {
      type: 'BENEFIT',
      title: 'ZET 충전 보너스 지급 완료!',
      content: '10,000 ZET 충전에 대한 추가 1,000 ZET 보너스가 지급되었습니다.',
      notifiedAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    },
    {
      type: 'INTERESTED_POST',
      title: '관심 상품 알림',
      content: '회원님이 관심 상품 알림으로 설정한 매물이 등장했습니다!',
      notifiedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    },
    {
      type: 'SELL',
      title: '데이터 거래 완료',
      content: '5GB 데이터 판매가 성공적으로 완료되었습니다. 수익금이 계정에 입금되었어요.',
      notifiedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    },
  ];
};

// 메인 드롭다운 컴포넌트
export const NotificationDropdown: React.FC<NotificationDropdownProps> = ({
  isOpen,
  onToggle,
  onNotificationClick,
  onMarkAllRead,
  className = '',
}) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // 알림 데이터 로드
  const loadNotifications = async () => {
    setIsLoading(true);
    try {
      const data = await fetchNotifications();
      setNotifications(data);
    } catch (error) {
      console.error('Failed to load notifications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 드롭다운이 열릴 때 알림 로드
  useEffect(() => {
    if (isOpen) {
      loadNotifications();
    }
  }, [isOpen]);

  // 알림 클릭 처리
  const handleNotificationClick = (notification: NotificationItem) => {
    if (notification.url) {
      window.open(notification.url, '_blank');
    }
    onNotificationClick?.(notification);
    onToggle(); // 드롭다운 닫기
  };

  // 모두 읽음 처리
  const handleMarkAllRead = () => {
    setNotifications([]);
    onMarkAllRead?.();
  };

  const unreadCount = notifications.length;

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
              <Icon name="Bell" className="w-4 h-4" />
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
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Icon name="Loader2" className="w-8 h-8 animate-spin text-blue-500 mb-3" />
              <span className="text-sm text-gray-500 font-medium">알림을 불러오는 중...</span>
            </div>
          ) : notifications.length === 0 ? (
            <div className="py-12 px-6 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Bell" className="w-8 h-8 text-gray-400" />
              </div>
              <h4 className="text-sm font-semibold text-gray-900 mb-2">알림이 없습니다</h4>
              <p className="text-xs text-gray-500">새로운 알림이 도착하면 여기에 표시됩니다</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {notifications.map((notification, index) => (
                <NotificationItem
                  key={`${notification.title}-${index}`}
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
