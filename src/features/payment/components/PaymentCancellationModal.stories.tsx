import type { Meta, StoryObj } from '@storybook/nextjs';
import React, { useState } from 'react';

import { Button } from '@/shared/ui';

import { PaymentCancellationModal } from './PaymentCancellationModal';

const meta: Meta<typeof PaymentCancellationModal> = {
  title: 'Components/Payment/PaymentCancellationModal',
  component: PaymentCancellationModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '결제 과정에서 페이지를 벗어날 때 나타나는 확인 모달입니다. 자산 연결 취소에 대한 경고를 표시합니다.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof PaymentCancellationModal>;

const InteractiveDemo = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCancel = () => {
    alert('취소 선택');
    setIsOpen(false);
  };

  const handleConfirm = () => {
    alert('확인 선택 - 자산 연결 취소');
    setIsOpen(false);
  };

  return (
    <div className="space-y-4">
      <Button onClick={() => setIsOpen(true)}>결제 취소 모달 열기</Button>

      <PaymentCancellationModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      />
    </div>
  );
};

export const Default: Story = {
  render: () => <InteractiveDemo />,
  parameters: {
    docs: {
      description: {
        story: '결제 과정 중 페이지를 나가려고 할 때 표시되는 확인 모달입니다.',
      },
    },
  },
};

export const StaticView: Story = {
  args: {
    isOpen: true,
    onClose: () => alert('Close'),
    onCancel: () => alert('Cancel'),
    onConfirm: () => alert('Confirm'),
  },
  parameters: {
    docs: {
      description: {
        story: '모달의 정적 상태를 확인할 수 있는 예시입니다.',
      },
    },
  },
};
