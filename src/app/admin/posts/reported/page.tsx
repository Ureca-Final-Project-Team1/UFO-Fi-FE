'use client';

import React from 'react';

import { useReportedPosts } from '@/features/admin/hooks/useReportedPosts';
import { Button } from '@/shared/ui/Button/Button';
import Header from '@/shared/ui/Header/Header';
import Sidebar from '@/shared/ui/Sidebar/Sidebar';
import { AdminTable } from '@/shared/ui/Table/AdminTable';
import { TableColumn, TableActions, BaseTableRow } from '@/shared/ui/Table/Table.types';

interface ReportedPostTableRow extends BaseTableRow {
  id: number;
  postId: number;
  userId: number;
  reportCount: number;
  tradePostStatus: 'SELLING' | 'SOLD_OUT' | 'REPORTED' | 'EXPIRED' | 'DELETED';
  createdAt: string;
  reportContents: string[] | null;
  reportReason: string;
}

export default function AdminReportedPostsPage() {
  const { reportedPosts, isLoading, error, rollBackReport, refreshData } = useReportedPosts();

  const columns: TableColumn<ReportedPostTableRow>[] = [
    {
      Header: '게시물 ID',
      accessor: 'postId',
      width: '100px',
      mobileHidden: true,
    },
    {
      Header: '사용자 ID',
      accessor: 'userId',
      width: '100px',
      mobileHidden: true,
    },
    {
      Header: '신고 횟수',
      accessor: 'reportCount',
      width: '100px',
      render: (value: unknown) => (
        <span
          className={`font-semibold ${
            Number(value) >= 10
              ? 'text-red-600'
              : Number(value) >= 5
                ? 'text-orange-600'
                : 'text-gray-600'
          }`}
        >
          {Number(value)}회
        </span>
      ),
    },
    {
      Header: '신고 사유',
      accessor: 'reportReason',
      width: '1fr',
      render: (value: unknown, row: ReportedPostTableRow) => (
        <div className="max-w-xs">
          <div className="text-sm text-gray-900 truncate">
            {row.reportContents && row.reportContents.length > 0
              ? row.reportContents[0]
              : '사유 없음'}
          </div>
          {row.reportContents && row.reportContents.length > 1 && (
            <div className="text-xs text-gray-500">외 {row.reportContents.length - 1}건</div>
          )}
        </div>
      ),
    },
    {
      Header: '신고일',
      accessor: 'createdAt',
      width: '120px',
      mobileHidden: true,
      render: (value: unknown) => new Date(String(value)).toLocaleDateString('ko-KR'),
    },
  ];

  const tableData: ReportedPostTableRow[] = reportedPosts.map((post) => ({
    ...post,
    id: post.postId,
    reportReason:
      post.reportContents && post.reportContents.length > 0
        ? post.reportContents.join(', ')
        : '사유 없음',
  }));

  const actions: TableActions<ReportedPostTableRow> = {
    activate: {
      onClick: handleRollBackReport,
      tooltip: '신고 해지',
    },
    custom: [
      {
        icon: <span className="text-xs">상세</span>,
        onClick: handleViewDetails,
        tooltip: '상세 정보 보기',
        variant: 'secondary',
      },
    ],
  };

  async function handleRollBackReport(row: ReportedPostTableRow) {
    if (!confirm(`게시물 ID ${row.postId}의 신고를 해지하시겠습니까?`)) {
      return;
    }

    await rollBackReport(row.postId);
  }

  function handleViewDetails(row: ReportedPostTableRow) {
    const reportContentsText =
      row.reportContents && row.reportContents.length > 0
        ? row.reportContents.map((content, index) => `${index + 1}. ${content}`).join('\n')
        : '신고 사유가 없습니다.';

    const details = `
      게시물 ID: ${row.postId}
      사용자 ID: ${row.userId}
      신고 횟수: ${row.reportCount}회
      상태: ${row.tradePostStatus}
      신고 사유들:
      ${reportContentsText}
      신고일: ${new Date(row.createdAt).toLocaleString('ko-KR')}
    `;

    alert(details);
  }

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
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
              <h1 className="text-2xl font-bold text-gray-900">신고된 게시물</h1>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={refreshData}
                  disabled={isLoading}
                  icon="RefreshCw"
                >
                  새로고침
                </Button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
                <p className="text-sm">{error}</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2">총 신고된 게시물</h3>
                <p className="text-2xl font-bold text-red-600">{reportedPosts.length}</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2">처리 대기</h3>
                <p className="text-2xl font-bold text-orange-600">
                  {reportedPosts.filter((post) => post.tradePostStatus === 'DELETED').length}
                </p>
              </div>
            </div>

            <AdminTable
              title="신고된 게시물 목록"
              description="사용자에 의해 신고된 게시물을 관리할 수 있습니다."
              columns={columns}
              data={tableData}
              actions={actions}
              isLoading={isLoading}
              emptyMessage="신고된 게시물이 없습니다."
            />
          </div>
        </main>
      </div>
    </div>
  );
}
