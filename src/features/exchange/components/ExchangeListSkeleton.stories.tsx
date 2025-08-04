import type { Meta, StoryObj } from '@storybook/react';

import { ExchangeListSkeleton } from './ExchangeListSkeleton';

const meta: Meta<typeof ExchangeListSkeleton> = {
  title: 'Exchange/ExchangeListSkeleton',
  component: ExchangeListSkeleton,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithBackground: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: '배경색이 있는 환경에서 스켈레톤이 어떻게 보이는지 확인할 수 있습니다.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="bg-gray-900 p-4 min-h-screen">
        <Story />
      </div>
    ),
  ],
};
