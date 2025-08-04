import type { Meta, StoryObj } from '@storybook/react';

import UserTable from './UserTable';

const meta: Meta<typeof UserTable> = {
  title: 'Admin/UserTable',
  component: UserTable,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'desktop',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    onActivateClick: { action: 'activate clicked' },
    onDeactivateClick: { action: 'deactivate clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof UserTable>;

const mockData = [
  {
    id: 1,
    nickname: 'user123',
    name: '김철수',
    email: 'user123@example.com',
    reportedCount: 5,
    disabledCount: 2,
    status: '활성',
  },
  {
    id: 2,
    nickname: 'admin456',
    name: '이영희',
    email: 'admin456@example.com',
    reportedCount: 0,
    disabledCount: 0,
    status: '활성',
  },
  {
    id: 3,
    nickname: 'test789',
    name: '박민수',
    email: 'test789@example.com',
    reportedCount: 12,
    disabledCount: 8,
    status: '비활성',
  },
];

export const Default: Story = {
  args: {
    data: mockData,
  },
  render: (args) => (
    <div className="flex h-screen bg-gray-50">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
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

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">사용자 목록</h2>
              <UserTable {...args} />
            </div>
          </div>
        </main>
      </div>
    </div>
  ),
};

export const Empty: Story = {
  args: {
    data: [],
  },
  render: (args) => (
    <div className="flex h-screen bg-gray-50">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
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

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">사용자 목록</h2>
              <UserTable {...args} />
            </div>
          </div>
        </main>
      </div>
    </div>
  ),
};

export const WithManyUsers: Story = {
  args: {
    data: [
      ...mockData,
      {
        id: 4,
        nickname: 'user001',
        name: '최지영',
        email: 'user001@example.com',
        reportedCount: 3,
        disabledCount: 1,
        status: '활성',
      },
      {
        id: 5,
        nickname: 'user002',
        name: '정현우',
        email: 'user002@example.com',
        reportedCount: 7,
        disabledCount: 4,
        status: '비활성',
      },
      {
        id: 6,
        nickname: 'user003',
        name: '한소희',
        email: 'user003@example.com',
        reportedCount: 1,
        disabledCount: 0,
        status: '활성',
      },
    ],
  },
  render: (args) => (
    <div className="flex h-screen bg-gray-50">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
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

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">사용자 목록</h2>
              <UserTable {...args} />
            </div>
          </div>
        </main>
      </div>
    </div>
  ),
};

export const Mobile: Story = {
  args: {
    data: mockData,
  },
  render: (args) => (
    <div className="flex h-screen bg-gray-50">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
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

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">사용자 목록</h2>
              <UserTable {...args} />
            </div>
          </div>
        </main>
      </div>
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};
