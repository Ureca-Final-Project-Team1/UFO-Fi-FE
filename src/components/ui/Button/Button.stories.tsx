import type { Meta, StoryObj } from '@storybook/nextjs';
import React from 'react';

import { Button } from './Button';
import type { ButtonProps } from './Button';
import { IconType } from '../Icons';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'destructive',
        'outline',
        'ghost',
        'link',
        'exploration-button',
        'cancel-button',
        'number-badge',
        'action-button',
        'next-button',
        'project-button',
      ],
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg', 'icon', 'full-width', 'compact'],
    },
    icon: {
      control: 'select',
      options: [
        'ufo',
        'planet',
        'trending',
        'astronaut',
        'satellite',
        'box',
        'rotate',
      ] satisfies IconType[],
    },
    iconPosition: {
      control: 'radio',
      options: ['left', 'right'],
    },
    children: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Playground: Story = {
  args: {
    variant: 'primary',
    size: 'default',
    children: 'Click me',
    icon: undefined,
    iconPosition: 'left',
    onClick: () => alert('Playground 버튼 클릭됨'),
  },
};

export const WithIcon: Story = {
  args: {
    variant: 'primary',
    size: 'default',
    children: 'Explore',
    icon: 'satellite',
    iconPosition: 'left',
    onClick: () => alert('WithIcon 버튼 클릭됨'),
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      {[
        'primary',
        'secondary',
        'destructive',
        'outline',
        'ghost',
        'link',
        'exploration-button',
        'cancel-button',
        'number-badge',
        'action-button',
        'next-button',
        'project-button',
      ].map((variant) => (
        <Button
          key={variant}
          variant={variant as ButtonProps['variant']}
          onClick={() => alert(`${variant} 버튼 클릭됨`)}
        >
          {variant}
        </Button>
      ))}
    </div>
  ),
  args: {
    size: 'default',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      {(['sm', 'default', 'lg', 'icon', 'full-width', 'compact'] as ButtonProps['size'][]).map(
        (size) => (
          <Button
            key={size}
            size={size}
            variant="primary"
            icon={size === 'icon' ? 'ufo' : undefined}
            aria-label={size === 'icon' ? '알림 열기' : undefined}
            onClick={() => alert(`${size} 버튼 클릭됨`)}
          >
            {size === 'icon' ? <span className="sr-only">알림 열기</span> : `${size} button`}
          </Button>
        ),
      )}
    </div>
  ),
};
