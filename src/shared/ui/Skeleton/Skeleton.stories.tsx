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
          '전역에서 사용할 수 있는 Skeleton(스켈레톤) 컴포넌트입니다. 로딩 상태를 시각적으로 표시할 때 사용하며, 다양한 variants를 지원합니다.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['pulse', 'shimmer', 'none'],
      description: '애니메이션 타입',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: '기본 높이 크기',
    },
    shape: {
      control: 'select',
      options: ['default', 'rounded', 'square', 'pill'],
      description: '모양',
    },
    color: {
      control: 'select',
      options: ['default', 'light', 'dark', 'custom'],
      description: '색상',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  args: {
    style: { width: 200, height: 20 },
  },
  render: (args) => <Skeleton {...args} />,
};

export const Playground: Story = {
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

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <h3 className="text-sm font-medium mb-2">Pulse</h3>
        <Skeleton variant="pulse" style={{ width: 200, height: 20 }} />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Shimmer</h3>
        <Skeleton variant="shimmer" style={{ width: 200, height: 20 }} />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">None</h3>
        <Skeleton variant="none" style={{ width: 200, height: 20 }} />
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <h3 className="text-sm font-medium mb-2">Small</h3>
        <Skeleton size="sm" style={{ width: 200 }} />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Medium</h3>
        <Skeleton size="md" style={{ width: 200 }} />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Large</h3>
        <Skeleton size="lg" style={{ width: 200 }} />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Extra Large</h3>
        <Skeleton size="xl" style={{ width: 200 }} />
      </div>
    </div>
  ),
};

export const Shapes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <h3 className="text-sm font-medium mb-2">Default</h3>
        <Skeleton shape="default" style={{ width: 200, height: 40 }} />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Rounded</h3>
        <Skeleton shape="rounded" style={{ width: 200, height: 40 }} />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Square</h3>
        <Skeleton shape="square" style={{ width: 200, height: 40 }} />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Pill</h3>
        <Skeleton shape="pill" style={{ width: 200, height: 40 }} />
      </div>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <h3 className="text-sm font-medium mb-2">Default</h3>
        <Skeleton color="default" style={{ width: 200, height: 20 }} />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Light</h3>
        <Skeleton color="light" style={{ width: 200, height: 20 }} />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Dark</h3>
        <Skeleton color="dark" style={{ width: 200, height: 20 }} />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Custom</h3>
        <Skeleton color="custom" style={{ width: 200, height: 20 }} />
      </div>
    </div>
  ),
};

export const TextElements: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Skeleton as="h1" style={{ width: 300, height: 32 }} />
      <Skeleton as="h2" style={{ width: 250, height: 28 }} />
      <Skeleton as="h3" style={{ width: 200, height: 24 }} />
      <Skeleton as="p" style={{ width: 400, height: 16 }} />
      <Skeleton as="span" style={{ width: 150, height: 14 }} />
    </div>
  ),
};

export const ComplexLayout: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, maxWidth: 600 }}>
      <Skeleton shape="pill" style={{ width: 60, height: 60 }} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Skeleton style={{ width: '60%', height: 16 }} />
        <Skeleton style={{ width: '40%', height: 12 }} />
        <Skeleton style={{ width: '80%', height: 12 }} />
      </div>
    </div>
  ),
};
