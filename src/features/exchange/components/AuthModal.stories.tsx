import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

// Mock modal for Storybook
const MockAuthModal = ({
  isOpen,
  onClose,
  title = '접근 권한 없음',
  description = '본인이 작성한 글만 수정할 수 있습니다.\n다시 확인해 주세요.',
}: {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p className="text-gray-600 mb-6 whitespace-pre-line">{description}</p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            거래소로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
};

const meta: Meta<typeof MockAuthModal> = {
  title: 'Exchange/AuthModal',
  component: MockAuthModal,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    onClose: { action: 'modal closed' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Wrapper component to handle modal state
const AuthModalWrapper = (args: { isOpen?: boolean; title?: string; description?: string }) => {
  const [isOpen, setIsOpen] = useState(args.isOpen || false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        모달 열기
      </button>
      <MockAuthModal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

export const Default: Story = {
  render: (args) => <AuthModalWrapper {...args} />,
  args: {
    title: '접근 권한 없음',
    description: '본인이 작성한 글만 수정할 수 있습니다.\n다시 확인해 주세요.',
  },
};

export const CustomTitle: Story = {
  render: (args) => <AuthModalWrapper {...args} />,
  args: {
    title: '로그인이 필요합니다',
    description: '이 기능을 사용하려면 로그인이 필요합니다.',
  },
};

export const LongDescription: Story = {
  render: (args) => <AuthModalWrapper {...args} />,
  args: {
    title: '권한 부족',
    description:
      '이 작업을 수행하려면 관리자 권한이 필요합니다.\n현재 계정으로는 이 기능을 사용할 수 없습니다.\n관리자에게 문의하세요.',
  },
};
