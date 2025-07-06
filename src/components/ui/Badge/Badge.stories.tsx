import type { Meta, StoryObj } from '@storybook/nextjs';

import { Badge } from './Badge';

type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline';
type BadgeState = 'selling' | 'sold' | 'timeout' | 'reported';

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
      description: 'Badge 스타일 variant',
    },
    state: {
      control: 'select',
      options: ['selling', 'sold', 'timeout', 'reported'],
      description: 'Badge 상태값 (선택 시 색상 변화)',
    },
    children: {
      control: 'text',
      description: 'Badge 내부 텍스트',
    },
    className: {
      control: 'text',
      description: '추가적인 Tailwind className',
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
        story: '모든 variant 조합을 렌더링한 예시입니다.',
      },
    },
  },
};

export const AllStates: Story = {
  name: 'All States',
  render: () => (
    <div className="flex gap-4 flex-wrap">
      {(['selling', 'sold', 'timeout', 'reported'] as BadgeState[]).map((state) => (
        <Badge key={state} state={state}>
          {state}
        </Badge>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '`state` prop을 사용한 Badge 스타일 변화 예시입니다.',
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
        story: '`className`으로 커스터마이징한 Badge 예시입니다.',
      },
    },
  },
};
