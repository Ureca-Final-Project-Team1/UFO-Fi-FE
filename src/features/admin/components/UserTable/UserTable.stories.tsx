import type { Meta, StoryObj } from '@storybook/react';

import UserTable from './UserTable';
import { UserRow } from '../../types/user';

const meta: Meta<typeof UserTable> = {
  title: 'Admin/UserTable',
  component: UserTable,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    onActivateClick: { action: 'activate clicked' },
    onDeactivateClick: { action: 'deactivate clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockData: UserRow[] = [
  {
    id: 1,
    nickname: 'user123',
    name: '김철수',
    email: 'user123@example.com',
    reportedCount: 3,
    disabledCount: 1,
    status: '활성',
  },
  {
    id: 2,
    nickname: 'testuser',
    name: '이영희',
    email: 'testuser@example.com',
    reportedCount: 0,
    disabledCount: 0,
    status: '활성',
  },
  {
    id: 3,
    nickname: 'spamuser',
    name: '박민수',
    email: 'spamuser@example.com',
    reportedCount: 15,
    disabledCount: 5,
    status: '비활성',
  },
  {
    id: 4,
    nickname: 'newuser',
    name: '최지영',
    email: 'newuser@example.com',
    reportedCount: 1,
    disabledCount: 0,
    status: '활성',
  },
];

export const Default: Story = {
  args: {
    data: mockData,
  },
};

export const Empty: Story = {
  args: {
    data: [],
  },
};

export const WithManyUsers: Story = {
  args: {
    data: [
      ...mockData,
      {
        id: 5,
        nickname: 'user5',
        name: '정수민',
        email: 'user5@example.com',
        reportedCount: 2,
        disabledCount: 1,
        status: '활성',
      },
      {
        id: 6,
        nickname: 'user6',
        name: '한지우',
        email: 'user6@example.com',
        reportedCount: 0,
        disabledCount: 0,
        status: '활성',
      },
      {
        id: 7,
        nickname: 'user7',
        name: '송미영',
        email: 'user7@example.com',
        reportedCount: 8,
        disabledCount: 3,
        status: '비활성',
      },
    ],
  },
};

export const WithActions: Story = {
  args: {
    data: mockData.map((user) => ({
      ...user,
      actions: {
        deactivateIcon: <span>🚫</span>,
        activateIcon: <span>✅</span>,
      },
    })),
  },
};
