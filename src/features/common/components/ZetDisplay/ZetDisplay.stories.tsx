import type { Meta, StoryObj } from '@storybook/react';

import { ICON_PATHS } from '@/constants/icons';
import { Icon } from '@/shared';

import { ZetDisplay } from './ZetDisplay';

const meta: Meta<typeof ZetDisplay> = {
  title: 'Common/ZetDisplay',
  component: ZetDisplay,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    amount: { control: { type: 'number' } },
    showUnit: { control: { type: 'boolean' } },
    size: { control: { type: 'select' }, options: ['sm', 'md', 'lg'] },
  },
};

export default meta;
type Story = StoryObj<typeof ZetDisplay>;

export const Default: Story = {
  args: {
    amount: 1000,
    showUnit: true,
    size: 'md',
  },
  render: (args) => (
    <div className="h-full flex flex-col bg-gray-900">
      <div className="px-4 pt-4">
        {/* 헤더 - TopNav 스타일 */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
              <Icon name="ChevronLeft" className="w-5 h-5 text-white" />
            </button>
            <h1 className="text-white text-lg font-bold">ZET 표시 테스트</h1>
          </div>

          {/* ZET 표시 - TopNav 스타일 */}
          <div className="flex items-center gap-2">
            <Icon src={ICON_PATHS['COIN']} className="w-5 h-5" />
            <ZetDisplay {...args} />
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
          <h2 className="text-white text-base font-semibold mb-2">ZET 표시 예제</h2>
          <div className="flex items-center gap-4">
            <ZetDisplay {...args} />
            <span className="text-gray-300 text-sm">← 이렇게 표시됩니다</span>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const Small: Story = {
  args: {
    amount: 500,
    showUnit: true,
    size: 'sm',
  },
  render: (args) => (
    <div className="h-full flex flex-col bg-gray-900">
      <div className="px-4 pt-4">
        {/* 헤더 - TopNav 스타일 */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
              <Icon name="ChevronLeft" className="w-5 h-5 text-white" />
            </button>
            <h1 className="text-white text-lg font-bold">ZET 표시 테스트</h1>
          </div>

          {/* ZET 표시 - TopNav 스타일 */}
          <div className="flex items-center gap-2">
            <Icon src={ICON_PATHS['COIN']} className="w-5 h-5" />
            <ZetDisplay {...args} />
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
          <h2 className="text-white text-base font-semibold mb-2">작은 크기 ZET 표시</h2>
          <div className="flex items-center gap-4">
            <ZetDisplay {...args} />
            <span className="text-gray-300 text-sm">← 작은 크기</span>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const Large: Story = {
  args: {
    amount: 50000,
    showUnit: true,
    size: 'lg',
  },
  render: (args) => (
    <div className="h-full flex flex-col bg-gray-900">
      <div className="px-4 pt-4">
        {/* 헤더 - TopNav 스타일 */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
              <Icon name="ChevronLeft" className="w-5 h-5 text-white" />
            </button>
            <h1 className="text-white text-lg font-bold">ZET 표시 테스트</h1>
          </div>

          {/* ZET 표시 - TopNav 스타일 */}
          <div className="flex items-center gap-2">
            <Icon src={ICON_PATHS['COIN']} className="w-5 h-5" />
            <ZetDisplay {...args} />
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
          <h2 className="text-white text-base font-semibold mb-2">큰 크기 ZET 표시</h2>
          <div className="flex items-center gap-4">
            <ZetDisplay {...args} />
            <span className="text-gray-300 text-sm">← 큰 크기</span>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const WithoutUnit: Story = {
  args: {
    amount: 2500,
    showUnit: false,
    size: 'md',
  },
  render: (args) => (
    <div className="h-full flex flex-col bg-gray-900">
      <div className="px-4 pt-4">
        {/* 헤더 - TopNav 스타일 */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
              <Icon name="ChevronLeft" className="w-5 h-5 text-white" />
            </button>
            <h1 className="text-white text-lg font-bold">ZET 표시 테스트</h1>
          </div>

          {/* ZET 표시 - TopNav 스타일 */}
          <div className="flex items-center gap-2">
            <Icon src={ICON_PATHS['COIN']} className="w-5 h-5" />
            <ZetDisplay {...args} />
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
          <h2 className="text-white text-base font-semibold mb-2">단위 없이 표시</h2>
          <div className="flex items-center gap-4">
            <ZetDisplay {...args} />
            <span className="text-gray-300 text-sm">← 단위 없이</span>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const AllSizes: Story = {
  args: {
    amount: 10000,
    showUnit: true,
    size: 'md',
  },
  render: (args) => (
    <div className="h-full flex flex-col bg-gray-900">
      <div className="px-4 pt-4">
        {/* 헤더 - TopNav 스타일 */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
              <Icon name="ChevronLeft" className="w-5 h-5 text-white" />
            </button>
            <h1 className="text-white text-lg font-bold">ZET 표시 테스트</h1>
          </div>

          {/* ZET 표시 - TopNav 스타일 */}
          <div className="flex items-center gap-2">
            <Icon src={ICON_PATHS['COIN']} className="w-5 h-5" />
            <ZetDisplay {...args} />
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
            <h2 className="text-white text-base font-semibold mb-2">모든 크기 비교</h2>
            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <ZetDisplay amount={1000} showUnit={true} size="sm" />
                <span className="text-gray-300 text-sm">← 작은 크기 (sm)</span>
              </div>
              <div className="flex items-center gap-4">
                <ZetDisplay amount={1000} showUnit={true} size="md" />
                <span className="text-gray-300 text-sm">← 중간 크기 (md)</span>
              </div>
              <div className="flex items-center gap-4">
                <ZetDisplay amount={1000} showUnit={true} size="lg" />
                <span className="text-gray-300 text-sm">← 큰 크기 (lg)</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
            <h2 className="text-white text-base font-semibold mb-2">다양한 금액</h2>
            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <ZetDisplay amount={100} showUnit={true} size="md" />
                <span className="text-gray-300 text-sm">← 100 ZET</span>
              </div>
              <div className="flex items-center gap-4">
                <ZetDisplay amount={99999} showUnit={true} size="md" />
                <span className="text-gray-300 text-sm">← 99,999+ ZET (최대 표시)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const Desktop: Story = {
  args: {
    amount: 1000,
    showUnit: true,
    size: 'md',
  },
  render: (args) => (
    <div className="h-full flex flex-col bg-gray-900">
      <div className="px-4 pt-4 max-w-2xl mx-auto w-full">
        {/* 헤더 - TopNav 스타일 */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
              <Icon name="ChevronLeft" className="w-5 h-5 text-white" />
            </button>
            <h1 className="text-white text-lg font-bold">데스크톱 ZET 표시 테스트</h1>
          </div>

          {/* ZET 표시 - TopNav 스타일 */}
          <div className="flex items-center gap-2">
            <Icon src={ICON_PATHS['COIN']} className="w-5 h-5" />
            <ZetDisplay {...args} />
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
          <h2 className="text-white text-base font-semibold mb-2">데스크톱 ZET 표시</h2>
          <div className="flex items-center gap-4">
            <ZetDisplay {...args} />
            <span className="text-gray-300 text-sm">← 데스크톱에서의 표시</span>
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
