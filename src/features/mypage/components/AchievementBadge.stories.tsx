import type { Meta, StoryObj, Decorator } from '@storybook/react';
import React from 'react';

import { Icon } from '@/shared';

import { AchievementBadge } from './AchievementBadge';

const AchievementPageDecorator: Decorator = (Story, context) => (
  <div className="w-full h-full flex flex-col bg-gray-900">
    <div className={`px-4 pt-4 ${context.parameters?.isDesktop ? 'max-w-2xl mx-auto w-full' : ''}`}>
      {/* 헤더 - Title 컴포넌트 대신 직접 구현 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <Icon name="ChevronLeft" className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-white text-lg font-bold">{context.parameters?.title || '업적'}</h1>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
          <h2 className="text-white text-base font-semibold mb-4">
            {context.parameters?.subtitle || '업적 배지'}
          </h2>
          <Story />
        </div>
      </div>
    </div>
  </div>
);

const meta: Meta<typeof AchievementBadge> = {
  title: 'Mypage/AchievementBadge',
  component: AchievementBadge,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'badge clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof AchievementBadge>;

export const Default: Story = {
  args: {
    i: 1,
    j: 1,
    isAchieve: true,
    achievementName: '첫 번째 업적',
    showName: true,
  },
  render: (args) => (
    <div className="flex justify-center">
      <AchievementBadge {...args} />
    </div>
  ),
  decorators: [AchievementPageDecorator],
};

export const Locked: Story = {
  args: {
    i: 1,
    j: 2,
    isAchieve: false,
    achievementName: '잠긴 업적',
    showName: true,
  },
  render: (args) => (
    <div className="flex justify-center">
      <AchievementBadge {...args} />
    </div>
  ),
  decorators: [AchievementPageDecorator],
  parameters: {
    subtitle: '잠긴 업적 배지',
  },
};

export const WithoutName: Story = {
  args: {
    i: 2,
    j: 1,
    isAchieve: true,
    showName: false,
  },
  render: (args) => (
    <div className="flex justify-center">
      <AchievementBadge {...args} />
    </div>
  ),
  decorators: [AchievementPageDecorator],
  parameters: {
    subtitle: '이름 없는 업적 배지',
  },
};

export const MultipleBadges: Story = {
  args: {
    i: 1,
    j: 1,
    isAchieve: true,
    achievementName: '업적 그리드',
    showName: true,
  },
  render: (args) => (
    <div className="grid grid-cols-3 gap-4 justify-items-center">
      <AchievementBadge {...args} i={1} j={1} isAchieve={true} achievementName="업적 1" />
      <AchievementBadge {...args} i={1} j={2} isAchieve={false} achievementName="업적 2" />
      <AchievementBadge {...args} i={1} j={3} isAchieve={true} achievementName="업적 3" />
      <AchievementBadge {...args} i={2} j={1} isAchieve={true} achievementName="업적 4" />
      <AchievementBadge {...args} i={2} j={2} isAchieve={false} achievementName="업적 5" />
      <AchievementBadge {...args} i={2} j={3} isAchieve={true} achievementName="업적 6" />
    </div>
  ),
  decorators: [AchievementPageDecorator],
  parameters: {
    subtitle: '업적 배지 그리드',
  },
};

export const Desktop: Story = {
  args: {
    i: 3,
    j: 3,
    isAchieve: true,
    achievementName: '데스크톱 업적',
    showName: true,
  },
  render: (args) => (
    <div className="flex justify-center">
      <AchievementBadge {...args} />
    </div>
  ),
  decorators: [AchievementPageDecorator],
  parameters: {
    title: '데스크톱 업적',
    subtitle: '데스크톱 업적 배지',
    isDesktop: true,
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};
