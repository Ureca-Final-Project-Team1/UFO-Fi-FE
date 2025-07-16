import type { Meta, StoryObj } from '@storybook/nextjs';
import React, { useState } from 'react';

import { Button } from '@/shared/ui';

import { SimplePasswordModal } from './SimplePasswordModal';

const meta: Meta<typeof SimplePasswordModal> = {
  title: 'Components/Payment/SimplePasswordModal',
  component: SimplePasswordModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '간편 비밀번호 입력 실패 시 나타나는 모달입니다. 실패 횟수에 따라 다른 메시지를 표시합니다.',
      },
    },
  },
  argTypes: {
    status: {
      control: 'select',
      options: ['single', 'multiple', 'reset'],
      description: '비밀번호 실패 상태',
    },
    failureCount: {
      control: { type: 'number', min: 1, max: 5 },
      description: '실패 횟수',
    },
  },
};

export default meta;
type Story = StoryObj<typeof SimplePasswordModal>;

const InteractiveDemo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<'single' | 'multiple' | 'reset'>('single');
  const [failureCount, setFailureCount] = useState(1);

  const openModal = (newStatus: typeof status, count: number) => {
    setStatus(newStatus);
    setFailureCount(count);
    setIsOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-2">
        <Button onClick={() => openModal('single', 1)}>1회 실패 모달</Button>
        <Button onClick={() => openModal('multiple', 4)}>4회 실패 모달 (경고)</Button>
        <Button onClick={() => openModal('reset', 5)}>5회 실패 모달 (재설정)</Button>
      </div>

      <SimplePasswordModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        status={status}
        failureCount={failureCount}
      />
    </div>
  );
};

export const Interactive: Story = {
  render: () => <InteractiveDemo />,
  parameters: {
    docs: {
      description: {
        story: '다양한 실패 상태의 모달을 확인할 수 있는 인터랙티브 예시입니다.',
      },
    },
  },
};

export const SingleFailure: Story = {
  args: {
    isOpen: true,
    onClose: () => alert('Close'),
    status: 'single',
    failureCount: 1,
  },
  parameters: {
    docs: {
      description: {
        story: '1회 비밀번호 입력 실패 시 표시되는 모달입니다.',
      },
    },
  },
};

export const MultipleFailures: Story = {
  args: {
    isOpen: true,
    onClose: () => alert('Close'),
    status: 'multiple',
    failureCount: 4,
  },
  parameters: {
    docs: {
      description: {
        story: '4회 비밀번호 입력 실패 시 재설정 경고를 포함한 모달입니다.',
      },
    },
  },
};

export const ResetRequired: Story = {
  args: {
    isOpen: true,
    onClose: () => alert('Close'),
    status: 'reset',
    failureCount: 5,
  },
  parameters: {
    docs: {
      description: {
        story: '5회 실패로 비밀번호 재설정이 필요한 상태의 모달입니다.',
      },
    },
  },
};
