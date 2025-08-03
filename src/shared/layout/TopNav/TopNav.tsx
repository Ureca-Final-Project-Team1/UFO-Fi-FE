'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { nextApiRequest } from '@/backend/client/axios';
import type { NotificationItem } from '@/backend/types/notification';
import { ICON_PATHS } from '@/constants/icons';
import { formatZetAmount } from '@/features/common/components/ZetDisplay';
import { useMyInfo } from '@/features/mypage/hooks/useMyInfo';
import { Icon, NotificationDropdown } from '@/shared';

interface TopNavProps {
  title?: string;
  showNotification?: boolean;
  onNotificationClick?: () => void;
  className?: string;
}

const TopNav: React.FC<TopNavProps> = ({ title = 'UFO-Fi', onNotificationClick }) => {
  const router = useRouter();
  const pathname = usePathname();
  const isSignupPage = pathname.startsWith('/signup');
  const { data: myInfo, isLoading: isMyInfoLoading } = useMyInfo(!isSignupPage);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // 알림 데이터 로드 함수
  const loadNotifications = async () => {
    setIsLoading(true);
    try {
      // Next.js API 라우트 사용
      const response = await nextApiRequest.get<{
        statusCode: number;
        message: string;
        content: {
          notifications: NotificationItem[];
          unreadCount: number;
        };
      }>('/api/notifications');

      if (response.data.statusCode === 200) {
        setNotifications(response.data.content.notifications);
      }
    } catch (error) {
      console.error('Failed to load notifications:', error);
      // 에러 발생 시 빈 배열로 설정
      setNotifications([]);
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

  const handleMarkAllRead = async () => {
    try {
      await nextApiRequest.patch('/api/notifications');
      // 모든 알림을 읽음 상태로 업데이트
      setNotifications((prev) =>
        prev.map((notification) => ({
          ...notification,
          isRead: true,
        })),
      );
      setIsNotificationOpen(false);
    } catch (error) {
      console.error('Failed to mark all notifications as read:', error);
    }
  };

  const handleNotificationClick = (notification: NotificationItem) => {
    // 알림 클릭 시 해당 알림을 읽음 상태로 업데이트
    setNotifications((prev) =>
      prev.map((n) => (n.id === notification.id ? { ...n, isRead: true } : n)),
    );

    if (notification.url) {
      window.open(notification.url, '_blank');
    }

    onNotificationClick?.();
    setIsNotificationOpen(false);
  };

  const handleZetClick = () => {
    router.push('/charge');
  };

  const zetAsset = myInfo?.zetAsset ?? 0;
  const formattedZet = formatZetAmount(zetAsset);

  return (
    <header className="top-nav-fixed">
      <div className="flex items-center justify-between h-14 px-4 w-full">
        {/* 로고 및 타이틀 */}
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

        {/* ZET 잔액 및 알림 드롭다운 */}
        <div className="flex items-center gap-3">
          {/* ZET 잔액 박스 */}
          {isMyInfoLoading ? (
            <div className="min-w-[124px] max-w-[160px] h-[36px] rounded-xl px-3" />
          ) : (
            <div
              className="min-w-[124px] max-w-[160px] h-[36px] bg-primary-700 border-2 border-blue-500 rounded-xl flex items-center justify-between cursor-pointer hover:bg-primary-600 transition-colors px-3 overflow-hidden"
              onClick={handleZetClick}
            >
              <div className="flex items-center overflow-hidden">
                <span className="body-16-bold text-cyan-400 truncate max-w-[84px]">
                  {formattedZet}
                </span>
                <span className="body-16-bold text-cyan-400 ml-1">ZET</span>
              </div>
              <div className="size-5 bg-cyan-400 rounded-full flex items-center justify-center">
                <Icon
                  name="Plus"
                  size="sm"
                  color="rgb(var(--color-primary-700))"
                  className="font-black"
                />
              </div>
            </div>
          )}

          {/* 알림 드롭다운 */}
          <NotificationDropdown
            isOpen={isNotificationOpen}
            onToggle={() => setIsNotificationOpen(!isNotificationOpen)}
            onNotificationClick={handleNotificationClick}
            onMarkAllRead={handleMarkAllRead}
            notifications={notifications}
            isLoading={isLoading}
          />
        </div>
      </div>
    </header>
  );
};

export default TopNav;
