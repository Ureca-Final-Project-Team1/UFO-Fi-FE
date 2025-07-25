'use client';

import React, { useState } from 'react';
import { toast } from 'sonner';

import type { BannedWord } from '@/api/types/bannedWords';
import { useBannedWords } from '@/features/admin/hooks/useBannedWords';
import { Button } from '@/shared/ui/Button/Button';
import Header from '@/shared/ui/Header/Header';
import { Input } from '@/shared/ui/Input/Input';
import Sidebar from '@/shared/ui/Sidebar/Sidebar';
import { EnhancedTable } from '@/shared/ui/Table/EnhancedTable';

interface BannedWordTableRow extends BannedWord {
  createdAt: string;
  actions: {
    hideActivate: boolean;
  };
}

export default function AdminBannedWordsPage() {
  const [newWord, setNewWord] = useState('');
  const [isAddingWord, setIsAddingWord] = useState(false);

  const {
    bannedWords,
    totalPages,
    totalElements,
    currentPage,
    pageSize,
    isLoading,
    error,
    selectedIds,
    createBannedWord,
    deleteBannedWords,
    deleteSingleBannedWord,
    setCurrentPage,
    setPageSize,
    setSelectedIds,
  } = useBannedWords();

  // EnhancedTable용 컬럼 정의 (반응형 설정 포함)
  const columns = [
    {
      Header: 'ID',
      accessor: 'id',
      width: '80px',
      mobileHidden: true, // 모바일에서 숨김
    },
    {
      Header: '금칙어',
      accessor: 'word',
      width: '1fr', // 가변 너비
    },
    {
      Header: '등록일',
      accessor: 'createdAt',
      width: '120px',
      mobileHidden: true, // 모바일에서 숨김
    },
  ];

  const tableData: BannedWordTableRow[] = bannedWords.map((word) => ({
    ...word,
    createdAt: new Date().toLocaleDateString('ko-KR'), // 임시 날짜
    actions: {
      hideActivate: true,
    },
  }));

  // 금칙어 추가
  const handleAddWord = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newWord.trim()) {
      toast.error('금칙어를 입력해주세요.');
      return;
    }

    if (bannedWords.some((word: BannedWord) => word.word === newWord.trim())) {
      toast.error('이미 등록된 금칙어입니다.');
      return;
    }

    try {
      setIsAddingWord(true);
      await createBannedWord(newWord.trim());
      setNewWord('');
    } finally {
      setIsAddingWord(false);
    }
  };

  // 단일 금칙어 삭제 (비활성화 버튼 사용)
  const handleDeleteSingle = async (row: BannedWordTableRow) => {
    if (!confirm(`"${row.word}" 금칙어를 삭제하시겠습니까?`)) {
      return;
    }

    await deleteSingleBannedWord(row.id);
  };

  // 선택된 금칙어 일괄 삭제
  const handleDeleteSelected = async () => {
    if (selectedIds.length === 0) {
      toast.error('삭제할 금칙어를 선택해주세요.');
      return;
    }

    if (!confirm(`선택된 ${selectedIds.length}개의 금칙어를 삭제하시겠습니까?`)) {
      return;
    }

    await deleteBannedWords(selectedIds);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* 사이드바 - 데스크톱에서만 표시 */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header userName="Admin" />

        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {/* 페이지 헤더 */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
              <h1 className="text-2xl font-bold text-gray-900">금칙어 설정</h1>
              <div className="text-sm text-gray-600">총 {totalElements}개의 금칙어</div>
            </div>

            {/* 에러 메시지 */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
                <p className="text-sm">{error}</p>
              </div>
            )}

            {/* 금칙어 추가 폼 */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">새 금칙어 추가</h3>
              <form onSubmit={handleAddWord} className="flex flex-col sm:flex-row gap-4">
                <Input
                  type="text"
                  placeholder="금칙어 입력..."
                  value={newWord}
                  onChange={(e) => setNewWord(e.target.value)}
                  className="flex-1"
                  disabled={isAddingWord}
                />
                <Button
                  type="submit"
                  disabled={isAddingWord || !newWord.trim()}
                  className="sm:w-auto w-full"
                >
                  {isAddingWord ? '추가 중...' : '추가'}
                </Button>
              </form>
            </div>

            {/* 선택된 항목 일괄 삭제 버튼 - 헤더와 테이블 사이로 이동 */}
            {selectedIds.length > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-blue-700 font-medium">
                      {selectedIds.length}개의 금칙어가 선택되었습니다.
                    </span>
                  </div>
                  <Button
                    onClick={handleDeleteSelected}
                    variant="destructive"
                    disabled={isLoading}
                    className="w-full sm:w-auto"
                  >
                    {isLoading ? '삭제 중...' : `선택된 ${selectedIds.length}개 삭제`}
                  </Button>
                </div>
              </div>
            )}

            {/* 금칙어 목록 테이블 */}
            <EnhancedTable
              columns={columns}
              data={tableData}
              enableSelection={true}
              selectedIds={selectedIds}
              onSelectionChange={setSelectedIds}
              onDeactivateClick={handleDeleteSingle}
              showPagination={true}
              currentPage={currentPage}
              totalPages={totalPages}
              pageSize={pageSize}
              totalElements={totalElements}
              onPageChange={setCurrentPage}
              onPageSizeChange={setPageSize}
              isLoading={isLoading}
              emptyMessage="등록된 금칙어가 없습니다."
            />
          </div>
        </main>
      </div>
    </div>
  );
}
