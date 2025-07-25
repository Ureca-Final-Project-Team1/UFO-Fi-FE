'use client';

import Header from '@/shared/ui/Header/Header';
import Sidebar from '@/shared/ui/Sidebar/Sidebar';
import { Table } from '@/shared/ui/Table/Table';

export default function AdminReportedPostsPage() {
  const reportedPostsData = [
    {
      id: 1,
      postId: 'POST_1',
      reason: '욕설/혐오 표현',
      reporter: '신고자1',
      date: '2024-01-01',
      status: '대기중',
    },
    {
      id: 2,
      postId: 'POST_2',
      reason: '욕설/혐오 표현',
      reporter: '신고자2',
      date: '2024-01-02',
      status: '대기중',
    },
    {
      id: 3,
      postId: 'POST_3',
      reason: '욕설/혐오 표현',
      reporter: '신고자3',
      date: '2024-01-03',
      status: '대기중',
    },
  ];

  const columns = [
    { Header: '게시물 ID', accessor: 'postId' as const },
    { Header: '신고 사유', accessor: 'reason' as const },
    { Header: '신고자', accessor: 'reporter' as const },
    { Header: '신고일', accessor: 'date' as const },
    {
      Header: '처리 상태',
      accessor: 'status' as const,
      render: (value: unknown) => (
        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
          {String(value)}
        </span>
      ),
    },
    {
      Header: '관리',
      accessor: 'actions' as const,
      render: () => (
        <div className="flex gap-2">
          <button className="text-green-600 hover:text-green-900 mr-3">승인</button>
          <button className="text-red-600 hover:text-red-900">거부</button>
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
            <h1 className="text-2xl font-bold text-gray-900 mb-6">신고된 게시물</h1>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <Table columns={columns} data={reportedPostsData} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
