import React from 'react';

import { Table } from '@/shared';

import { UserRow } from '../../types/user';

interface UserTableProps {
  data: UserRow[];
  onActivateClick?: (row: UserRow) => void;
  onDeactivateClick?: (row: UserRow) => void;
}

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

const UserTable: React.FC<UserTableProps> = ({ data, onActivateClick, onDeactivateClick }) => {
  return (
    <Table<UserRow>
      columns={columns}
      data={data}
      onActivateClick={onActivateClick}
      onDeactivateClick={onDeactivateClick}
    />
  );
};

export default UserTable;
