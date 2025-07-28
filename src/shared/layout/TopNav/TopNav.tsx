'use client';

import Link from 'next/link';
import React, { useState } from 'react';

import { NotificationItem } from '@/api';
import { ICON_PATHS } from '@/constants/icons';
import { useMyInfo } from '@/features/mypage/hooks/useMyInfo';
import { Icon } from '@/shared';
import { NotificationDropdown } from '@/shared/ui/NotificationDropdown';

interface TopNavProps {
  title?: string;
  showNotification?: boolean;
  onNotificationClick?: () => void;
  className?: string;
}

const TopNav: React.FC<TopNavProps> = ({ title = 'UFO-Fi', onNotificationClick }) => {
  const { data: myInfo } = useMyInfo();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const handleNotificationClick = (notification: NotificationItem) => {
    if (notification.url) {
      window.open(notification.url, '_blank');
    }

    onNotificationClick?.();
    setIsNotificationOpen(false);
  };

  const handleMarkAllRead = () => {
    setIsNotificationOpen(false);
  };

  return (
    <header className="absolute top-0 left-0 right-0 h-14 bg-primary-700 z-30 shadow-sm">
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
          />
        )}
      </div>
    </header>
  );
};

export default TopNav;
