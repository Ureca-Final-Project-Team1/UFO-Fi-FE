'use client';

import React, { useState } from 'react';
import { toast } from 'sonner';

import { BannedWord } from '@/backend/types/bannedWords';
import { useBannedWords } from '@/features/admin/hooks/useBannedWords';
import {
  Button,
  Header,
  Input,
  Sidebar,
  AdminTable,
  TableColumn,
  TableActions,
  TableSelection,
  TablePagination,
  BaseTableRow,
} from '@/shared';
import { useModal } from '@/shared/hooks/useModal';

interface BannedWordTableRow extends BannedWord, BaseTableRow {
  id: number;
  word: string;
  createdAt: string;
}

export default function AdminBannedWordsPage() {
  const [newWord, setNewWord] = useState('');
  const [isAddingWord, setIsAddingWord] = useState(false);

  const { showConfirm } = useModal();

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

  const columns: TableColumn<BannedWordTableRow>[] = [
    {
      Header: 'ID',
      accessor: 'id',
      width: '80px',
      mobileHidden: true,
    },
    {
      Header: '금칙어',
      accessor: 'word',
      width: '1fr',
    },
    {
      Header: '등록일',
      accessor: 'createdAt',
      width: '120px',
      mobileHidden: true,
    },
  ];

  // 테이블 데이터 변환
  const tableData: BannedWordTableRow[] = bannedWords.map((word) => ({
    ...word,
    createdAt: new Date().toLocaleDateString('ko-KR'),
  }));

  // 테이블 액션 정의
  const actions: TableActions<BannedWordTableRow> = {
    delete: {
      onClick: handleDeleteSingle,
      tooltip: '금칙어 삭제',
    },
  };

  // 선택 기능 설정
  const selection: TableSelection = {
    enabled: true,
    selectedIds,
    onSelectionChange: setSelectedIds,
    selectAllLabel: '모든 금칙어 선택',
  };

  // 페이지네이션 설정
  const pagination: TablePagination = {
    enabled: true,
    currentPage: currentPage + 1,
    totalPages,
    pageSize,
    totalElements,
    onPageChange: (page) => setCurrentPage(page - 1),
    onPageSizeChange: setPageSize,
    pageSizeOptions: [10, 20, 50],
  };

  // 금칙어 추가
  const handleAddWord = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isAddingWord) return;

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

  // 단일 금칙어 삭제
  async function handleDeleteSingle(row: BannedWordTableRow) {
    showConfirm('금칙어 삭제', `"${row.word}" 금칙어를 삭제하시겠습니까?`, () =>
      deleteSingleBannedWord(row.id),
    );
  }

  // 선택된 금칙어 일괄 삭제
  const handleDeleteSelected = async () => {
    if (selectedIds.length === 0) {
      toast.error('삭제할 금칙어를 선택해주세요.');
      return;
    }

    showConfirm(
      '금칙어 일괄 삭제',
      `선택된 ${selectedIds.length}개의 금칙어를 삭제하시겠습니까?`,
      () => deleteBannedWords(selectedIds),
    );
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

            {/* 선택된 항목 일괄 삭제 버튼 */}
            {selectedIds.length > 0 && (
              <div className="mb-4">
                <Button
                  onClick={handleDeleteSelected}
                  variant="destructive"
                  disabled={isLoading}
                  className="w-full sm:w-auto"
                >
                  선택된 {selectedIds.length}개 금칙어 삭제
                </Button>
              </div>
            )}

            {/* 금칙어 관리 테이블 */}
            <AdminTable
              title="금칙어 목록"
              description="등록된 금칙어를 관리할 수 있습니다."
              columns={columns}
              data={tableData}
              actions={actions}
              selection={selection}
              pagination={pagination}
              isLoading={isLoading}
              emptyMessage="등록된 금칙어가 없습니다."
            />
          </div>
        </main>
      </div>
    </div>
  );
}
