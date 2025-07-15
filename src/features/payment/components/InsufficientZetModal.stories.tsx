import type { Meta, StoryObj } from '@storybook/nextjs';
import React, { useState } from 'react';

import { Button } from '@/shared/ui';

import { InsufficientZetModal } from './InsufficientZetModal';

const meta: Meta<typeof InsufficientZetModal> = {
  title: 'Components/Payment/InsufficientZetModal',
  component: InsufficientZetModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '보유 ZET가 부족할 때 충전 페이지로 이동을 유도하는 모달입니다. 외계인 캐릭터가 상단에 표시됩니다.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof InsufficientZetModal>;

const InteractiveDemo = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCancel = () => {
    alert('취소 선택 - 현재 페이지 유지');
    setIsOpen(false);
  };

  const handleGoToCharge = () => {
    alert('확인 선택 - 충전 페이지로 이동');
    setIsOpen(false);
  };

  return (
    <div className="space-y-4">
      <Button onClick={() => setIsOpen(true)}>ZET 부족 모달 열기</Button>

      <InsufficientZetModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onCancel={handleCancel}
        onGoToCharge={handleGoToCharge}
      />
    </div>
  );
};

export const Default: Story = {
  render: () => <InteractiveDemo />,
  parameters: {
    docs: {
      description: {
        story: 'ZET 부족 시 충전을 유도하는 모달의 인터랙티브 예시입니다.',
      },
    },
  },
};

export const StaticView: Story = {
  args: {
    isOpen: true,
    onClose: () => alert('Close'),
    onCancel: () => alert('Cancel'),
    onGoToCharge: () => alert('Go to charge'),
  },
  parameters: {
    docs: {
      description: {
        story:
          '모달의 정적 상태를 확인할 수 있는 예시입니다. 외계인 캐릭터가 텍스트 상단에 위치합니다.',
      },
    },
  },
};
