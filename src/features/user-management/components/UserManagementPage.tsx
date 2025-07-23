'use client';

import React, { useState, useEffect } from 'react';

import { Modal } from '@/shared';

import UserCommand from './UserCommand';
import UserTable from './UserTable';
import { UserRow } from '../types/user';

const dummyData: UserRow[] = [
  {
    id: 1,
    nickname: 'user001',
    name: '김사용',
    email: 'user001@example.com',
    reportedCount: 3,
    disabledCount: 1,
    status: '활성화',
  },
  {
    id: 2,
    nickname: 'user002',
    name: '이사용',
    email: 'user002@example.com',
    reportedCount: 12,
    disabledCount: 5,
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

const STORAGE_KEY = 'user-management-data';

const UserManagementPage: React.FC = () => {
  const [data, setData] = useState<UserRow[]>(dummyData);
  const [isLoaded, setIsLoaded] = useState(false);

  const [modal, setModal] = useState<{ open: boolean; message: string }>({
    open: false,
    message: '',
  });
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('nickname');

  // 컴포넌트 마운트 시 localStorage에서 데이터 로드
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setData(parsedData);
      } catch (error) {
        console.error('Failed to parse saved data:', error);
        setData(dummyData);
      }
    }
    setIsLoaded(true);
  }, []);

  // 데이터가 변경될 때마다 localStorage에 저장 (isLoaded가 true일 때만)
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  }, [data, isLoaded]);

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

  // 데이터 초기화 함수 (개발용)
  const handleResetData = () => {
    setData(dummyData);
    setModal({ open: true, message: '데이터가 초기화되었습니다.' });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-black">사용자 관리</h2>
        {process.env.NODE_ENV === 'development' && (
          <button
            onClick={handleResetData}
            className="px-3 py-1 text-sm bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
          >
            데이터 초기화
          </button>
        )}
      </div>
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
