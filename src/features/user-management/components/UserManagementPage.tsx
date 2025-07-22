'use client';

import React, { useState } from 'react';

import { Modal } from '@/shared/ui/Modal/Modal';

import UserCommand from './UserCommand';
import UserTable from './UserTable';
import { UserRow } from '../types/user';

const dummyData: UserRow[] = [
  {
    id: 1,
    nickname: 'caddibo4',
    name: '김도건',
    email: 'caddibo4@naver.com',
    reportedCount: 9999,
    disabledCount: 9999,
    status: '활성화',
  },
  {
    id: 2,
    nickname: 'yj_lee',
    name: '이영주',
    email: 'caddibo4@naver.com',
    reportedCount: 99999,
    disabledCount: 99999,
    status: '비활성화',
  },
];

const UserManagementPage: React.FC = () => {
  const [data, setData] = useState<UserRow[]>(dummyData);
  const [modal, setModal] = useState<{ open: boolean; message: string }>({
    open: false,
    message: '',
  });

  const handleActivate = (row: UserRow) => {
    if (row.status === '활성화') {
      setModal({ open: true, message: '이미 활성화 되어있는 사용자입니다.' });
      return;
    }
    setData((prev) =>
      prev.map((user) => (user.id === row.id ? { ...user, status: '활성화' } : user)),
    );
    setModal({ open: true, message: '사용자가 활성화 되었습니다.' });
  };

  const handleDeactivate = (row: UserRow) => {
    if (row.status === '비활성화') {
      setModal({ open: true, message: '이미 비활성화 되어있는 사용자입니다.' });
      return;
    }
    setData((prev) =>
      prev.map((user) => (user.id === row.id ? { ...user, status: '비활성화' } : user)),
    );
    setModal({ open: true, message: '사용자가 비활성화 되었습니다.' });
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-6">사용자 관리</h2>
      <UserCommand />
      <div className="mt-6">
        <UserTable
          data={data}
          onActivateClick={handleActivate}
          onDeactivateClick={handleDeactivate}
        />
      </div>
      <Modal
        isOpen={modal.open}
        onClose={() => setModal({ open: false, message: '' })}
        title={modal.message}
        hasCloseButton
        type="single"
        primaryButtonText="확인"
      />
    </div>
  );
};

export default UserManagementPage;
