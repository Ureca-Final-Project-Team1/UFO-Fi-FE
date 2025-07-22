import type { Meta, StoryObj } from '@storybook/react';

import Sidebar from './Sidebar';

const meta: Meta<typeof Sidebar> = {
  title: 'Shared/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {
  render: () => <Sidebar />,
};
