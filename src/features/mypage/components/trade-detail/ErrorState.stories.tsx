import type { Meta, StoryObj } from '@storybook/react';

import { ErrorState } from './ErrorState';

const meta: Meta<typeof ErrorState> = {
  title: 'Mypage/TradeDetail/ErrorState',
  component: ErrorState,
  parameters: {
    layout: 'padded',
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    error: {
      control: { type: 'text' },
      description: '에러 메시지',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ErrorState>;

export const Default: Story = {
  args: {
    error: '구매 내역을 불러올 수 없습니다.',
  },
  render: (args) => (
    <div className="w-full bg-gray-900 p-4">
      <div className="max-w-md mx-auto">
        <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
          <h2 className="text-white text-base font-semibold mb-4">에러 상태</h2>
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <div className="text-red-500 text-4xl mb-4">❌</div>
              <div className="text-red-500 text-lg">{args.error}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const NetworkError: Story = {
  args: {
    error: '네트워크 연결을 확인해주세요.',
  },
  render: (args) => (
    <div className="w-full bg-gray-900 p-4">
      <div className="max-w-md mx-auto">
        <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
          <h2 className="text-white text-base font-semibold mb-4">네트워크 에러</h2>
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <div className="text-red-500 text-4xl mb-4">🌐</div>
              <div className="text-red-500 text-lg">{args.error}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const NotFoundError: Story = {
  args: {
    error: '해당 구매 내역을 찾을 수 없습니다.',
  },
  render: (args) => (
    <div className="w-full bg-gray-900 p-4">
      <div className="max-w-md mx-auto">
        <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
          <h2 className="text-white text-base font-semibold mb-4">찾을 수 없음</h2>
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <div className="text-red-500 text-4xl mb-4">🔍</div>
              <div className="text-red-500 text-lg">{args.error}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const Desktop: Story = {
  args: {
    error: '구매 내역을 불러올 수 없습니다.',
  },
  render: (args) => (
    <div className="w-full bg-gray-900 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
          <h2 className="text-white text-base font-semibold mb-4">데스크톱 에러 상태</h2>
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <div className="text-red-500 text-4xl mb-4">❌</div>
              <div className="text-red-500 text-lg">{args.error}</div>
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
