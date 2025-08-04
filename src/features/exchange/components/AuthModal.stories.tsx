import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

// Mock AuthModal for Storybook (실제 Modal 컴포넌트와 동일한 구조)
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

  const handleConfirm = () => {
    onClose();
    // 실제로는 router.push('/exchange')를 호출하지만 스토리북에서는 onClose만
  };

  return (
    <div className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
      <div className="fixed left-[50%] top-[50%] z-[9999] translate-x-[-50%] translate-y-[-50%] bg-white shadow-2xl overflow-hidden duration-300 ease-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-105 w-[320px] max-w-[90vw] rounded-lg p-6">
        {/* 텍스트 영역 */}
        <div className="mb-6 flex-shrink-0 text-center">
          {title && <h2 className="body-20-bold text-gray-900 mb-3">{title}</h2>}
          {description && (
            <p className="body-16-regular text-gray-600 leading-relaxed whitespace-pre-line">
              {description}
            </p>
          )}
        </div>

        {/* 버튼 영역 */}
        <div className="flex gap-3 relative z-20 flex-shrink-0">
          <button
            onClick={handleConfirm}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer bg-primary-300 text-primary-text-dark font-bold text-[15px] hover:bg-primary-hover h-10 w-[200px] px-4 py-2 text-md w-full"
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
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    onClose: { action: 'modal closed' },
  },
};

export default meta;
type Story = StoryObj<typeof MockAuthModal>;

// Wrapper component to handle modal state
const AuthModalWrapper = (args: { isOpen?: boolean; title?: string; description?: string }) => {
  const [isOpen, setIsOpen] = useState(args.isOpen || false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer bg-primary-300 text-primary-text-dark font-bold text-[15px] hover:bg-primary-hover h-10 w-[200px] px-4 py-2 text-md"
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
    isOpen: false,
    title: '접근 권한 없음',
    description: '본인이 작성한 글만 수정할 수 있습니다.\n다시 확인해 주세요.',
  },
  decorators: [
    (Story) => (
      <div className="h-full flex flex-col bg-gray-900">
        <div className="px-4 pt-4">
          <Story />
        </div>
      </div>
    ),
  ],
};

export const CustomTitle: Story = {
  render: (args) => <AuthModalWrapper {...args} />,
  args: {
    isOpen: false,
    title: '로그인이 필요합니다',
    description: '이 기능을 사용하려면 로그인이 필요합니다.\n로그인 후 다시 시도해 주세요.',
  },
  decorators: [
    (Story) => (
      <div className="h-full flex flex-col bg-gray-900">
        <div className="px-4 pt-4">
          <Story />
        </div>
      </div>
    ),
  ],
};

export const LongDescription: Story = {
  render: (args) => <AuthModalWrapper {...args} />,
  args: {
    isOpen: false,
    title: '권한 부족',
    description:
      '이 작업을 수행할 권한이 없습니다.\n관리자에게 문의하거나 다른 계정으로 로그인해 주세요.\n\n자세한 내용은 고객센터를 통해 문의해 주시기 바랍니다.',
  },
  decorators: [
    (Story) => (
      <div className="h-full flex flex-col bg-gray-900">
        <div className="px-4 pt-4">
          <Story />
        </div>
      </div>
    ),
  ],
};
