import type { Meta, StoryObj } from '@storybook/react';

import { EmptyState } from './EmptyState';

const meta: Meta<typeof EmptyState> = {
  title: 'Mypage/TradeDetail/EmptyState',
  component: EmptyState,
  parameters: {
    layout: 'padded',
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
  render: () => (
    <div className="w-full bg-gray-900 p-4">
      <div className="max-w-md mx-auto">
        <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
          <h2 className="text-white text-base font-semibold mb-4">빈 상태</h2>
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <div className="text-gray-500 text-4xl mb-4">📭</div>
              <div className="text-gray-500 text-lg">구매 내역을 찾을 수 없습니다.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const WithCustomMessage: Story = {
  render: () => (
    <div className="w-full bg-gray-900 p-4">
      <div className="max-w-md mx-auto">
        <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
          <h2 className="text-white text-base font-semibold mb-4">거래 내역 없음</h2>
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <div className="text-gray-500 text-4xl mb-4">📋</div>
              <div className="text-gray-500 text-lg">거래 내역이 없습니다.</div>
              <div className="text-gray-400 text-sm mt-2">첫 거래를 시작해보세요!</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const Desktop: Story = {
  render: () => (
    <div className="w-full bg-gray-900 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
          <h2 className="text-white text-base font-semibold mb-4">데스크톱 빈 상태</h2>
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <div className="text-gray-500 text-4xl mb-4">📭</div>
              <div className="text-gray-500 text-lg">구매 내역을 찾을 수 없습니다.</div>
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
