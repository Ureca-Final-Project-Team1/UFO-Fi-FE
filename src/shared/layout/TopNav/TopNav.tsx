'use client';

import Link from 'next/link';
import React from 'react';

import { ICON_PATHS } from '@/constants/icons';
import { Icon, LucideIcon } from '@/shared/ui';

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
  const handleNotificationClick = () => {
    try {
      if (onNotificationClick && typeof onNotificationClick === 'function') {
        onNotificationClick();
      }
    } catch (error) {
      console.error('Notification click error:', error);
    }
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
          <button
            className="flex items-center justify-center w-10 h-10 rounded-full transition-colors hover:bg-white/10 active:scale-95"
            onClick={handleNotificationClick}
            aria-label="notification"
          >
            <LucideIcon name="Bell" size="lg" color="white" />
          </button>
        )}
      </div>
    </header>
  );
};

export default TopNav;
