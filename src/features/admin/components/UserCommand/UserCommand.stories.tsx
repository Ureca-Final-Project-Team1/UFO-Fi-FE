import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import UserCommand from './UserCommand';

const meta: Meta<typeof UserCommand> = {
  title: 'Admin/UserCommand',
  component: UserCommand,
  parameters: {
    layout: 'padded',
    viewport: {
      defaultViewport: 'desktop',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    setSearch: { action: 'search changed' },
    setFilterType: { action: 'filter type changed' },
  },
};

export default meta;
type Story = StoryObj<typeof UserCommand>;

const UserCommandWrapper = (args: { search?: string; filterType?: string }) => {
  const [search, setSearch] = useState(args.search || '');
  const [filterType, setFilterType] = useState(args.filterType || 'nickname');

  return (
    <UserCommand
      search={search}
      setSearch={setSearch}
      filterType={filterType}
      setFilterType={setFilterType}
    />
  );
};

export const Default: Story = {
  render: (args) => <UserCommandWrapper {...args} />,
  args: {
    search: '',
    filterType: 'nickname',
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-7xl mx-auto p-6">
        <Story />
      </div>
    ),
  ],
};

export const WithSearchValue: Story = {
  render: (args) => <UserCommandWrapper {...args} />,
  args: {
    search: 'user123',
    filterType: 'nickname',
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-7xl mx-auto p-6">
        <Story />
      </div>
    ),
  ],
};

export const WithEmailFilter: Story = {
  render: (args) => <UserCommandWrapper {...args} />,
  args: {
    search: 'test@example.com',
    filterType: 'email',
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-7xl mx-auto p-6">
        <Story />
      </div>
    ),
  ],
};

export const WithNameFilter: Story = {
  render: (args) => <UserCommandWrapper {...args} />,
  args: {
    search: '김철수',
    filterType: 'name',
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-7xl mx-auto p-6">
        <Story />
      </div>
    ),
  ],
};

export const WithLongSearch: Story = {
  render: (args) => <UserCommandWrapper {...args} />,
  args: {
    search: 'very long search term that might overflow',
    filterType: 'email',
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-7xl mx-auto p-6">
        <Story />
      </div>
    ),
  ],
};
