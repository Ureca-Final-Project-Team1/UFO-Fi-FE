import type { Meta, StoryObj } from '@storybook/nextjs';
import type { VariantProps } from 'class-variance-authority';

import { DotBadge } from './DotBadge';
import { dotBadgeVariants } from './dotBadgeVariants';

type DotBadgeColor = VariantProps<typeof dotBadgeVariants>['color'];
type DotBadgeSize = VariantProps<typeof dotBadgeVariants>['size'];

const meta: Meta<typeof DotBadge> = {
  title: 'UI/DotBadge',
  component: DotBadge,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '상태를 표시하는 작은 원형 배지 컴포넌트입니다.',
      },
    },
  },
  argTypes: {
    color: {
      control: 'select',
      options: ['green', 'red'],
      description: 'Dot 색상',
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
      description: 'Dot 크기',
    },
  },
};

export default meta;
type Story = StoryObj<typeof DotBadge>;

export const Default: Story = {
  args: {
    color: 'green',
    size: 'default',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-8">
      {(['green', 'red'] as DotBadgeColor[]).map((color) => (
        <div key={color} className="flex flex-col items-center gap-2">
          <span className="text-sm font-medium">{color}</span>
          {(['sm', 'default', 'lg'] as DotBadgeSize[]).map((size) => (
            <DotBadge key={size} color={color} size={size} />
          ))}
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '모든 색상과 크기 조합의 DotBadge를 보여줍니다.',
      },
    },
  },
};
