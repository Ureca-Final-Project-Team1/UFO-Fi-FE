'use client';

import Header from '@/shared/ui/Header/Header';
import Sidebar from '@/shared/ui/Sidebar/Sidebar';
import { Table } from '@/shared/ui/Table/Table';

export default function AdminBannedWordsPage() {
  const bannedWordsData = [
    { id: 1, word: '욕설1', date: '2024-01-01' },
    { id: 2, word: '욕설2', date: '2024-01-02' },
    { id: 3, word: '스팸', date: '2024-01-03' },
  ];

  const columns = [
    { Header: '금칙어', accessor: 'word' as const },
    { Header: '등록일', accessor: 'date' as const },
    {
      Header: '관리',
      accessor: 'actions' as const,
      render: () => (
        <div className="flex gap-2">
          <button className="text-blue-600 hover:text-blue-900 mr-3">수정</button>
          <button className="text-red-600 hover:text-red-900">삭제</button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header userName="Admin" />

        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">금칙어 설정</h1>

            {/* 금칙어 추가 */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">새 금칙어 추가</h3>
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="금칙어 입력..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                />
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  추가
                </button>
              </div>
            </div>

            {/* 금칙어 목록 */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <Table columns={columns} data={bannedWordsData} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
