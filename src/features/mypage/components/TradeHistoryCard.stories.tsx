import type { Meta, StoryObj } from '@storybook/nextjs';

import { TradeHistoryCard } from './TradeHistoryCard';

const meta: Meta<typeof TradeHistoryCard> = {
  title: 'components/mypage/TradeHistoryCard',
  component: TradeHistoryCard,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TradeHistoryCard>;

export const Default: Story = {
  args: {
    carrier: 'KT',
    message: '데이터 급처분합니다.',
    state: 'selling',
    dataAmount: 1,
    price: 10,
  },
};

export const SoldOut: Story = {
  args: {
    carrier: 'SKT',
    message: '지금은 거래 완료!',
    state: 'sold',
    dataAmount: 2,
    price: 15,
  },
};
