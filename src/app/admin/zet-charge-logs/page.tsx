'use client';

import React, { useState, useEffect } from 'react';

import { zetRecoveryAPI } from '@/backend';
import {
  Button,
  Header,
  Sidebar,
  AdminTable,
  TableColumn,
  TableActions,
  TablePagination,
  BaseTableRow,
} from '@/shared';
import { useModal } from '@/shared/hooks/useModal';

interface ChargeLogTableRow extends BaseTableRow {
  id: number;
  orderId: string;
  userId: number;
  userName: string;
  price: number;
  paymentStatus: 'DONE' | 'FAIL' | 'IN_PROGRESS' | 'READY' | 'TIMEOUT';
  requestedAt: string;
}

export default function AdminZetChargeLogsPage() {
  const [chargeLogs, setChargeLogs] = useState<ChargeLogTableRow[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const { openModal } = useModal();

  useEffect(() => {
    const fetchLogs = async () => {
      setIsLoading(true);
      try {
        const response = await zetRecoveryAPI.getChargeLogs();
        const logs = response?.content?.paymentBackOfficesRes ?? [];

        const content: ChargeLogTableRow[] = logs.map((log) => ({
          id: log.id,
          orderId: log.orderId,
          userId: log.userId,
          userName: log.username || '-',
          price: log.price,
          paymentStatus: log.paymentStatus,
          requestedAt: log.requestedAt,
        }));

        setChargeLogs(content);
        setTotalPages(1);
        setTotalElements(logs.length);
      } catch (error) {
        console.error('ZET 충전 로그 조회 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLogs();
  }, [currentPage, pageSize]);

  const columns: TableColumn<ChargeLogTableRow>[] = [
    {
      Header: 'ID',
      accessor: 'id',
      width: '80px',
      mobileHidden: true,
    },
    {
      Header: '주문번호',
      accessor: 'orderId',
      width: '180px',
      render: (value: unknown) => <span className="font-mono text-sm">{String(value)}</span>,
    },
    {
      Header: '사용자 ID',
      accessor: 'userId',
      width: '100px',
      mobileHidden: true,
    },
    {
      Header: '사용자명',
      accessor: 'userName',
      width: '120px',
    },
    {
      Header: '충전금액',
      accessor: 'price',
      width: '120px',
      render: (value: unknown) => (
        <span className="font-semibold text-blue-600">{Number(value).toLocaleString()}원</span>
      ),
    },
    {
      Header: '상태',
      accessor: 'paymentStatus',
      width: '100px',
      render: (value: unknown) => {
        const status = String(value);
        const statusColors = {
          DONE: 'bg-green-100 text-green-800',
          IN_PROGRESS: 'bg-yellow-100 text-yellow-800',
          FAIL: 'bg-red-100 text-red-800',
          TIMEOUT: 'bg-gray-100 text-gray-800',
          READY: 'bg-gray-100 text-gray-800',
        };
        const statusLabels = {
          DONE: '완료',
          IN_PROGRESS: '진행중',
          FAIL: '실패',
          TIMEOUT: '시간초과',
          READY: '대기중',
        };

        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              statusColors[status as keyof typeof statusColors] || ''
            }`}
          >
            {statusLabels[status as keyof typeof statusLabels] || status}
          </span>
        );
      },
    },
    {
      Header: '발행시각',
      accessor: 'requestedAt',
      width: '140px',
      mobileHidden: true,
      render: (value: unknown) => new Date(String(value)).toLocaleString('ko-KR'),
    },
  ];

  const actions: TableActions<ChargeLogTableRow> = {
    custom: [
      {
        icon: <span className="text-xs">상세</span>,
        onClick: handleViewDetails,
        tooltip: '로그 상세 보기',
        variant: 'secondary',
      },
    ],
  };

  const pagination: TablePagination = {
    enabled: true,
    currentPage,
    totalPages,
    pageSize,
    totalElements,
    onPageChange: setCurrentPage,
    onPageSizeChange: setPageSize,
    pageSizeOptions: [10, 20, 50],
  };

  function handleViewDetails(row: ChargeLogTableRow) {
    setIsLoading(true);

    zetRecoveryAPI
      .getChargeLogDetail(row.id)
      .then((res) => {
        const { orderId, confirmReq, confirmResult, methodTrace } = res.content;

        openModal('chargeLogDetails', {
          title: `ZET 충전 로그 상세 - ${orderId}`,
          size: 'lg',
          type: 'single',
          headerAlign: 'left',
          hasCloseButton: true,
          primaryButtonText: '확인',
          children: (
            <div className="max-h-[70vh] overflow-y-auto pr-2 space-y-6">
              <div className="space-y-4 text-sm text-gray-800">
                <div>
                  <h4 className="text-gray-600 font-semibold">주문번호</h4>
                  <p className="mt-1">{orderId}</p>
                </div>

                <div>
                  <h4 className="text-gray-600 font-semibold">요청 데이터 (confirmReq)</h4>
                  <pre className="bg-white border border-gray-200 rounded p-3 whitespace-pre-wrap overflow-x-auto max-h-64">
                    {confirmReq}
                  </pre>
                </div>

                <div>
                  <h4 className="text-gray-600 font-semibold">응답 데이터 (confirmResult)</h4>
                  <pre className="bg-white border border-gray-200 rounded p-3 whitespace-pre-wrap overflow-x-auto max-h-64">
                    {confirmResult}
                  </pre>
                </div>

                <div>
                  <h4 className="text-gray-600 font-semibold">메서드 트레이스</h4>
                  <pre className="bg-white border border-gray-200 rounded p-3 whitespace-pre-wrap overflow-x-auto max-h-64">
                    {methodTrace}
                  </pre>
                </div>
              </div>
            </div>
          ),
        });
      })
      .catch((err) => {
        console.error('충전 로그 상세 조회 실패:', err);
        openModal('alert', {
          title: '오류',
          description: '상세 로그를 불러오는 데 실패했습니다.',
          primaryButtonText: '확인',
        });
      })
      .finally(() => setIsLoading(false));
  }

  const handleRefresh = () => {
    setCurrentPage(0);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header userName="Admin" />
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
              <h1 className="text-2xl font-bold text-gray-900">ZET 충전 내역 로그</h1>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={handleRefresh}
                  disabled={isLoading}
                  icon="RefreshCw"
                >
                  새로고침
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2">전체 충전</h3>
                <p className="text-2xl font-bold text-blue-600">{chargeLogs.length}</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2">성공</h3>
                <p className="text-2xl font-bold text-green-600">
                  {chargeLogs.filter((log) => log.paymentStatus === 'DONE').length}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2">실패</h3>
                <p className="text-2xl font-bold text-red-600">
                  {chargeLogs.filter((log) => log.paymentStatus === 'FAIL').length}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2">총 충전액</h3>
                <p className="text-2xl font-bold text-purple-600">
                  {chargeLogs
                    .filter((log) => log.paymentStatus === 'DONE')
                    .reduce((sum, log) => sum + log.price, 0)
                    .toLocaleString()}
                  원
                </p>
              </div>
            </div>

            <AdminTable
              title="충전 내역 로그"
              description="사용자들의 ZET 충전 내역과 결제 로그를 확인할 수 있습니다."
              columns={columns}
              data={chargeLogs}
              actions={actions}
              pagination={pagination}
              isLoading={isLoading}
              emptyMessage="충전 내역이 없습니다."
            />
          </div>
        </main>
      </div>
    </div>
  );
}
