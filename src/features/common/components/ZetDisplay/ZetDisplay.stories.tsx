import type { Meta, StoryObj } from '@storybook/react';

import { ZetDisplay } from './ZetDisplay';

const meta: Meta<typeof ZetDisplay> = {
  title: 'Common/ZetDisplay',
  component: ZetDisplay,
  parameters: {
    layout: 'padded',
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    amount: { control: { type: 'number' } },
    showUnit: { control: { type: 'boolean' } },
    size: { control: { type: 'select' }, options: ['sm', 'md', 'lg'] },
  },
};

export default meta;
type Story = StoryObj<typeof ZetDisplay>;

export const Default: Story = {
  args: {
    amount: 1000,
    showUnit: true,
    size: 'md',
  },
  decorators: [
    (Story) => (
      <div className="h-full flex flex-col bg-gray-900">
        <div className="px-4 pt-4">
          <h1 className="text-white text-lg font-bold mb-4">ZET 표시 테스트</h1>
          <div className="bg-gray-800 p-4 rounded-lg">
            <Story />
          </div>
        </div>
      </div>
    ),
  ],
};

export const Small: Story = {
  args: {
    amount: 500,
    showUnit: true,
    size: 'sm',
  },
  decorators: [
    (Story) => (
      <div className="h-full flex flex-col bg-gray-900">
        <div className="px-4 pt-4">
          <h1 className="text-white text-lg font-bold mb-4">ZET 표시 테스트</h1>
          <div className="bg-gray-800 p-4 rounded-lg">
            <Story />
          </div>
        </div>
      </div>
    ),
  ],
};

export const Large: Story = {
  args: {
    amount: 50000,
    showUnit: true,
    size: 'lg',
  },
  decorators: [
    (Story) => (
      <div className="h-full flex flex-col bg-gray-900">
        <div className="px-4 pt-4">
          <h1 className="text-white text-lg font-bold mb-4">ZET 표시 테스트</h1>
          <div className="bg-gray-800 p-4 rounded-lg">
            <Story />
          </div>
        </div>
      </div>
    ),
  ],
};

export const WithoutUnit: Story = {
  args: {
    amount: 2500,
    showUnit: false,
    size: 'md',
  },
  decorators: [
    (Story) => (
      <div className="h-full flex flex-col bg-gray-900">
        <div className="px-4 pt-4">
          <h1 className="text-white text-lg font-bold mb-4">ZET 표시 테스트</h1>
          <div className="bg-gray-800 p-4 rounded-lg">
            <Story />
          </div>
        </div>
      </div>
    ),
  ],
};

export const Zero: Story = {
  args: {
    amount: 0,
    showUnit: true,
    size: 'md',
  },
  decorators: [
    (Story) => (
      <div className="h-full flex flex-col bg-gray-900">
        <div className="px-4 pt-4">
          <h1 className="text-white text-lg font-bold mb-4">ZET 표시 테스트</h1>
          <div className="bg-gray-800 p-4 rounded-lg">
            <Story />
          </div>
        </div>
      </div>
    ),
  ],
};

export const LargeAmount: Story = {
  args: {
    amount: 99999,
    showUnit: true,
    size: 'md',
  },
  decorators: [
    (Story) => (
      <div className="h-full flex flex-col bg-gray-900">
        <div className="px-4 pt-4">
          <h1 className="text-white text-lg font-bold mb-4">ZET 표시 테스트</h1>
          <div className="bg-gray-800 p-4 rounded-lg">
            <Story />
          </div>
        </div>
      </div>
    ),
  ],
};

export const OverLimit: Story = {
  args: {
    amount: 150000,
    showUnit: true,
    size: 'md',
  },
  decorators: [
    (Story) => (
      <div className="h-full flex flex-col bg-gray-900">
        <div className="px-4 pt-4">
          <h1 className="text-white text-lg font-bold mb-4">ZET 표시 테스트</h1>
          <div className="bg-gray-800 p-4 rounded-lg">
            <Story />
          </div>
        </div>
      </div>
    ),
  ],
};

export const WithCommas: Story = {
  args: {
    amount: 12345,
    showUnit: true,
    size: 'md',
  },
  decorators: [
    (Story) => (
      <div className="h-full flex flex-col bg-gray-900">
        <div className="px-4 pt-4">
          <h1 className="text-white text-lg font-bold mb-4">ZET 표시 테스트</h1>
          <div className="bg-gray-800 p-4 rounded-lg">
            <Story />
          </div>
        </div>
      </div>
    ),
  ],
};
