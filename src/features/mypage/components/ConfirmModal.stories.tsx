import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

// Mock ConfirmModal for Storybook
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
  if (!isOpen) return null;

  const handlePrimaryClick = () => {
    onPrimaryClick?.();
    if (redirectTo) {
      // Mock redirect functionality
    }
    onClose?.();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-4">{title}</h2>
          {description && <p className="text-gray-600 mb-6">{description}</p>}
          <div className="flex gap-3 justify-center">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              취소
            </button>
            <button
              onClick={handlePrimaryClick}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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
const ConfirmModalWrapper = (args: {
  title?: string;
  description?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  onClose?: () => void;
  redirectTo?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        모달 열기
      </button>
      <MockConfirmModal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

const meta: Meta<typeof ConfirmModalWrapper> = {
  title: 'Mypage/ConfirmModal',
  component: ConfirmModalWrapper,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    onClose: { action: 'modal closed' },
    onPrimaryClick: { action: 'primary button clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: '알림',
    description: '정말로 이 작업을 진행하시겠습니까?',
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

export const LongDescription: Story = {
  args: {
    title: '주의사항',
    description:
      '이 작업은 매우 중요한 작업입니다. 신중하게 결정하시기 바랍니다. 이 작업을 수행하면 기존 데이터가 변경되거나 삭제될 수 있습니다. 계속 진행하시겠습니까?',
    primaryButtonText: '계속 진행',
  },
};

export const NoDescription: Story = {
  args: {
    title: '작업 완료',
    primaryButtonText: '확인',
  },
};

export const CustomButtonText: Story = {
  args: {
    title: '사용자 정의',
    description: '버튼 텍스트를 사용자가 정의할 수 있습니다.',
    primaryButtonText: '사용자 정의 버튼',
  },
};
