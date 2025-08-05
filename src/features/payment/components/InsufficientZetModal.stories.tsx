import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import { Button } from '@/shared';

import { InsufficientZetModal } from './InsufficientZetModal';

const meta: Meta<typeof InsufficientZetModal> = {
  title: 'Payment/InsufficientZetModal',
  component: InsufficientZetModal,
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
      description: '취소 버튼 핸들러 (충전 취소)',
    },
    onGoToCharge: {
      action: 'goToCharge',
      description: '확인 버튼 핸들러 (충전 페이지로 이동)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof InsufficientZetModal>;

// Interactive Demo Component
const InteractiveDemo = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCancel = () => {
    console.warn('취소 선택 - 충전 취소');
    setIsOpen(false);
  };

  const handleGoToCharge = () => {
    console.warn('확인 선택 - 충전 페이지로 이동');
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
          <h2 className="text-white text-lg font-semibold mb-4">ZET 부족 충전 유도 모달</h2>
          <p className="text-gray-300 text-sm mb-6">
            보유 ZET가 부족할 때 충전 페이지로 이동을 유도하는 모달입니다.
          </p>

          <div className="space-y-4">
            <Button onClick={() => setIsOpen(true)} className="w-full" variant="default">
              ZET 부족 충전 유도 모달 열기
            </Button>

            <InsufficientZetModal
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              onCancel={handleCancel}
              onGoToCharge={handleGoToCharge}
            />
          </div>

          <div className="mt-6 p-4 bg-blue-500/20 border border-blue-500/30 rounded-lg">
            <p className="text-blue-300 text-sm">
              <strong>💡 정보:</strong> 이 모달은 사용자가 ZET를 충전하도록 유도합니다.
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
          'ZET 부족 시 충전을 유도하는 모달의 인터랙티브 예시입니다. 외계인 캐릭터가 상단에 표시됩니다.',
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
      <InsufficientZetModal
        isOpen={true}
        onClose={() => console.warn('Close')}
        onCancel={() => console.warn('Cancel - 충전 취소')}
        onGoToCharge={() => console.warn('Go to charge - 충전 페이지로 이동')}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          '모달의 정적 상태를 확인할 수 있는 예시입니다. 외계인 캐릭터가 텍스트 상단에 위치하며 ZET 충전을 유도합니다.',
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
        story: '데스크톱 환경에서의 ZET 부족 충전 유도 모달 표시 예시입니다.',
      },
    },
  },
};
