import type { Meta, StoryObj } from '@storybook/nextjs';

import { Badge } from './Badge';

type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline';

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Radix Slot을 지원하는 기본 Badge 컴포넌트입니다.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'outline'],
      description: '배지 스타일 variant',
    },
    children: {
      control: 'text',
      description: '배지 안의 텍스트',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Playground: Story = {
  args: {
    children: 'Badge',
    variant: 'default',
  },
};

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div className="flex gap-4 flex-wrap">
      {(['default', 'secondary', 'destructive', 'outline'] as BadgeVariant[]).map((variant) => (
        <Badge key={variant} variant={variant}>
          {variant}
        </Badge>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Badge의 모든 variant 예시를 보여줍니다.',
      },
    },
  },
};

export const CustomClassName: Story = {
  name: 'Custom Class',
  args: {
    children: 'Rounded Badge',
    className: 'rounded-full px-3 py-1 text-sm',
  },
  parameters: {
    docs: {
      description: {
        story: '추가 className을 사용한 Badge 커스터마이징 예시입니다.',
      },
    },
  },
};
