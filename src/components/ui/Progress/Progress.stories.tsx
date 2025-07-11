import type { Meta, StoryObj } from '@storybook/react';

import { Progress } from './Progress';

const meta: Meta<typeof Progress> = {
  title: 'UI/Progress',
  component: Progress,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '저장 용량 사용률을 보여주는 프로그레스 바 컴포넌트입니다. 라벨 표시를 선택적으로 제어할 수 있습니다.',
      },
    },
  },
  argTypes: {
    usedStorage: {
      control: { type: 'number', min: 0, max: 10, step: 1 },
      description: '사용된 용량 (GB)',
    },
    totalStorage: {
      control: { type: 'number', min: 1, max: 10, step: 1 },
      description: '전체 용량 (GB)',
    },
    showCurrentUsage: {
      control: 'boolean',
      description: '현재 사용 용량 표시 여부',
    },
    showMinMaxLabels: {
      control: 'boolean',
      description: '최소/최대 용량 표시 여부',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'],
      description: '프로그레스 바 크기',
    },
    className: {
      control: false,
      table: { disable: true },
    },
    // Radix UI ProgressPrimitive.Root props 숨기기
    value: {
      control: false,
      table: { disable: true },
    },
    max: {
      control: false,
      table: { disable: true },
    },
    getValueLabel: {
      control: false,
      table: { disable: true },
    },
    asChild: {
      control: false,
      table: { disable: true },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-80 max-w-sm">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  args: {
    usedStorage: 5,
    totalStorage: 10,
    showCurrentUsage: true,
    showMinMaxLabels: true,
    size: 'lg',
  },
};

export const WithoutCurrentUsage: Story = {
  args: {
    usedStorage: 5,
    totalStorage: 10,
    showCurrentUsage: false,
    showMinMaxLabels: true,
    size: 'lg',
  },
};

export const WithoutMinMaxLabels: Story = {
  args: {
    usedStorage: 5,
    totalStorage: 10,
    showCurrentUsage: true,
    showMinMaxLabels: false,
    size: 'lg',
  },
};

export const OnlyProgressBar: Story = {
  args: {
    usedStorage: 5,
    totalStorage: 10,
    showCurrentUsage: false,
    showMinMaxLabels: false,
    size: 'lg',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4 w-80 max-w-sm">
      <div>
        <h3 className="text-sm font-medium mb-2 text-gray-700">XS</h3>
        <Progress usedStorage={5} totalStorage={10} size="xs" />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2 text-gray-700">SM</h3>
        <Progress usedStorage={5} totalStorage={10} size="sm" />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2 text-gray-700">MD</h3>
        <Progress usedStorage={5} totalStorage={10} size="md" />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2 text-gray-700">LG</h3>
        <Progress usedStorage={5} totalStorage={10} size="lg" />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2 text-gray-700">XL</h3>
        <Progress usedStorage={5} totalStorage={10} size="xl" />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2 text-gray-700">2XL</h3>
        <Progress usedStorage={5} totalStorage={10} size="2xl" />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2 text-gray-700">3XL</h3>
        <Progress usedStorage={5} totalStorage={10} size="3xl" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '다양한 크기의 프로그레스 바를 보여주는 예시입니다.',
      },
    },
  },
};
