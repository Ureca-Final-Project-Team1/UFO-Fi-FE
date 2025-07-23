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
    email: 'yj_lee@gmail.com',
    reportedCount: 99999,
    disabledCount: 99999,
    status: '비활성화',
  },
  {
    id: 3,
    nickname: 'developer123',
    name: '박개발',
    email: 'developer123@company.com',
    reportedCount: 5,
    disabledCount: 0,
    status: '활성화',
  },
  {
    id: 4,
    nickname: 'testuser',
    name: '이테스트',
    email: 'testuser@test.com',
    reportedCount: 15,
    disabledCount: 2,
    status: '활성화',
  },
  {
    id: 5,
    nickname: 'admin_user',
    name: '관리자',
    email: 'admin@ufofi.com',
    reportedCount: 0,
    disabledCount: 0,
    status: '활성화',
  },
];

const UserManagementPage: React.FC = () => {
  const [data, setData] = useState<UserRow[]>(dummyData);
  const [modal, setModal] = useState<{ open: boolean; message: string }>({
    open: false,
    message: '',
  });
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('nickname');

  // 필터링된 데이터 계산
  const filteredData = data.filter((user) => {
    if (!search) return true;

    const searchLower = search.toLowerCase();

    switch (filterType) {
      case 'nickname':
        return user.nickname.toLowerCase().includes(searchLower);
      case 'name':
        return user.name.toLowerCase().includes(searchLower);
      case 'email':
        return user.email.toLowerCase().includes(searchLower);
      default:
        return user.nickname.toLowerCase().includes(searchLower);
    }
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
    <div>
      <h2 className="text-2xl font-bold mb-6 text-black">사용자 관리</h2>
      <div className="flex justify-end mb-6">
        <UserCommand
          search={search}
          setSearch={setSearch}
          filterType={filterType}
          setFilterType={setFilterType}
        />
      </div>
      <div className="mt-6">
        {filteredData.length === 0 && search ? (
          <div className="text-center py-8 text-gray-500">
            <p>검색 결과가 없습니다.</p>
            <p className="text-sm mt-1">다른 검색어를 입력해보세요.</p>
          </div>
        ) : (
          <UserTable
            data={filteredData}
            onActivateClick={handleActivate}
            onDeactivateClick={handleDeactivate}
          />
        )}
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
