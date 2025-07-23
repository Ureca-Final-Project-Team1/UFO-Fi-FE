'use client';

import React, { useState, useEffect } from 'react';

import { Modal } from '@/shared';

import ProfanityTable from './ProfanityTable';
import { ProfanityRow } from '../types/profanity';

const dummyData: ProfanityRow[] = [
  {
    id: 1,
    word: '쉬뿔',
    createdAt: '2024-01-15T09:30:00',
  },
  {
    id: 2,
    word: '쉬이발',
    createdAt: '2024-01-16T14:15:00',
  },
  {
    id: 3,
    word: '쉬이방',
    createdAt: '2024-01-17T11:45:00',
  },
  {
    id: 4,
    word: '쉬이벌',
    createdAt: '2024-01-18T16:20:00',
  },
  {
    id: 5,
    word: '쉬이불',
    createdAt: '2024-01-19T13:10:00',
  },
  {
    id: 6,
    word: '쉬이붕',
    createdAt: '2024-01-20T10:25:00',
  },
  {
    id: 7,
    word: '쉬이빨',
    createdAt: '2024-01-21T15:40:00',
  },
  {
    id: 8,
    word: '쉬이팔',
    createdAt: '2024-01-22T12:55:00',
  },
  {
    id: 9,
    word: '쉬이펄',
    createdAt: '2024-01-23T08:35:00',
  },
  {
    id: 10,
    word: '쉬이풀',
    createdAt: '2024-01-24T17:05:00',
  },
];

const STORAGE_KEY = 'profanity-management-data';

const ProfanityManagementPage: React.FC = () => {
  const [data, setData] = useState<ProfanityRow[]>(dummyData);
  const [isLoaded, setIsLoaded] = useState(false);
  const [newWord, setNewWord] = useState('');
  const [modal, setModal] = useState<{ open: boolean; message: string }>({
    open: false,
    message: '',
  });

  // 컴포넌트 마운트 시 localStorage에서 데이터 로드
  useEffect(() => {
    // 개발 중에는 localStorage를 강제로 초기화
    localStorage.removeItem(STORAGE_KEY);
    setData(dummyData);
    setIsLoaded(true);

    // 실제 운영 시
    // const savedData = localStorage.getItem(STORAGE_KEY);
    // if (savedData) {
    //   try {
    //     const parsedData = JSON.parse(savedData);
    //     setData(parsedData);
    //   } catch (error) {
    //     console.error('Failed to parse saved data:', error);
    //     setData(dummyData);
    //   }
    // }
    // setIsLoaded(true);
  }, []);

  // 데이터가 변경될 때마다 localStorage에 저장 (isLoaded가 true일 때만)
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  }, [data, isLoaded]);

  const handleDelete = (row: ProfanityRow) => {
    setData((prev) => {
      const filteredData = prev.filter((item) => item.id !== row.id);
      // ID를 1부터 순차적으로 재할당
      return filteredData.map((item, index) => ({
        ...item,
        id: index + 1,
      }));
    });
    setModal({ open: true, message: '금칙어가 삭제되었습니다.' });
  };

  const handleAdd = () => {
    if (!newWord.trim()) {
      setModal({ open: true, message: '금칙어를 입력해주세요.' });
      return;
    }

    // 중복 체크
    const isDuplicate = data.some(
      (item) => item.word.trim().toLowerCase() === newWord.trim().toLowerCase(),
    );
    if (isDuplicate) {
      setModal({ open: true, message: '이미 등록된 금칙어입니다.' });
      return;
    }

    const newId = data.length > 0 ? Math.max(...data.map((item) => item.id)) + 1 : 1;
    const newProfanity: ProfanityRow = {
      id: newId,
      word: newWord.trim(),
      createdAt: new Date().toISOString(),
    };

    setData((prev) => [...prev, newProfanity]);
    setNewWord('');
    setModal({ open: true, message: '금칙어가 추가되었습니다.' });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  // 데이터 초기화 함수 (개발용)
  const handleResetData = () => {
    setData(dummyData);
    setModal({ open: true, message: '데이터가 초기화되었습니다.' });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-black">금칙어 설정</h2>
        <button
          onClick={handleResetData}
          className="px-3 py-1 text-sm bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
        >
          데이터 초기화
        </button>
      </div>

      {/* 금칙어 목록 테이블 */}
      <div className="mb-8">
        <ProfanityTable data={data} onDeleteClick={handleDelete} />
      </div>

      {/* 금칙어 추가 섹션 */}
      <div className="flex items-center gap-4">
        <h3 className="text-lg font-semibold text-black">금칙어 추가</h3>
        <input
          type="text"
          value={newWord}
          onChange={(e) => setNewWord(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="등록할할 금칙어를 입력하세요."
          className="w-80 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black placeholder-gray-500"
        />
        <button
          onClick={handleAdd}
          className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          추가
        </button>
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

export default ProfanityManagementPage;
