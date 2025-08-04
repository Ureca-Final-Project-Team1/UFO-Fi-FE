import type { Meta, StoryObj } from '@storybook/react';

import { ExchangeListSkeleton } from './ExchangeListSkeleton';

const meta: Meta<typeof ExchangeListSkeleton> = {
  title: 'Exchange/ExchangeListSkeleton',
  component: ExchangeListSkeleton,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ExchangeListSkeleton>;

export const Default: Story = {
  args: {},
};

export const WithBackground: Story = {
  args: {},
  decorators: [
    (Story) => (
      <div className="bg-gray-900 p-4">
        <Story />
      </div>
    ),
  ],
};
