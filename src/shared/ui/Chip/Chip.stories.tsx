import type { Meta, StoryObj } from '@storybook/nextjs';
import React from 'react';

import { Chip } from './Chip';
import { Icon } from '../Icons';
import type { IconType } from '../Icons';

const meta: Meta<typeof Chip> = {
  title: 'UI/Chip',
  component: Chip,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '재사용 가능한 Chip 컴포넌트입니다. 태그, 상태 표시, 선택/해제, 드롭다운, 아이콘 등 다양한 UI에 사용할 수 있습니다.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Chip>;

type PlaygroundArgs = {
  leftIconName?: IconType;
  rightIconName?: IconType;
  children?: React.ReactNode;
  selected?: boolean;
  disabled?: boolean;
};

export const Playground = {
  args: {
    children: 'Chip 예시',
    leftIconName: 'Search',
    rightIconName: 'ChevronDown',
    selected: false,
    disabled: false,
  },
  parameters: {
    argTypes: {
      leftIconName: {
        control: 'select',
        options: [
          'ufo',
          'planet',
          'trending',
          'astronaut',
          'satellite',
          'box',
          'rotate',
          'Search',
          'ChevronDown',
          'ChevronRight',
        ] satisfies IconType[],
      },
      rightIconName: {
        control: 'select',
        options: [
          'ufo',
          'planet',
          'trending',
          'astronaut',
          'satellite',
          'box',
          'rotate',
          'Search',
          'ChevronDown',
          'ChevronRight',
        ] satisfies IconType[],
      },
    },
  },
  render: (args: PlaygroundArgs) => (
    <Chip
      selected={args.selected}
      disabled={args.disabled}
      leftIcon={args.leftIconName ? <Icon name={args.leftIconName} /> : undefined}
      rightIcon={args.rightIconName ? <Icon name={args.rightIconName} /> : undefined}
    >
      {args.children}
    </Chip>
  ),
};

export const Default: Story = {
  args: {
    children: '기본 Chip',
  },
};

export const LeftIcon: Story = {
  args: {
    children: '통신사',
    leftIcon: <Icon name="Search" />,
  },
};

export const RightIcon: Story = {
  args: {
    children: '평판',
    rightIcon: <Icon name="ChevronDown" />,
  },
};

export const WithIcons: Story = {
  args: {
    children: '아이콘 Chip',
    leftIcon: <Icon name="Search" />,
    rightIcon: <Icon name="ChevronDown" />,
  },
};

export const Dropdown: Story = {
  args: {
    children: '통신사',
    dropdown: (
      <div>
        <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">KT</button>
        <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">SKT</button>
        <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">LGU+</button>
      </div>
    ),
  },
};

export const Selected: Story = {
  args: {
    children: '선택됨',
    selected: true,
  },
};

export const Disabled: Story = {
  args: {
    children: '비활성화',
    disabled: true,
  },
};
