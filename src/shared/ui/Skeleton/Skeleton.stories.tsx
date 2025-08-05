import type { Meta, StoryObj } from '@storybook/nextjs';

import { Skeleton } from './Skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'UI/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '전역에서 사용할 수 있는 Skeleton(스켈레톤) 컴포넌트입니다. 로딩 상태를 시각적으로 표시할 때 사용하며, width, height, borderRadius 등 style props로 다양한 형태를 만들 수 있습니다.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['pulse', 'shimmer', 'none'],
      description: '스켈레톤의 애니메이션 타입',
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'sm', 'lg', 'full'],
      description: '스켈레톤의 크기 (border-radius)',
    },
    as: {
      control: { type: 'select' },
      options: ['div', 'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      description: '렌더링할 HTML 요소',
    },
  },
};

export default meta;

export const Default: StoryObj<typeof Skeleton> = {
  args: {
    style: { width: 200, height: 20 },
  },
  render: (args) => <Skeleton {...args} />,
};

export const Pulse: StoryObj<typeof Skeleton> = {
  args: {
    variant: 'pulse',
    style: { width: 200, height: 20 },
  },
  render: (args) => <Skeleton {...args} />,
};

export const Shimmer: StoryObj<typeof Skeleton> = {
  args: {
    variant: 'shimmer',
    style: { width: 200, height: 20 },
  },
  render: (args) => <Skeleton {...args} />,
};

export const None: StoryObj<typeof Skeleton> = {
  args: {
    variant: 'none',
    style: { width: 200, height: 20 },
  },
  render: (args) => <Skeleton {...args} />,
};

export const Sizes: StoryObj<typeof Skeleton> = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <h3 className="text-sm font-medium mb-2">Default (rounded-md)</h3>
        <Skeleton {...args} size="default" style={{ width: 200, height: 20 }} />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Small (rounded-sm)</h3>
        <Skeleton {...args} size="sm" style={{ width: 200, height: 20 }} />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Large (rounded-lg)</h3>
        <Skeleton {...args} size="lg" style={{ width: 200, height: 20 }} />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Full (rounded-full)</h3>
        <Skeleton {...args} size="full" style={{ width: 200, height: 20 }} />
      </div>
    </div>
  ),
  args: {
    variant: 'pulse',
  },
};

export const Playground: StoryObj<typeof Skeleton> = {
  args: {
    variant: 'pulse',
    style: { width: 120, height: 20, borderRadius: 8 },
  },
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Skeleton {...args} />
      <Skeleton {...args} style={{ ...args.style, width: 80, height: 80, borderRadius: 40 }} />
      <Skeleton {...args} style={{ ...args.style, width: 200, height: 12, borderRadius: 6 }} />
      <Skeleton {...args} style={{ ...args.style, width: 100, height: 40, borderRadius: 8 }} />
    </div>
  ),
};
