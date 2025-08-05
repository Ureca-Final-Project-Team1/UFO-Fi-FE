import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import { Button } from '@/shared';

import { PaymentCancellationModal } from './PaymentCancellationModal';

const meta: Meta<typeof PaymentCancellationModal> = {
  title: 'Payment/PaymentCancellationModal',
  component: PaymentCancellationModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  argTypes: {
    isOpen: {
      control: { type: 'boolean' },
      description: '모달 열림 상태',
    },
    onClose: {
      action: 'closed',
      description: '모달 닫기 핸들러',
    },
    onCancel: {
      action: 'cancelled',
      description: '취소 버튼 핸들러 (페이지 유지)',
    },
    onConfirm: {
      action: 'confirmed',
      description: '확인 버튼 핸들러 (자산 연결 취소)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof PaymentCancellationModal>;

// Interactive Demo Component
const InteractiveDemo = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCancel = () => {
    console.warn('취소 선택 - 결제 페이지 유지');
    setIsOpen(false);
  };

  const handleConfirm = () => {
    console.warn('확인 선택 - 자산 연결 취소됨');
    setIsOpen(false);
  };

  return (
    <div
      className="w-full bg-gray-900 p-4"
      style={{
        minHeight: '100vh',
        overflow: 'auto',
        maxHeight: 'none',
        height: 'auto',
      }}
    >
      <div className="max-w-md mx-auto">
        <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-gray-700">
          <h2 className="text-white text-lg font-semibold mb-4">결제 취소 경고 모달</h2>
          <p className="text-gray-300 text-sm mb-6">
            결제 과정 중 페이지를 나가려고 할 때 표시되는 경고 모달입니다.
          </p>

          <div className="space-y-4">
            <Button onClick={() => setIsOpen(true)} className="w-full" variant="destructive">
              결제 취소 경고 모달 열기
            </Button>

            <PaymentCancellationModal
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              onCancel={handleCancel}
              onConfirm={handleConfirm}
            />
          </div>

          <div className="mt-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
            <p className="text-red-300 text-sm">
              <strong>⚠️ 주의:</strong> 이 모달은 자산 연결이 취소될 수 있음을 경고합니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Default: Story = {
  render: () => <InteractiveDemo />,
  parameters: {
    docs: {
      description: {
        story:
          '결제 과정 중 페이지를 나가려고 할 때 표시되는 경고 모달입니다. 자산 연결 취소에 대한 경고를 표시합니다.',
      },
    },
  },
};

export const StaticView: Story = {
  render: () => (
    <div
      className="w-full bg-gray-900 p-4"
      style={{
        minHeight: '100vh',
        overflow: 'auto',
        maxHeight: 'none',
        height: 'auto',
      }}
    >
      <PaymentCancellationModal
        isOpen={true}
        onClose={() => console.warn('Close')}
        onCancel={() => console.warn('Cancel - 페이지 유지')}
        onConfirm={() => console.warn('Confirm - 자산 연결 취소')}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '모달의 정적 상태를 확인할 수 있는 예시입니다. 자산 연결 취소 경고가 표시됩니다.',
      },
    },
  },
};

export const Desktop: Story = {
  render: () => <InteractiveDemo />,
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
    docs: {
      description: {
        story: '데스크톱 환경에서의 결제 취소 경고 모달 표시 예시입니다.',
      },
    },
  },
};
