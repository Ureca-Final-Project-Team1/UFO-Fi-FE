import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import UserCommand from './UserCommand';

const meta: Meta<typeof UserCommand> = {
  title: 'Admin/UserCommand',
  component: UserCommand,
  parameters: {
    layout: 'fullscreen',
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

const StoryLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="flex h-screen bg-gray-50">
    <div className="flex-1 flex flex-col overflow-hidden">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold text-gray-900">사용자 관리</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Admin</span>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1 overflow-y-auto p-4 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">사용자 검색 및 필터링</h2>
            {children}
          </div>
        </div>
      </main>
    </div>
  </div>
);

export const Default: Story = {
  render: (args) => (
    <StoryLayout>
      <UserCommandWrapper {...args} />
    </StoryLayout>
  ),
  args: {
    search: '',
    filterType: 'nickname',
  },
};

export const WithSearchValue: Story = {
  render: (args) => (
    <StoryLayout>
      <UserCommandWrapper {...args} />
    </StoryLayout>
  ),
  args: {
    search: 'user123',
    filterType: 'nickname',
  },
};

export const WithEmailFilter: Story = {
  render: (args) => (
    <StoryLayout>
      <UserCommandWrapper {...args} />
    </StoryLayout>
  ),
  args: {
    search: 'test@example.com',
    filterType: 'email',
  },
};

export const Mobile: Story = {
  render: (args) => (
    <StoryLayout>
      <UserCommandWrapper {...args} />
    </StoryLayout>
  ),
  args: {
    search: 'user123',
    filterType: 'nickname',
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};
