import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Icon, Modal } from '@/shared';

// Mock ConfirmModal for Storybook to avoid useRouter dependency
const MockConfirmModal = ({
  isOpen = false,
  onClose,
  title = '알림',
  description = '',
  primaryButtonText = '확인',
  onPrimaryClick,
  redirectTo,
}: {
  isOpen?: boolean;
  onClose?: () => void;
  title?: string;
  description?: string;
  primaryButtonText?: string;
  onPrimaryClick?: () => void;
  redirectTo?: string;
}) => {
  const handlePrimaryClick = () => {
    if (onPrimaryClick) {
      onPrimaryClick();
    }
    if (redirectTo) {
      // Mock redirect functionality
      // console.log(`Redirecting to: ${redirectTo}`);
    }
    onClose?.();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      description={description}
      primaryButtonText={primaryButtonText}
      onPrimaryClick={handlePrimaryClick}
      hasCloseButton={false}
      type="single"
    />
  );
};

// Wrapper component to manage modal state
const ConfirmModalWrapper = (args: {
  title?: string;
  description?: string;
  primaryButtonText?: string;
  onPrimaryClick?: () => void;
  onClose?: () => void;
  redirectTo?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full h-full flex flex-col bg-gray-900">
      <div className="px-4 pt-4">
        {/* 헤더 - Title 컴포넌트 대신 직접 구현 */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
              <Icon name="ChevronLeft" className="w-5 h-5 text-white" />
            </button>
            <h1 className="text-white text-lg font-bold">마이페이지</h1>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
            <h2 className="text-white text-base font-semibold mb-4">확인 모달 테스트</h2>
            <button
              onClick={() => setIsOpen(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              모달 열기
            </button>
          </div>
        </div>
      </div>

      <MockConfirmModal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

const meta: Meta<typeof ConfirmModalWrapper> = {
  title: 'Mypage/ConfirmModal',
  component: ConfirmModalWrapper,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    onClose: { action: 'modal closed' },
    onPrimaryClick: { action: 'primary button clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof ConfirmModalWrapper>;

export const Default: Story = {
  args: {
    title: '알림',
    description: '정말로 이 작업을 수행하시겠습니까?',
    primaryButtonText: '확인',
  },
};

export const DeleteConfirmation: Story = {
  args: {
    title: '삭제 확인',
    description: '이 항목을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.',
    primaryButtonText: '삭제',
  },
};

export const LogoutConfirmation: Story = {
  args: {
    title: '로그아웃',
    description: '정말로 로그아웃하시겠습니까?',
    primaryButtonText: '로그아웃',
  },
};

// Desktop Story Wrapper Component
const DesktopStoryWrapper = (args: {
  title?: string;
  description?: string;
  primaryButtonText?: string;
  onPrimaryClick?: () => void;
  onClose?: () => void;
  redirectTo?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full h-full flex flex-col bg-gray-900">
      <div className="px-4 pt-4 max-w-2xl mx-auto w-full">
        {/* 헤더 - Title 컴포넌트 대신 직접 구현 */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
              <Icon name="ChevronLeft" className="w-5 h-5 text-white" />
            </button>
            <h1 className="text-white text-lg font-bold">데스크톱 마이페이지</h1>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
            <h2 className="text-white text-base font-semibold mb-4">데스크톱 확인 모달 테스트</h2>
            <button
              onClick={() => setIsOpen(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              모달 열기
            </button>
          </div>
        </div>
      </div>

      <MockConfirmModal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

export const Desktop: Story = {
  args: {
    title: '데스크톱 알림',
    description: '데스크톱에서의 확인 모달 테스트입니다.',
    primaryButtonText: '확인',
  },
  render: (args) => <DesktopStoryWrapper {...args} />,
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};
