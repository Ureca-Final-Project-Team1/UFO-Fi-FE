import type { Meta, StoryObj } from '@storybook/react';

import { ExchangeList } from './ExchangeList';

const meta: Meta<typeof ExchangeList> = {
  title: 'Exchange/ExchangeList',
  component: ExchangeList,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: {
    onEdit: { action: 'edit clicked' },
    onDelete: { action: 'delete clicked' },
    onReport: { action: 'report clicked' },
    onPurchase: { action: 'purchase clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof ExchangeList>;

export const Default: Story = {
  args: {},
};

export const WithPurchaseLoading: Story = {
  args: {
    purchaseLoading: true,
  },
  decorators: [
    (Story) => (
      <div className="relative">
        <Story />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-white">구매 처리 중...</div>
        </div>
      </div>
    ),
  ],
};
