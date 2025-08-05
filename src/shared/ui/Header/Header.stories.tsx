import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { toast } from 'sonner';

import { cn } from '@/lib/utils';
import { Button, Modal } from '@/shared';

import {
  headerVariants,
  logoVariants,
  titleVariants,
  userAvatarVariants,
  userNameVariants,
} from './HeaderVariants';

// Storybook용 MockHeader 컴포넌트
function MockHeader({
  userName = 'Admin',
  variant = 'default',
  size = 'default',
  className,
  ...props
}: {
  userName?: string;
  variant?: 'default' | 'dark' | 'transparent';
  size?: 'default' | 'compact' | 'large';
  className?: string;
}) {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      // Storybook에서는 실제 API 호출 대신 시뮬레이션
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success('로그아웃되었습니다.');
      console.warn('로그아웃 버튼이 클릭되었습니다.');
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
      <header className={cn(headerVariants({ variant, size }), className)} {...props}>
        <div className="flex items-center justify-between">
          {/* 왼쪽: 로고 및 타이틀 */}
          <div className="flex items-center gap-3">
            <div className={cn(logoVariants({ variant, size }))}>
              <span className="text-white font-bold text-sm">U</span>
            </div>
            <h1 className={cn(titleVariants({ variant, size }))}>UFO-Fi Admin</h1>
          </div>

          {/* 오른쪽: 사용자 정보 및 로그아웃 */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2">
              <div className={cn(userAvatarVariants({ variant, size }))}>
                <span className="text-gray-600 font-medium text-xs">
                  {userName.charAt(0).toUpperCase()}
                </span>
              </div>
              <span className={cn(userNameVariants({ variant, size }))}>{userName}</span>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsLogoutModalOpen(true)}
              className="text-gray-700 hover:text-gray-900"
            >
              로그아웃
            </Button>
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

const meta: Meta<typeof MockHeader> = {
  title: 'UI/Header',
  component: MockHeader,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'dark', 'transparent'],
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'compact', 'large'],
    },
    userName: {
      control: { type: 'text' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof MockHeader>;

export const Default: Story = {
  args: {
    userName: '김어드민',
    variant: 'default',
    size: 'default',
  },
};

export const Dark: Story = {
  args: {
    userName: '김어드민',
    variant: 'dark',
    size: 'default',
  },
};

export const Transparent: Story = {
  args: {
    userName: '김어드민',
    variant: 'transparent',
    size: 'default',
  },
};

export const Compact: Story = {
  args: {
    userName: '김어드민',
    variant: 'default',
    size: 'compact',
  },
};

export const Large: Story = {
  args: {
    userName: '김어드민',
    variant: 'default',
    size: 'large',
  },
};
