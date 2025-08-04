import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { IMAGE_PATHS } from '@/constants/images';
import { Icon, Modal } from '@/shared';

// Mock LogoutModal for Storybook to avoid useRouter dependency
const MockLogoutModal = ({
  isOpen = false,
  onClose,
  title = '로그아웃',
  description = '정말 로그아웃하시겠습니까?',
  primaryButtonText = '확인',
  secondaryButtonText = '취소',
  onPrimaryClick,
  onSecondaryClick,
  redirectTo,
  imageSrc = IMAGE_PATHS['AL_REPORTED'],
  imageAlt = '로그아웃',
  imagePosition = { x: 90, y: 50 },
  imageSize = { width: 150, height: 150 },
  type = 'double',
  hasCloseButton = false,
}: {
  isOpen?: boolean;
  onClose?: () => void;
  title?: string;
  description?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  redirectTo?: string;
  imageSrc?: string;
  imageAlt?: string;
  imagePosition?: { x: number; y: number };
  imageSize?: { width: number; height: number };
  type?: 'single' | 'double';
  hasCloseButton?: boolean;
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
      secondaryButtonText={secondaryButtonText}
      onPrimaryClick={handlePrimaryClick}
      onSecondaryClick={onSecondaryClick}
      imageSrc={imageSrc}
      imageAlt={imageAlt}
      imagePosition={imagePosition}
      imageSize={imageSize}
      type={type}
      hasCloseButton={hasCloseButton}
      headerAlign="left"
    />
  );
};

// Wrapper component to manage modal state
const LogoutModalWrapper = (args: {
  title?: string;
  description?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  onClose?: () => void;
  redirectTo?: string;
  imageSrc?: string;
  imagePosition?: { x: number; y: number };
  imageSize?: { width: number; height: number };
  type?: 'single' | 'double';
  hasCloseButton?: boolean;
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
            <h2 className="text-white text-base font-semibold mb-4">로그아웃 모달 테스트</h2>
            <button
              onClick={() => setIsOpen(true)}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              로그아웃 모달 열기
            </button>
          </div>
        </div>
      </div>

      <MockLogoutModal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

const meta: Meta<typeof LogoutModalWrapper> = {
  title: 'Mypage/LogoutModal',
  component: LogoutModalWrapper,
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
    onSecondaryClick: { action: 'secondary button clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof LogoutModalWrapper>;

export const Default: Story = {
  args: {
    title: '로그아웃',
    description: '정말 로그아웃하시겠습니까?',
    primaryButtonText: '확인',
    secondaryButtonText: '취소',
    imageSrc: IMAGE_PATHS['AL_REPORTED'],
    type: 'double',
  },
};

export const SingleButton: Story = {
  args: {
    title: '로그아웃',
    description: '정말 로그아웃하시겠습니까?',
    primaryButtonText: '로그아웃',
    type: 'single',
    imageSrc: IMAGE_PATHS['AL_REPORTED'],
  },
};

export const WithCloseButton: Story = {
  args: {
    title: '로그아웃',
    description: '정말 로그아웃하시겠습니까?',
    primaryButtonText: '확인',
    secondaryButtonText: '취소',
    hasCloseButton: true,
    imageSrc: IMAGE_PATHS['AL_REPORTED'],
    type: 'double',
  },
};

// Desktop Story Wrapper Component
const DesktopStoryWrapper = (args: {
  title?: string;
  description?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  onClose?: () => void;
  redirectTo?: string;
  imageSrc?: string;
  imagePosition?: { x: number; y: number };
  imageSize?: { width: number; height: number };
  type?: 'single' | 'double';
  hasCloseButton?: boolean;
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
            <h2 className="text-white text-base font-semibold mb-4">
              데스크톱 로그아웃 모달 테스트
            </h2>
            <button
              onClick={() => setIsOpen(true)}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              로그아웃 모달 열기
            </button>
          </div>
        </div>
      </div>

      <MockLogoutModal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

export const Desktop: Story = {
  args: {
    title: '데스크톱 로그아웃',
    description: '정말 로그아웃하시겠습니까?',
    primaryButtonText: '확인',
    secondaryButtonText: '취소',
    imageSrc: IMAGE_PATHS['AL_REPORTED'],
    type: 'double',
  },
  render: (args) => <DesktopStoryWrapper {...args} />,
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};
