import type { Meta, StoryObj } from '@storybook/react';

import { CompletionImage } from './CompletionImage';

const meta: Meta<typeof CompletionImage> = {
  title: 'Mypage/TradeDetail/CompletionImage',
  component: CompletionImage,
  parameters: {
    layout: 'padded',
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CompletionImage>;

export const Default: Story = {
  render: () => (
    <div className="w-full bg-gray-900 p-4">
      <div className="max-w-md mx-auto">
        <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
          <h2 className="text-white text-base font-semibold mb-4">완료 이미지</h2>
          <div className="flex justify-center">
            <CompletionImage />
          </div>
        </div>
      </div>
    </div>
  ),
};

export const WithContent: Story = {
  render: () => (
    <div className="w-full bg-gray-900 p-4">
      <div className="max-w-md mx-auto">
        <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
          <h2 className="text-white text-base font-semibold mb-4">거래 완료</h2>
          <div className="text-center mb-4">
            <p className="text-white text-lg font-semibold mb-2">거래가 완료되었습니다!</p>
            <p className="text-gray-300 text-sm">축하합니다!</p>
          </div>
          <div className="flex justify-center">
            <CompletionImage />
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
          <h2 className="text-white text-base font-semibold mb-4">데스크톱 완료 이미지</h2>
          <div className="flex justify-center">
            <CompletionImage />
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
