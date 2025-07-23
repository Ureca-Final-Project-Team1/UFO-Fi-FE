import type { Meta, StoryObj } from '@storybook/react';

import Table from './Table';
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

const data = [
  {
    id: 1,
    nickname: 'caddibo4',
    name: '김도건',
    email: 'caddibo4@naver.com',
    reportedCount: 9999,
    disabledCount: 9999,
    status: '활성화',
    actions: defaultActions,
  },
  {
    id: 2,
    nickname: 'yj.Jee',
    name: '이영주',
    email: 'caddibo4@naver.com',
    reportedCount: 99999,
    disabledCount: 99999,
    status: '비활성화',
    actions: defaultActions,
  },
  {
    id: 3,
    nickname: 'jy.Ho',
    name: '진영호',
    email: 'caddibo4@naver.com',
    reportedCount: 99999,
    disabledCount: 99999,
    status: '비활성화',
    actions: defaultActions,
  },
  {
    id: 4,
    nickname: 'mj.An',
    name: '안민지',
    email: 'caddibo4@naver.com',
    reportedCount: 99999,
    disabledCount: 99999,
    status: '비활성화',
    actions: defaultActions,
  },
];

export const Default: Story = {
  args: {
    columns,
    data,
  },
};
