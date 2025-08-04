import type { Meta, StoryObj } from '@storybook/react';

import { Icon } from '@/shared';

import { HonorificChip } from './HonorificChip';
import { Honorific } from '../types/Achievement';

const meta: Meta<typeof HonorificChip> = {
  title: 'Mypage/HonorificChip',
  component: HonorificChip,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    onSelectHonorific: { action: 'honorific selected' },
  },
};

export default meta;
type Story = StoryObj<typeof HonorificChip>;

export const Default: Story = {
  args: {
    honorifics: [
      { id: 1, name: '초보 탐험가', level: 0, isActive: true },
      { id: 2, name: '중급 탐험가', level: 1, isActive: false },
      { id: 3, name: '고급 탐험가', level: 2, isActive: false },
      { id: 4, name: '마스터 탐험가', level: 3, isActive: false },
    ] as Honorific[],
  },
  render: (args) => (
    <div className="w-full h-full flex flex-col bg-gray-900">
      <div className="px-4 pt-4">
        {/* 헤더 - Title 컴포넌트 대신 직접 구현 */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
              <Icon name="ChevronLeft" className="w-5 h-5 text-white" />
            </button>
            <h1 className="text-white text-lg font-bold">마이페이지</h1>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
            <h2 className="text-white text-base font-semibold mb-4">칭호 칩</h2>
            <div className="flex justify-center">
              <HonorificChip {...args} />
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const MultipleHonorifics: Story = {
  args: {
    honorifics: [
      { id: 1, name: '초보 탐험가', level: 0, isActive: false },
      { id: 2, name: '중급 탐험가', level: 1, isActive: true },
      { id: 3, name: '고급 탐험가', level: 2, isActive: false },
      { id: 4, name: '마스터 탐험가', level: 3, isActive: false },
      { id: 5, name: '우주 여행자', level: 4, isActive: false },
    ] as Honorific[],
  },
  render: (args) => (
    <div className="w-full h-full flex flex-col bg-gray-900">
      <div className="px-4 pt-4">
        {/* 헤더 - Title 컴포넌트 대신 직접 구현 */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
              <Icon name="ChevronLeft" className="w-5 h-5 text-white" />
            </button>
            <h1 className="text-white text-lg font-bold">마이페이지</h1>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
            <h2 className="text-white text-base font-semibold mb-4">다중 칭호 칩</h2>
            <div className="flex justify-center">
              <HonorificChip {...args} />
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const NoHonorifics: Story = {
  args: {
    honorifics: [] as Honorific[],
  },
  render: (args) => (
    <div className="w-full h-full flex flex-col bg-gray-900">
      <div className="px-4 pt-4">
        {/* 헤더 - Title 컴포넌트 대신 직접 구현 */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
              <Icon name="ChevronLeft" className="w-5 h-5 text-white" />
            </button>
            <h1 className="text-white text-lg font-bold">마이페이지</h1>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
            <h2 className="text-white text-base font-semibold mb-4">칭호 없음</h2>
            <div className="flex justify-center">
              <HonorificChip {...args} />
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const Desktop: Story = {
  args: {
    honorifics: [
      { id: 1, name: '초보 탐험가', level: 0, isActive: false },
      { id: 2, name: '중급 탐험가', level: 1, isActive: false },
      { id: 3, name: '고급 탐험가', level: 2, isActive: true },
      { id: 4, name: '마스터 탐험가', level: 3, isActive: false },
    ] as Honorific[],
  },
  render: (args) => (
    <div className="w-full h-full flex flex-col bg-gray-900">
      <div className="px-4 pt-4 max-w-2xl mx-auto w-full">
        {/* 헤더 - Title 컴포넌트 대신 직접 구현 */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
              <Icon name="ChevronLeft" className="w-5 h-5 text-white" />
            </button>
            <h1 className="text-white text-lg font-bold">데스크톱 마이페이지</h1>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
            <h2 className="text-white text-base font-semibold mb-4">데스크톱 칭호 칩</h2>
            <div className="flex justify-center">
              <HonorificChip {...args} />
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};
