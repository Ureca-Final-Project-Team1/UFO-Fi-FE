import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Icon } from '@/shared';

import { HonorificSelector } from './HonorificSelector';
import { Honorific } from '../types/Achievement';

// Story Wrapper Components
const DefaultStoryWrapper = (args: {
  honorific?: Honorific[];
  selectedId?: number | null;
  onSelect?: (id: number) => void;
}) => {
  const [selectedId, setSelectedId] = useState(args.selectedId);

  return (
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
            <h2 className="text-white text-base font-semibold mb-4">칭호 선택기</h2>
            <HonorificSelector
              {...args}
              selectedId={selectedId}
              onSelect={(id) => setSelectedId(id)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const WithSelectionStoryWrapper = (args: {
  honorific?: Honorific[];
  selectedId?: number | null;
  onSelect?: (id: number) => void;
}) => {
  const [selectedId, setSelectedId] = useState(args.selectedId);

  return (
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
            <h2 className="text-white text-base font-semibold mb-4">선택된 칭호</h2>
            <HonorificSelector
              {...args}
              selectedId={selectedId}
              onSelect={(id) => setSelectedId(id)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const ManyHonorificsStoryWrapper = (args: {
  honorific?: Honorific[];
  selectedId?: number | null;
  onSelect?: (id: number) => void;
}) => {
  const [selectedId, setSelectedId] = useState(args.selectedId);

  return (
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
            <h2 className="text-white text-base font-semibold mb-4">다중 칭호 선택기</h2>
            <HonorificSelector
              {...args}
              selectedId={selectedId}
              onSelect={(id) => setSelectedId(id)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const DesktopStoryWrapper = (args: {
  honorific?: Honorific[];
  selectedId?: number | null;
  onSelect?: (id: number) => void;
}) => {
  const [selectedId, setSelectedId] = useState(args.selectedId);

  return (
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
            <h2 className="text-white text-base font-semibold mb-4">데스크톱 칭호 선택기</h2>
            <HonorificSelector
              {...args}
              selectedId={selectedId}
              onSelect={(id) => setSelectedId(id)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const meta: Meta<typeof HonorificSelector> = {
  title: 'Mypage/HonorificSelector',
  component: HonorificSelector,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    onSelect: { action: 'honorific selected' },
  },
};

export default meta;
type Story = StoryObj<typeof HonorificSelector>;

export const Default: Story = {
  args: {
    honorific: [
      { id: 1, name: '초보 탐험가', level: 0, isActive: false },
      { id: 2, name: '중급 탐험가', level: 1, isActive: false },
      { id: 3, name: '고급 탐험가', level: 2, isActive: false },
      { id: 4, name: '마스터 탐험가', level: 3, isActive: false },
    ] as Honorific[],
    selectedId: null,
  },
  render: (args) => <DefaultStoryWrapper {...args} />,
};

export const WithSelection: Story = {
  args: {
    honorific: [
      { id: 1, name: '초보 탐험가', level: 0, isActive: false },
      { id: 2, name: '중급 탐험가', level: 1, isActive: false },
      { id: 3, name: '고급 탐험가', level: 2, isActive: false },
      { id: 4, name: '마스터 탐험가', level: 3, isActive: false },
    ] as Honorific[],
    selectedId: 2,
  },
  render: (args) => <WithSelectionStoryWrapper {...args} />,
};

export const ManyHonorifics: Story = {
  args: {
    honorific: [
      { id: 1, name: '초보 탐험가', level: 0, isActive: false },
      { id: 2, name: '중급 탐험가', level: 1, isActive: false },
      { id: 3, name: '고급 탐험가', level: 2, isActive: false },
      { id: 4, name: '마스터 탐험가', level: 3, isActive: false },
      { id: 5, name: '전설의 탐험가', level: 4, isActive: false },
      { id: 6, name: '우주 탐험가', level: 5, isActive: false },
      { id: 7, name: '은하수 탐험가', level: 6, isActive: false },
      { id: 8, name: '우주 제왕', level: 7, isActive: false },
    ] as Honorific[],
    selectedId: null,
  },
  render: (args) => <ManyHonorificsStoryWrapper {...args} />,
};

export const Desktop: Story = {
  args: {
    honorific: [
      { id: 1, name: '초보 탐험가', level: 0, isActive: false },
      { id: 2, name: '중급 탐험가', level: 1, isActive: false },
      { id: 3, name: '고급 탐험가', level: 2, isActive: false },
      { id: 4, name: '마스터 탐험가', level: 3, isActive: false },
    ] as Honorific[],
    selectedId: 3,
  },
  render: (args) => <DesktopStoryWrapper {...args} />,
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};
