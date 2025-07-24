import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Table } from './Table';
import { Icon } from '../Icons/Icon';

const meta: Meta<typeof Table> = {
  title: 'UI/Table',
  component: Table,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof Table>;

const columns = [
  { Header: 'ID', accessor: 'id' },
  { Header: '닉네임', accessor: 'nickname' },
  { Header: '이름', accessor: 'name' },
  { Header: '이메일', accessor: 'email' },
  { Header: '신고받은 게시물 수', accessor: 'reportedCount' },
  { Header: '비활성화 게시물 수', accessor: 'disabledCount' },
  { Header: '상태', accessor: 'status' },
  { Header: '관리', accessor: 'actions' },
];

const defaultActions = {
  deactivateIcon: <Icon name="circle-minus" className="w-5 h-5" />,
  activateIcon: <Icon name="return" className="w-5 h-5" />,
};

//테스트 데이터
const generateTestData = (count: number) => {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    nickname: `user${index + 1}`,
    name: `사용자${index + 1}`,
    email: `user${index + 1}@example.com`,
    reportedCount: Math.floor(Math.random() * 100),
    disabledCount: Math.floor(Math.random() * 50),
    status: index % 3 === 0 ? '비활성화' : '활성화',
    actions: defaultActions,
  }));
};

const data = generateTestData(25); // 25개의 테스트 데이터

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
        <Table columns={columns} data={data} showPagination={true} />
      </div>
    );
  },
};

export const LargeDataset: Story = {
  render: function LargeDatasetStory() {
    const largeData = generateTestData(100); // 100개의 테스트 데이터

    return (
      <div className="p-6">
        <Table columns={columns} data={largeData} showPagination={true} />
      </div>
    );
  },
};

export const SmallDataset: Story = {
  render: function SmallDatasetStory() {
    const smallData = generateTestData(5); // 5개의 테스트 데이터 (1페이지)

    return (
      <div className="p-6">
        <Table columns={columns} data={smallData} showPagination={true} />
      </div>
    );
  },
};
