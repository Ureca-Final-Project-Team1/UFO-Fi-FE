'use client';

import React, { useState, useEffect } from 'react';

import { Modal } from '@/shared';

import ProfanityTable from './ProfanityTable';
import { ProfanityRow } from '../types/profanity';

const dummyData: ProfanityRow[] = [
  {
    id: 1,
    word: '쉬뿔',
    createdAt: '',
  },
  {
    id: 2,
    word: '쉬이발',
    createdAt: '',
  },
  {
    id: 3,
    word: '쉬이방',
    createdAt: '',
  },
  {
    id: 4,
    word: '쉬이벌',
    createdAt: '',
  },
  {
    id: 5,
    word: '쉬이불',
    createdAt: '',
  },
  {
    id: 6,
    word: '쉬이붕',
    createdAt: '',
  },
  {
    id: 7,
    word: '쉬이빨',
    createdAt: '',
  },
  {
    id: 8,
    word: '쉬이팔',
    createdAt: '',
  },
  {
    id: 9,
    word: '쉬이펄',
    createdAt: '',
  },
  {
    id: 10,
    word: '쉬이풀',
    createdAt: '',
  },
  {
    id: 11,
    word: '쉬파',
    createdAt: '',
  },
  {
    id: 12,
    word: '쉬팍',
    createdAt: '',
  },
  {
    id: 13,
    word: '쉬팍아',
    createdAt: '',
  },
  {
    id: 14,
    word: '쉬팔',
    createdAt: '',
  },
  {
    id: 15,
    word: '쉬팡',
    createdAt: '',
  },
  {
    id: 16,
    word: '쉬퍼얼',
    createdAt: '',
  },
  {
    id: 17,
    word: '쉬펄',
    createdAt: '',
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

  const handleDelete = (row: ProfanityRow) => {
    setData((prev) => prev.filter((item) => item.id !== row.id));
    setModal({ open: true, message: '금칙어가 삭제되었습니다.' });
  };

  const handleAdd = () => {
    if (!newWord.trim()) {
      setModal({ open: true, message: '금칙어를 입력해주세요.' });
      return;
    }

    const newId = Math.max(...data.map((item) => item.id)) + 1;
    const newProfanity: ProfanityRow = {
      id: newId,
      word: newWord.trim(),
      createdAt: new Date().toISOString().split('T')[0], // YYYY-MM-DD 형식
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

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-black">금칙어 설정</h2>

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
          placeholder="등록을 원하시는 금칙어를 입력하세요."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
