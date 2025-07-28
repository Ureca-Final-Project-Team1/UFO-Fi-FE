import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import { NotificationDropdown } from './NotificationDropdown';

const meta: Meta<typeof NotificationDropdown> = {
  title: 'UI/NotificationDropdown',
  component: NotificationDropdown,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '알림 드롭다운 컴포넌트입니다. shadcn/ui의 DropdownMenu를 기반으로 구현되었으며, ' +
          '실시간 알림 표시, 읽음 처리, 다양한 알림 타입을 지원합니다.',
      },
    },
  },
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: '드롭다운 열림 상태',
    },
    onToggle: {
      action: 'toggle',
      description: '드롭다운 토글 함수',
    },
    onNotificationClick: {
      action: 'notification-click',
      description: '알림 클릭 핸들러',
    },
    onMarkAllRead: {
      action: 'mark-all-read',
      description: '모두 읽음 처리 핸들러',
    },
    className: {
      control: 'text',
      description: '추가 CSS 클래스',
    },
  },
  decorators: [
    (Story) => (
      <div className="bg-primary-700 p-8 rounded-lg">
        <div className="flex justify-end">
          <Story />
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof NotificationDropdown>;

// 기본 사용법
export const Default: Story = {
  args: {
    isOpen: false,
    onToggle: () => {},
    onNotificationClick: () => {
      alert('Notification clicked:');
    },
    onMarkAllRead: () => {
      alert('Mark all as read');
    },
  },
};

// TopNav에서 사용하는 예시
const TopNavExample = () => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  return (
    <div className="w-full">
      <header className="h-12 bg-primary-700 shadow-sm flex items-center px-4">
        <div className="flex items-center justify-between w-full">
          <NotificationDropdown
            isOpen={isNotificationOpen}
            onToggle={() => setIsNotificationOpen(!isNotificationOpen)}
            onNotificationClick={() => {
              alert('TopNav 알림 클릭');
            }}
            onMarkAllRead={() => {
              alert('TopNav 모든 알림 읽음');
            }}
          />
        </div>
      </header>
    </div>
  );
};

export const InTopNav: Story = {
  render: () => <TopNavExample />,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: '왼쪽 상단의 알림 아이콘을 클릭해보세요.',
      },
    },
  },
};
