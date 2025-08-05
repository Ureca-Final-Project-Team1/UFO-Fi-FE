import type { Meta, StoryObj } from '@storybook/react';

import { PurchaseDetail } from '@/backend/services/mypage/purchaseDetail';

import { ReceiptContent } from './ReceiptContent';

const meta: Meta<typeof ReceiptContent> = {
  title: 'Mypage/TradeDetail/ReceiptContent',
  component: ReceiptContent,
  parameters: {
    layout: 'padded',
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    purchaseDetail: {
      control: { type: 'object' },
      description: '구매 상세 정보',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ReceiptContent>;

export const Default: Story = {
  args: {
    purchaseDetail: {
      postId: 1,
      purchaseHistoryId: 1,
      carrier: 'SKT',
      totalGB: 10,
      createdAt: '2024-01-15T10:30:00Z',
      totalZet: 1500,
      title: 'SKT 5G 데이터 판매',
      mobileDataType: '5G',
    } as PurchaseDetail,
  },
  render: (args) => (
    <div className="w-full bg-gray-900 p-4">
      <div className="max-w-md mx-auto">
        <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
          <h2 className="text-white text-base font-semibold mb-4">영수증 내용</h2>
          <ReceiptContent {...args} />
        </div>
      </div>
    </div>
  ),
};

export const KT: Story = {
  args: {
    purchaseDetail: {
      postId: 2,
      purchaseHistoryId: 2,
      carrier: 'KT',
      totalGB: 5,
      createdAt: '2024-01-16T14:20:00Z',
      totalZet: 800,
      title: 'KT 5G 데이터 판매',
      mobileDataType: '5G',
    } as PurchaseDetail,
  },
  render: (args) => (
    <div className="w-full bg-gray-900 p-4">
      <div className="max-w-md mx-auto">
        <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
          <h2 className="text-white text-base font-semibold mb-4">KT 영수증</h2>
          <ReceiptContent {...args} />
        </div>
      </div>
    </div>
  ),
};

export const LGU: Story = {
  args: {
    purchaseDetail: {
      postId: 3,
      purchaseHistoryId: 3,
      carrier: 'LG U+',
      totalGB: 20,
      createdAt: '2024-01-17T09:15:00Z',
      totalZet: 2500,
      title: 'LG U+ 5G 데이터 판매',
      mobileDataType: '5G',
    } as PurchaseDetail,
  },
  render: (args) => (
    <div className="w-full bg-gray-900 p-4">
      <div className="max-w-md mx-auto">
        <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
          <h2 className="text-white text-base font-semibold mb-4">LG U+ 영수증</h2>
          <ReceiptContent {...args} />
        </div>
      </div>
    </div>
  ),
};

export const LargeAmount: Story = {
  args: {
    purchaseDetail: {
      postId: 4,
      purchaseHistoryId: 4,
      carrier: 'SKT',
      totalGB: 100,
      createdAt: '2024-01-18T16:45:00Z',
      totalZet: 10000,
      title: 'SKT 5G 대용량 데이터 판매',
      mobileDataType: '5G',
    } as PurchaseDetail,
  },
  render: (args) => (
    <div className="w-full bg-gray-900 p-4">
      <div className="max-w-md mx-auto">
        <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
          <h2 className="text-white text-base font-semibold mb-4">대용량 영수증</h2>
          <ReceiptContent {...args} />
        </div>
      </div>
    </div>
  ),
};

export const Desktop: Story = {
  args: {
    purchaseDetail: {
      postId: 1,
      purchaseHistoryId: 1,
      carrier: 'SKT',
      totalGB: 10,
      createdAt: '2024-01-15T10:30:00Z',
      totalZet: 1500,
      title: 'SKT 5G 데이터 판매',
      mobileDataType: '5G',
    } as PurchaseDetail,
  },
  render: (args) => (
    <div className="w-full bg-gray-900 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
          <h2 className="text-white text-base font-semibold mb-4">데스크톱 영수증 내용</h2>
          <ReceiptContent {...args} />
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
