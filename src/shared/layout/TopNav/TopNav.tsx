'use client';

import Link from 'next/link';
import React, { useState } from 'react';

import { NotificationItem } from '@/api';
import { ICON_PATHS } from '@/constants/icons';
import { Icon } from '@/shared';
import { NotificationDropdown } from '@/shared/ui/NotificationDropdown';

interface TopNavProps {
  title?: string;
  showNotification?: boolean;
  onNotificationClick?: () => void;
  className?: string;
}

const TopNav: React.FC<TopNavProps> = ({
  title = 'UFO-Fi',
  showNotification = false,
  onNotificationClick,
}) => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const handleNotificationClick = (notification: NotificationItem) => {
    // URL이 있으면 해당 페이지로 이동
    if (notification.url) {
      window.open(notification.url, '_blank');
    }

    if (onNotificationClick && typeof onNotificationClick === 'function') {
      onNotificationClick();
    }

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

        {showNotification && (
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
