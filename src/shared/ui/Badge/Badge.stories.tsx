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
        component: 'Radix Slot을 지원하는 통합 Badge 컴포넌트입니다.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'outline'],
      description: '`variant`는 `state`가 없을 때 Badge의 스타일을 지정합니다.',
    },
    state: {
      control: 'select',
      options: ['selling', 'sold', 'timeout', 'reported'],
      description:
        '`state`에 따라 아이콘 및 색상이 자동 설정됩니다. `variant`와는 함께 사용되지 않습니다.',
    },
    showIcon: {
      control: 'boolean',
      description: '`true`일 경우 아이콘 또는 dot이 표시됩니다.',
    },
    icon: {
      control: 'text',
      description: '`state`가 없을 때 사용할 커스텀 아이콘 이름입니다.',
    },
    children: {
      control: 'text',
      description: 'Badge 안의 텍스트입니다.',
    },
    className: {
      control: 'text',
      description: 'Tailwind 유틸 클래스 추가',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

// 기본 Playground
export const Playground: Story = {
  args: {
    children: 'Badge',
    variant: 'default',
    showIcon: true,
  },
};

// 아이콘 포함/미포함 variant 조합
export const AllVariantsWithAndWithoutIcon: Story = {
  name: 'All Variants (With & Without Icon)',
  render: () => (
    <div className="flex flex-col gap-4">
      {/* 아이콘 포함 */}
      <div className="flex gap-4 flex-wrap">
        {(['default', 'secondary', 'destructive', 'outline'] as BadgeVariant[]).map((variant) => (
          <Badge key={`with-icon-${variant}`} variant={variant} showIcon>
            {variant} (icon)
          </Badge>
        ))}
      </div>
      {/* 아이콘 미포함 */}
      <div className="flex gap-4 flex-wrap">
        {(['default', 'secondary', 'destructive', 'outline'] as BadgeVariant[]).map((variant) => (
          <Badge key={`no-icon-${variant}`} variant={variant} showIcon={false}>
            {variant} (no icon)
          </Badge>
        ))}
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          '`variant` 별로 아이콘 유무에 따라 Badge가 어떻게 달라지는지 확인할 수 있는 예시입니다.',
      },
    },
  },
};

// 아이콘 포함/미포함 state 조합
export const AllStatesWithAndWithoutIcon: Story = {
  name: 'All States (With & Without Icon)',
  render: () => (
    <div className="flex flex-col gap-4">
      {/* 아이콘 포함 */}
      <div className="flex gap-4 flex-wrap">
        {(['selling', 'sold', 'timeout', 'reported'] as BadgeState[]).map((state) => (
          <Badge key={`with-icon-${state}`} state={state} showIcon />
        ))}
      </div>
      {/* 아이콘 미포함 */}
      <div className="flex gap-4 flex-wrap">
        {(['selling', 'sold', 'timeout', 'reported'] as BadgeState[]).map((state) => (
          <Badge key={`no-icon-${state}`} state={state} showIcon={false} />
        ))}
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          '`state` 별로 아이콘/도트 유무에 따른 Badge 변화 비교 예시입니다. `showIcon`을 껐을 때 텍스트만 표시됩니다.',
      },
    },
  },
};

// 커스텀 아이콘 사용 예시
export const WithCustomIcon: Story = {
  name: 'Custom Icon',
  args: {
    children: 'Custom Icon Badge',
    variant: 'secondary',
    icon: 'Search',
    showIcon: true,
  },
  parameters: {
    docs: {
      description: {
        story: '`state` 없이 `icon`과 `variant`를 조합하여 자유롭게 Badge를 구성할 수 있습니다.',
      },
    },
  },
};
