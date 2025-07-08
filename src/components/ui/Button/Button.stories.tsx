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
  },
};

export const WithIcon: Story = {
  args: {
    variant: 'primary',
    size: 'default',
    children: 'Explore',
    icon: 'satellite',
    iconPosition: 'left',
  },
};

export const AllVariants: Story = {
  render: (args) => (
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
        <Button key={variant} variant={variant as ButtonProps['variant']} {...args}>
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
  render: (args) => (
    <div className="flex flex-col gap-2">
      {['sm', 'default', 'lg', 'icon', 'full-width', 'compact'].map((size) => (
        <Button key={size} size={size as ButtonProps['size']} {...args}>
          {size === 'icon' ? <span className="sr-only">Icon</span> : size}
        </Button>
      ))}
    </div>
  ),
  args: {
    variant: 'primary',
    icon: 'ufo',
  },
};
