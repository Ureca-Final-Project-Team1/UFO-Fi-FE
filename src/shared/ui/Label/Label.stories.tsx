import type { Meta, StoryObj } from '@storybook/react';

import { Label } from '.';

const meta: Meta<typeof Label> = {
  title: 'UI/Label',
  component: Label,
  args: {
    children: 'Label Example',
    htmlFor: 'input-id',
  },
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {};
