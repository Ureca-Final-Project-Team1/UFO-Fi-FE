import type { Meta, StoryObj } from '@storybook/nextjs';

import { TradeCard } from './TradeCard';

const meta: Meta<typeof TradeCard> = {
  title: 'UI/TradeCard',
  component: TradeCard,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TradeCard>;

export const Default: Story = {
  args: {
    carrier: 'kt',
    message: '데이터 급처분합니다.',
    state: 'selling',
    dataAmount: 1,
    price: 10,
  },
};

export const SoldOut: Story = {
  args: {
    carrier: 'skt',
    message: '지금은 거래 완료!',
    state: 'sold',
    dataAmount: 2,
    price: 15,
  },
};
