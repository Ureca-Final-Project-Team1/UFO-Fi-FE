import type { Meta, StoryObj } from '@storybook/react';

import UserTable from './UserTable';

const meta: Meta<typeof UserTable> = {
  title: 'Admin/UserTable',
  component: UserTable,
  parameters: {
    layout: 'padded',
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
  decorators: [
    (Story) => (
      <div className="w-full max-w-7xl mx-auto p-6">
        <Story />
      </div>
    ),
  ],
};

export const Empty: Story = {
  args: {
    data: [],
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-7xl mx-auto p-6">
        <Story />
      </div>
    ),
  ],
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
  decorators: [
    (Story) => (
      <div className="w-full max-w-7xl mx-auto p-6">
        <Story />
      </div>
    ),
  ],
};

export const WithActions: Story = {
  args: {
    data: mockData,
    onActivateClick: (row) => console.log('Activate clicked for:', row),
    onDeactivateClick: (row) => console.log('Deactivate clicked for:', row),
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-7xl mx-auto p-6">
        <Story />
      </div>
    ),
  ],
};
