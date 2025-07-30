'use client';

import { Table, Header, Sidebar } from '@/shared';

export default function AdminPostsPage() {
  const postsData = [
    { id: 1, title: '게시물 제목 1', author: '사용자1', date: '2024-01-01', status: '활성' },
    { id: 2, title: '게시물 제목 2', author: '사용자2', date: '2024-01-02', status: '활성' },
    { id: 3, title: '게시물 제목 3', author: '사용자3', date: '2024-01-03', status: '활성' },
    { id: 4, title: '게시물 제목 4', author: '사용자4', date: '2024-01-04', status: '활성' },
    { id: 5, title: '게시물 제목 5', author: '사용자5', date: '2024-01-05', status: '활성' },
  ];

  const columns = [
    { Header: 'ID', accessor: 'id' as const },
    { Header: '제목', accessor: 'title' as const },
    { Header: '작성자', accessor: 'author' as const },
    { Header: '작성일', accessor: 'date' as const },
    {
      Header: '상태',
      accessor: 'status' as const,
      render: (value: unknown) => (
        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
          {String(value)}
        </span>
      ),
    },
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
      {/* Sidebar - 데스크탑에서만 표시 */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header userName="Admin" />
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">전체 게시물</h1>

            {/* 검색/필터 */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="게시물 검색..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                />
                <select className="px-4 py-2 border border-gray-300 rounded-lg">
                  <option>전체 상태</option>
                  <option>활성</option>
                  <option>비활성</option>
                  <option>신고됨</option>
                </select>
              </div>
            </div>

            {/* 게시물 목록 */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <Table columns={columns} data={postsData} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
