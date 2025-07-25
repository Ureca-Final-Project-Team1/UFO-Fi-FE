'use client';

import React from 'react';

import { useReportedPosts } from '@/features/admin/hooks/useReportedPosts';
import { useModal } from '@/shared/hooks/useModal';
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
  reportContents: string[];
  reportReason: string;
}

export default function AdminReportedPostsPage() {
  const { reportedPosts, isLoading, error, rollBackReport, refreshData } = useReportedPosts();
  const { openModal, showConfirm } = useModal();

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
    showConfirm('신고 해지', `게시물 ID ${row.postId}의 신고를 해지하시겠습니까?`, () =>
      rollBackReport(row.postId),
    );
  }

  function handleViewDetails(row: ReportedPostTableRow) {
    const statusColor =
      row.tradePostStatus === 'DELETED'
        ? 'text-red-600'
        : row.tradePostStatus === 'REPORTED'
          ? 'text-orange-600'
          : row.tradePostStatus === 'SOLD_OUT'
            ? 'text-gray-600'
            : row.tradePostStatus === 'EXPIRED'
              ? 'text-yellow-600'
              : 'text-green-600';

    const reportCountColor =
      Number(row.reportCount) >= 10
        ? 'text-red-600'
        : Number(row.reportCount) >= 5
          ? 'text-orange-600'
          : 'text-gray-600';

    openModal('reportedPostDetails', {
      title: '신고된 게시물 상세 정보',
      size: 'lg',
      type: 'single',
      headerAlign: 'left',
      hasCloseButton: true,
      primaryButtonText: '확인',
      children: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-500">게시물 ID</span>
                <span className="text-sm font-semibold text-gray-900">{row.postId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-500">사용자 ID</span>
                <span className="text-sm font-semibold text-gray-900">{row.userId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-500">신고 횟수</span>
                <span className={`text-sm font-semibold ${reportCountColor}`}>
                  {row.reportCount}회
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-500">상태</span>
                <span className={`text-sm font-semibold ${statusColor}`}>
                  {row.tradePostStatus}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-500">신고일</span>
                <span className="text-sm font-semibold text-gray-900">
                  {new Date(row.createdAt).toLocaleDateString('ko-KR')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-500">신고 시간</span>
                <span className="text-sm font-semibold text-gray-900">
                  {new Date(row.createdAt).toLocaleTimeString('ko-KR')}
                </span>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="text-sm font-medium text-gray-700 mb-3">신고 사유</h4>
            {row.reportContents && row.reportContents.length > 0 ? (
              <div className="space-y-2">
                {row.reportContents.map((content, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <span className="text-xs text-gray-400 mt-1">{index + 1}.</span>
                    <span className="text-sm text-gray-900 flex-1">{content}</span>
                  </div>
                ))}
              </div>
            ) : (
              <span className="text-sm text-gray-500">신고 사유가 없습니다.</span>
            )}
          </div>
        </div>
      ),
    });
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
