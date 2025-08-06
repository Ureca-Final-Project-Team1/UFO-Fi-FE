'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import { logoutAPI } from '@/backend';
import { cn } from '@/lib/utils';
import { Button, Modal } from '@/shared';

import { HeaderProps } from './Header.types';
import {
  headerVariants,
  logoVariants,
  logoIconVariants,
  logoTextVariants,
  userInfoVariants,
  userAvatarVariants,
  userNameVariants,
  actionAreaVariants,
} from './HeaderVariants';

export default function Header({
  userName = 'Admin',
  className,
  variant = 'default',
  size = 'md',
  logoSize = 'md',
  logoVariant = 'default',
  logoIconSize = 'md',
  logoIconVariant = 'default',
  logoTextSize = 'md',
  logoTextVariant = 'default',
  userInfoDisplay = 'full',
  userInfoPosition = 'right',
  userAvatarSize = 'md',
  userAvatarVariant = 'default',
  userNameSize = 'md',
  userNameVariant = 'default',
  actionPosition = 'right',
  showUserInfo = true,
  showLogoutButton = true,
  logoText = 'UFO-Fi Admin',
  logoIcon,
  customActions,
}: HeaderProps) {
  const router = useRouter();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logoutAPI.setLogout();
      toast.success('로그아웃되었습니다.');
      router.push('/login');
    } catch (error) {
      console.error('로그아웃 실패:', error);
      toast.error('로그아웃에 실패했습니다.');
    } finally {
      setIsLoggingOut(false);
      setIsLogoutModalOpen(false);
    }
  };

  return (
    <>
      <header className={cn(headerVariants({ variant, size }), className)}>
        <div className={cn(headerVariants({ variant, size }))}>
          <div className="flex items-center justify-between">
            {/* 왼쪽: 로고 및 타이틀 */}
            <div className={cn(logoVariants({ size: logoSize, variant: logoVariant }))}>
              <div
                className={cn(logoIconVariants({ size: logoIconSize, variant: logoIconVariant }))}
              >
                {logoIcon || <span>U</span>}
              </div>
              <h1
                className={cn(logoTextVariants({ size: logoTextSize, variant: logoTextVariant }))}
              >
                {logoText}
              </h1>
            </div>

            {/* 오른쪽: 사용자 정보 및 로그아웃 */}
            <div className={cn(actionAreaVariants({ position: actionPosition }))}>
              {showUserInfo && (
                <div
                  className={cn(
                    userInfoVariants({ display: userInfoDisplay, position: userInfoPosition }),
                  )}
                >
                  <div
                    className={cn(
                      userAvatarVariants({ size: userAvatarSize, variant: userAvatarVariant }),
                    )}
                  >
                    <span
                      className={cn(
                        userNameVariants({ size: userNameSize, variant: userNameVariant }),
                      )}
                    >
                      {userName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span
                    className={cn(
                      userNameVariants({ size: userNameSize, variant: userNameVariant }),
                    )}
                  >
                    {userName}
                  </span>
                </div>
              )}

              {showLogoutButton && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsLogoutModalOpen(true)}
                  className="text-gray-700 hover:text-gray-900"
                >
                  로그아웃
                </Button>
              )}

              {customActions}
            </div>
          </div>
        </div>
      </header>

      {/* 로그아웃 확인 모달 */}
      <Modal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        title="로그아웃 확인"
        description="정말 로그아웃하시겠습니까?"
        type="double"
        primaryButtonText={isLoggingOut ? '로그아웃 중...' : '로그아웃'}
        secondaryButtonText="취소"
        onPrimaryClick={handleLogout}
        onSecondaryClick={() => setIsLogoutModalOpen(false)}
        primaryButtonDisabled={isLoggingOut}
      />
    </>
  );
}
