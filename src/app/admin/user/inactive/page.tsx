'use client';

import React, { useEffect, useState } from 'react';

import { statisticsService } from '@/backend/services/admin/statistics';
import type { ReportsStatisticsData } from '@/backend/types';
import { ReportedUser } from '@/backend/types/report';
import { useReportedUsers } from '@/features/admin/hooks/useReportedUsers';
import {
  Button,
  Header,
  Sidebar,
  Skeleton,
  AdminTable,
  TableColumn,
  TableActions,
  BaseTableRow,
} from '@/shared';
import { useModal } from '@/shared/hooks/useModal';

interface ReportedUserTableRow extends ReportedUser, BaseTableRow {
  id: number;
  userid: number;
  nickname: string;
  name: string;
  email: string;
}

export default function AdminInactiveUsersPage() {
  const { reportedUsers, isLoading, error, grantUser, refreshData } = useReportedUsers();
  const [reportsStatistics, setReportsStatistics] = useState<ReportsStatisticsData | null>(null);
  const [statisticsLoading, setStatisticsLoading] = useState(true);
  const [statisticsError, setStatisticsError] = useState<string | null>(null);

  // 비활성화 통계 데이터 가져오기
  const fetchReportsStatistics = async () => {
    try {
      setStatisticsLoading(true);
      const response = await statisticsService.getReportsStatistics();
      setReportsStatistics(response.content);
    } catch (err) {
      console.error('비활성화 통계 데이터 로딩 실패:', err);
      setStatisticsError('통계 데이터를 불러오는데 실패했습니다.');
    } finally {
      setStatisticsLoading(false);
    }
  };

  useEffect(() => {
    fetchReportsStatistics();
  }, []);

  const handleRefresh = () => {
    refreshData();
    fetchReportsStatistics();
  };
  const { showConfirm } = useModal();

  const columns: TableColumn<ReportedUserTableRow>[] = [
    {
      Header: 'ID',
      accessor: 'userid',
      width: '80px',
      mobileHidden: true,
    },
    {
      Header: '닉네임',
      accessor: 'nickname',
      width: '150px',
    },
    {
      Header: '이름',
      accessor: 'name',
      width: '120px',
      mobileHidden: true,
    },
    {
      Header: '이메일',
      accessor: 'email',
      width: '1fr',
    },
  ];

  // 테이블 데이터 변환
  const tableData: ReportedUserTableRow[] = reportedUsers.map((user) => ({
    ...user,
    id: user.userid,
  }));

  // 테이블 액션 정의
  const actions: TableActions<ReportedUserTableRow> = {
    activate: {
      onClick: handleActivateUser,
      tooltip: '사용자 활성화',
    },
  };

  // 사용자 활성화
  async function handleActivateUser(row: ReportedUserTableRow) {
    showConfirm('사용자 활성화', `"${row.nickname}" 사용자를 활성화하시겠습니까?`, () =>
      grantUser(row.userid),
    );
  }

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
              <h1 className="text-2xl font-bold text-gray-900">비활성화된 사용자</h1>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={handleRefresh}
                  disabled={isLoading || statisticsLoading}
                  icon="RefreshCw"
                >
                  새로고침
                </Button>
              </div>
            </div>

            {/* 에러 메시지 */}
            {(error || statisticsError) && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
                {error && <p className="text-sm">{error}</p>}
                {statisticsError && <p className="text-sm">{statisticsError}</p>}
              </div>
            )}

            {/* 통계 카드 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2">전체 사용자</h3>
                {statisticsLoading ? (
                  <Skeleton className="h-8 w-16" />
                ) : (
                  <p className="text-2xl font-bold text-blue-600">
                    {reportsStatistics?.allUsersCount?.toLocaleString() || 0}
                  </p>
                )}
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2">신고된 사용자</h3>
                {statisticsLoading ? (
                  <Skeleton className="h-8 w-16" />
                ) : (
                  <p className="text-2xl font-bold text-red-600">
                    {reportsStatistics?.reportedUsersCount?.toLocaleString() || 0}
                  </p>
                )}
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2">처리 대기</h3>
                <p className="text-2xl font-bold text-orange-600">{reportedUsers.length}</p>
              </div>
            </div>

            {/* 비활성화 사용자 관리 테이블 */}
            <AdminTable
              title="비활성화 사용자 목록"
              description="신고로 인해 비활성화된 사용자를 관리할 수 있습니다."
              columns={columns}
              data={tableData}
              actions={actions}
              isLoading={isLoading}
              emptyMessage="비활성화된 사용자가 없습니다."
            />
          </div>
        </main>
      </div>
    </div>
  );
}
