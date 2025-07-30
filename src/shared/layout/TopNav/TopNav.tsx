'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { notificationsAPI } from '@/api/services/notification/notifications';
import { NotificationItem } from '@/api/types/notification';
import { ICON_PATHS } from '@/constants/icons';
import { useMyInfo } from '@/features/mypage/hooks/useMyInfo';
import { Icon } from '@/shared';
import { NotificationDropdown } from '@/shared';

interface TopNavProps {
  title?: string;
  showNotification?: boolean;
  onNotificationClick?: () => void;
  className?: string;
}

const TopNav: React.FC<TopNavProps> = ({ title = 'UFO-Fi', onNotificationClick }) => {
  const { data: myInfo } = useMyInfo();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // 알림 데이터 로드 함수 추가
  const loadNotifications = async () => {
    setIsLoading(true);
    try {
      const response = await notificationsAPI.getNotifications();
      setNotifications(response.content.notifications);
    } catch (error) {
      console.error('Failed to load notifications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 드롭다운 열릴 때 알림 로드
  useEffect(() => {
    if (isNotificationOpen) {
      loadNotifications();
    }
  }, [isNotificationOpen]);

  const handleMarkAllRead = () => {
    setNotifications([]);
    setIsNotificationOpen(false);
  };

  const handleNotificationClick = (notification: NotificationItem) => {
    if (notification.url) {
      window.open(notification.url, '_blank');
    }

    onNotificationClick?.();
    setIsNotificationOpen(false);
  };

  return (
    <header className="fixed top-0 left-1/2 transform -translate-x-1/2 h-14 z-30 w-full min-w-[375px] max-w-[620px] bg-primary-700 shadow-sm">
      <div className="flex items-center justify-between h-full px-4 w-full">
        <div className="flex items-center gap-3">
          {ICON_PATHS?.UFO_LOGO ? (
            <Icon src={ICON_PATHS.UFO_LOGO} alt="UFO Logo" size="xl" />
          ) : (
            <Icon name="ufo" size="xl" />
          )}
          <Link href="/" className="pyeongchangpeace-logo font-bold text-white tracking-tight">
            {title}
          </Link>
        </div>

        {/* 유저 정보 있을 때만 알림 드롭다운 표시 */}
        {myInfo && (
          <NotificationDropdown
            isOpen={isNotificationOpen}
            onToggle={() => setIsNotificationOpen(!isNotificationOpen)}
            onNotificationClick={handleNotificationClick}
            onMarkAllRead={handleMarkAllRead}
            notifications={notifications}
            isLoading={isLoading}
          />
        )}
      </div>
    </header>
  );
};

export default TopNav;
