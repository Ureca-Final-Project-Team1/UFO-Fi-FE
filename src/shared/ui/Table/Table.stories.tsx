import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Table } from '@/shared';

import { Icon } from '../Icons/Icon';

type TestRow = {
  id: number;
  nickname: string;
  name: string;
  email: string;
  reportedCount: number;
  disabledCount: number;
  status: string;
};

const defaultActions = {
  render: () => (
    <div className="flex gap-2 justify-center">
      <Icon name="CircleMinus" className="size-5" color="red" />
      <Icon name="RotateCcw" className="size-4" color="green" />
    </div>
  ),
};

const columns: {
  Header: string;
  accessor: keyof TestRow | 'actions';
  render?: (value: unknown, row: TestRow) => React.ReactNode;
}[] = [
  { Header: 'ID', accessor: 'id' },
  { Header: '닉네임', accessor: 'nickname' },
  { Header: '이름', accessor: 'name' },
  { Header: '이메일', accessor: 'email' },
  { Header: '신고받은 게시물 수', accessor: 'reportedCount' },
  { Header: '비활성화 게시물 수', accessor: 'disabledCount' },
  { Header: '상태', accessor: 'status' },
  {
    Header: '관리',
    accessor: 'actions',
    render: () => defaultActions.render(),
  },
];

const generateTestData = (count: number): TestRow[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    nickname: `user${index + 1}`,
    name: `사용자${index + 1}`,
    email: `user${index + 1}@example.com`,
    reportedCount: Math.floor(Math.random() * 100),
    disabledCount: Math.floor(Math.random() * 50),
    status: index % 3 === 0 ? '비활성화' : '활성화',
  }));
};

const data = generateTestData(25);

const meta: Meta<typeof Table<TestRow>> = {
  title: 'UI/Table',
  component: Table,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof Table<TestRow>>;

export const Default: Story = {
  args: {
    columns,
    data,
  },
};

export const WithPagination: Story = {
  render: function WithPaginationStory() {
    return (
      <div className="p-6">
        <Table columns={columns} data={data} />
      </div>
    );
  },
};

export const LargeDataset: Story = {
  render: function LargeDatasetStory() {
    const largeData = generateTestData(100);
    return (
      <div className="p-6">
        <Table columns={columns} data={largeData} />
      </div>
    );
  },
};

export const SmallDataset: Story = {
  render: function SmallDatasetStory() {
    const smallData = generateTestData(5);
    return (
      <div className="p-6">
        <Table columns={columns} data={smallData} />
      </div>
    );
  },
};
