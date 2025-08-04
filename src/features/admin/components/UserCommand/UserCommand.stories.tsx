import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import UserCommand from './UserCommand';

const meta: Meta<typeof UserCommand> = {
  title: 'Admin/UserCommand',
  component: UserCommand,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    setSearch: { action: 'search changed' },
    setFilterType: { action: 'filter type changed' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Wrapper component to handle state
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
};

export const WithSearchValue: Story = {
  render: (args) => <UserCommandWrapper {...args} />,
  args: {
    search: 'user123',
    filterType: 'nickname',
  },
};

export const WithEmailFilter: Story = {
  render: (args) => <UserCommandWrapper {...args} />,
  args: {
    search: '',
    filterType: 'email',
  },
};

export const WithNameFilter: Story = {
  render: (args) => <UserCommandWrapper {...args} />,
  args: {
    search: '김철수',
    filterType: 'name',
  },
};

export const WithLongSearch: Story = {
  render: (args) => <UserCommandWrapper {...args} />,
  args: {
    search: 'verylongsearchtermthatmightoverflow',
    filterType: 'email',
  },
};
