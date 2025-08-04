import type { Meta, StoryObj } from '@storybook/react';

import { ZetDisplay } from './ZetDisplay';

const meta: Meta<typeof ZetDisplay> = {
  title: 'Common/ZetDisplay',
  component: ZetDisplay,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    amount: {
      control: { type: 'number' },
      description: '표시할 ZET 수량',
    },
    showUnit: {
      control: { type: 'boolean' },
      description: 'ZET 단위 표시 여부',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: '텍스트 크기',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    amount: 1000,
    showUnit: true,
    size: 'md',
  },
};

export const Small: Story = {
  args: {
    amount: 500,
    showUnit: true,
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    amount: 5000,
    showUnit: true,
    size: 'lg',
  },
};

export const WithoutUnit: Story = {
  args: {
    amount: 2500,
    showUnit: false,
    size: 'md',
  },
};

export const Zero: Story = {
  args: {
    amount: 0,
    showUnit: true,
    size: 'md',
  },
};

export const LargeNumber: Story = {
  args: {
    amount: 99999,
    showUnit: true,
    size: 'md',
  },
};

export const OverLimit: Story = {
  args: {
    amount: 150000,
    showUnit: true,
    size: 'md',
  },
};

export const WithCommas: Story = {
  args: {
    amount: 12345,
    showUnit: true,
    size: 'md',
  },
};
