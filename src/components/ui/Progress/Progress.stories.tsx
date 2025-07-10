import type { Meta, StoryObj } from '@storybook/react';

import { StorageProgress } from './StorageProgress';

const meta: Meta<typeof StorageProgress> = {
  title: 'UI/Progress',
  component: StorageProgress,
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
      control: { type: 'number', min: 0, max: 10, step: 0.5 },
      description: '사용된 용량 (GB)',
    },
    totalStorage: {
      control: { type: 'number', min: 1, max: 100, step: 1 },
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
      control: 'text',
      description: '추가 CSS 클래스',
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
type Story = StoryObj<typeof StorageProgress>;

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
        <StorageProgress usedStorage={5} totalStorage={10} size="xs" />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2 text-gray-700">SM</h3>
        <StorageProgress usedStorage={5} totalStorage={10} size="sm" />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2 text-gray-700">MD</h3>
        <StorageProgress usedStorage={5} totalStorage={10} size="md" />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2 text-gray-700">LG</h3>
        <StorageProgress usedStorage={5} totalStorage={10} size="lg" />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2 text-gray-700">XL</h3>
        <StorageProgress usedStorage={5} totalStorage={10} size="xl" />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2 text-gray-700">2XL</h3>
        <StorageProgress usedStorage={5} totalStorage={10} size="2xl" />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2 text-gray-700">3XL</h3>
        <StorageProgress usedStorage={5} totalStorage={10} size="3xl" />
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
