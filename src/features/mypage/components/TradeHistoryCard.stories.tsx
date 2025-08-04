import type { Meta, StoryObj } from '@storybook/react';

import { Carrier } from '@/backend/types/carrier';

import { TradeHistoryCard } from './TradeHistoryCard';

const meta: Meta<typeof TradeHistoryCard> = {
  title: 'Mypage/TradeHistoryCard',
  component: TradeHistoryCard,
  parameters: {
    layout: 'padded',
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'card clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof TradeHistoryCard>;

export const Default: Story = {
  args: {
    carrier: Carrier.KT,
    message: '데이터 급처분합니다.',
    state: 'selling',
    dataAmount: 1,
    price: 10,
  },
  render: (args) => (
    <div className="w-full bg-gray-900 p-4">
      <div className="max-w-md mx-auto">
        <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
          <h2 className="text-white text-base font-semibold mb-4">거래 내역 카드</h2>
          <TradeHistoryCard {...args} />
        </div>
      </div>
    </div>
  ),
};

export const SoldOut: Story = {
  args: {
    carrier: Carrier.SKT,
    message: '지금은 거래 완료!',
    state: 'sold',
    dataAmount: 2,
    price: 15,
  },
  render: (args) => (
    <div className="w-full bg-gray-900 p-4">
      <div className="max-w-md mx-auto">
        <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
          <h2 className="text-white text-base font-semibold mb-4">판매 완료 카드</h2>
          <TradeHistoryCard {...args} />
        </div>
      </div>
    </div>
  ),
};

export const Reported: Story = {
  args: {
    carrier: Carrier.LGU,
    message: '신고된 거래입니다.',
    state: 'reported',
    dataAmount: 3,
    price: 20,
  },
  render: (args) => (
    <div className="w-full bg-gray-900 p-4">
      <div className="max-w-md mx-auto">
        <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
          <h2 className="text-white text-base font-semibold mb-4">신고된 거래 카드</h2>
          <TradeHistoryCard {...args} />
        </div>
      </div>
    </div>
  ),
};

export const MultipleCards: Story = {
  args: {
    carrier: Carrier.KT,
    message: '데이터 급처분합니다.',
    state: 'selling',
    dataAmount: 1,
    price: 10,
  },
  render: (args) => (
    <div className="w-full bg-gray-900 p-4">
      <div className="max-w-md mx-auto">
        <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
          <h2 className="text-white text-base font-semibold mb-4">거래 내역 카드들</h2>
          <div className="flex flex-col gap-3">
            <TradeHistoryCard {...args} />
            <TradeHistoryCard
              carrier={Carrier.SKT}
              message="지금은 거래 완료!"
              state="sold"
              dataAmount={2}
              price={15}
            />
            <TradeHistoryCard
              carrier={Carrier.LGU}
              message="신고된 거래입니다."
              state="reported"
              dataAmount={3}
              price={20}
            />
          </div>
        </div>
      </div>
    </div>
  ),
};

export const Desktop: Story = {
  args: {
    carrier: Carrier.KT,
    message: '데이터 급처분합니다.',
    state: 'selling',
    dataAmount: 1,
    price: 10,
  },
  render: (args) => (
    <div className="w-full bg-gray-900 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
          <h2 className="text-white text-base font-semibold mb-4">데스크톱 거래 내역 카드</h2>
          <TradeHistoryCard {...args} />
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
