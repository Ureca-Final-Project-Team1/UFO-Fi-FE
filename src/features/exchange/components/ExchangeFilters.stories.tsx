import type { Meta, StoryObj } from '@storybook/react';

import { ExchangeFilters } from './ExchangeFilters';

const meta: Meta<typeof ExchangeFilters> = {
  title: 'Exchange/ExchangeFilters',
  component: ExchangeFilters,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ExchangeFilters>;

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
