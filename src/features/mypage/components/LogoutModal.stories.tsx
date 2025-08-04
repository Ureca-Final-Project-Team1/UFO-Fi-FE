import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

// Mock LogoutModal for Storybook
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
  imageSrc,

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
  if (!isOpen) return null;

  const handlePrimaryClick = () => {
    onPrimaryClick?.();
    if (redirectTo) {
      // Mock redirect functionality
    }
    onClose?.();
  };

  const handleSecondaryClick = () => {
    onSecondaryClick?.();
    onClose?.();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 relative">
        {hasCloseButton && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
          >
            ✕
          </button>
        )}

        <div className="text-left">
          <h2 className="text-xl font-bold text-gray-900 mb-4">{title}</h2>

          {imageSrc && (
            <div
              className="mb-4 flex justify-center"
              style={{
                transform: `translate(${imagePosition.x}px, ${imagePosition.y}px)`,
              }}
            >
              <div
                className="bg-gray-200 rounded-lg flex items-center justify-center text-4xl"
                style={{
                  width: imageSize.width,
                  height: imageSize.height,
                }}
              >
                👋
              </div>
            </div>
          )}

          {description && <p className="text-gray-600 mb-6">{description}</p>}

          <div className="flex gap-3 justify-end">
            {type === 'double' && (
              <button
                onClick={handleSecondaryClick}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {secondaryButtonText}
              </button>
            )}
            <button
              onClick={handlePrimaryClick}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              {primaryButtonText}
            </button>
          </div>
        </div>
      </div>
    </div>
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
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
      >
        로그아웃 모달 열기
      </button>
      <MockLogoutModal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

const meta: Meta<typeof LogoutModalWrapper> = {
  title: 'Mypage/LogoutModal',
  component: LogoutModalWrapper,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    onClose: { action: 'modal closed' },
    onPrimaryClick: { action: 'primary button clicked' },
    onSecondaryClick: { action: 'secondary button clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: '로그아웃',
    description: '정말 로그아웃하시겠습니까?',
    primaryButtonText: '확인',
    secondaryButtonText: '취소',
    type: 'double',
  },
};

export const SingleButton: Story = {
  args: {
    title: '로그아웃',
    description: '정말 로그아웃하시겠습니까?',
    primaryButtonText: '로그아웃',
    type: 'single',
  },
};

export const WithImage: Story = {
  args: {
    title: '로그아웃',
    description: '정말 로그아웃하시겠습니까?',
    primaryButtonText: '확인',
    secondaryButtonText: '취소',
    type: 'double',
    imageSrc: 'mock-image',
    imagePosition: { x: 0, y: 0 },
    imageSize: { width: 100, height: 100 },
  },
};

export const WithCloseButton: Story = {
  args: {
    title: '로그아웃',
    description: '정말 로그아웃하시겠습니까?',
    primaryButtonText: '확인',
    secondaryButtonText: '취소',
    type: 'double',
    hasCloseButton: true,
  },
};

export const CustomText: Story = {
  args: {
    title: '계정 종료',
    description: '현재 세션을 종료하고 로그인 페이지로 이동합니다.',
    primaryButtonText: '세션 종료',
    secondaryButtonText: '취소',
    type: 'double',
  },
};

export const LongDescription: Story = {
  args: {
    title: '로그아웃',
    description:
      '정말로 로그아웃하시겠습니까? 로그아웃하면 현재 진행 중인 모든 작업이 저장되지 않을 수 있으며, 다시 로그인해야 합니다.',
    primaryButtonText: '로그아웃',
    secondaryButtonText: '취소',
    type: 'double',
  },
};
