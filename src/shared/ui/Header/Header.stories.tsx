import type { Meta, StoryObj } from '@storybook/react';

import Header from './Header';

const meta: Meta<typeof Header> = {
  title: 'UI/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {
    userName: '김어드민',
  },
};
