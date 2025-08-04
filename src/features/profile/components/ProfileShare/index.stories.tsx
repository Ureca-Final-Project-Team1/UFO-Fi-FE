import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

// Mock ProfileShare for Storybook
const MockProfileShare = ({ isOpen = false }: { isOpen?: boolean }) => {
  const [modalOpen, setModalOpen] = useState(isOpen);

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleOpen = () => {
    setModalOpen(true);
  };

  return (
    <div className="bg-background p-6">
      <button
        onClick={handleOpen}
        className="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90"
      >
        프로필 공유 모달 열기
      </button>

      {modalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9998]">
          <div className="fixed left-[50%] top-[50%] z-[9999] translate-x-[-50%] translate-y-[-50%] bg-white shadow-2xl overflow-hidden w-[380px] max-w-[90vw] rounded-lg pt-12 pb-6 px-6">
            {/* 닫기 버튼 */}
            <button
              onClick={handleClose}
              className="absolute z-50 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200 w-8 h-8 flex items-center justify-center top-4 right-4"
              aria-label="모달 닫기"
            >
              <span className="text-gray-600 text-sm">✕</span>
            </button>

            {/* 헤더 */}
            <div className="text-center mb-6">
              <h3 className="text-gray-900 font-semibold text-lg mb-2">공유하기</h3>
              <p className="text-gray-600 text-sm">SNS를 통해서 프로필을 공유해보세요!</p>
            </div>

            <div className="space-y-6">
              {/* QR 코드 */}
              <div className="flex justify-center">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="w-[200px] h-[200px] bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-gray-500 text-sm">QR Code</span>
                  </div>
                </div>
              </div>

              {/* 공유 버튼들 */}
              <div className="space-y-3">
                <button className="w-full bg-[var(--color-kakao-button)] text-black py-3 rounded hover:bg-[var(--color-kakao-button)]/90">
                  카카오톡으로 공유
                </button>
                <button className="w-full bg-[var(--color-status-positive)] text-white py-3 rounded hover:bg-[var(--color-status-positive)]/90">
                  카카오스토리로 공유
                </button>
                <button className="w-full bg-[#1877f2] text-white py-3 rounded hover:bg-[#1877f2]/90">
                  페이스북으로 공유
                </button>
                <button className="w-full bg-secondary text-secondary-foreground py-3 rounded hover:bg-secondary/90">
                  링크 복사
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const meta: Meta<typeof MockProfileShare> = {
  title: 'Profile/ProfileShare',
  component: MockProfileShare,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: { type: 'boolean' },
      description: '모달 열림 상태',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: false,
  },
};

export const ModalOpen: Story = {
  args: {
    isOpen: true,
  },
};
