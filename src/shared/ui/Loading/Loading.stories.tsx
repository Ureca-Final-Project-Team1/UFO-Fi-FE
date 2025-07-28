import type { Meta, StoryObj } from '@storybook/react';

import { Loading } from '@/shared';

const meta: Meta<typeof Loading> = {
  title: 'UI/Loading',
  component: Loading,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'spinner', 'dots', 'pulse'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    fullScreen: {
      control: 'boolean',
    },
    showMessage: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Loading>;

export const Default: Story = {
  name: 'Default',
  render: () => (
    <div className="bg-gray-800 p-6 rounded-lg max-w-3xl w-full mx-auto">
      <Loading
        variant="default"
        size="lg"
        message="로딩 중..."
        fullScreen={false}
        showMessage={true}
      />
    </div>
  ),
};

export const Spinner: Story = {
  name: 'Spinner',
  render: () => (
    <div className="bg-gray-800 p-6 rounded-lg max-w-xl w-full mx-auto">
      <Loading variant="spinner" size="md" message="데이터를 불러오는 중..." />
    </div>
  ),
};

export const SmallSpinner: Story = {
  name: 'Small Spinner',
  render: () => (
    <div className="bg-gray-800 p-6 rounded-lg max-w-4xl w-full mx-auto">
      <Loading variant="spinner" size="sm" showMessage={false} />
    </div>
  ),
};

export const Dots: Story = {
  name: 'Dots',
  render: () => (
    <div className="bg-gray-800 p-6 rounded-lg max-w-xl w-full mx-auto">
      <Loading variant="dots" size="md" message="처리 중..." />
    </div>
  ),
};
