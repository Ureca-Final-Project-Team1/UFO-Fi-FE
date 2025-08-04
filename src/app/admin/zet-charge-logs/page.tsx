'use client';

import React, { useState, useEffect } from 'react';

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
  amount: number;
  status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';
  createdAt: string;
}

// TODO: 더미데이터
const DUMMY_CHARGE_LOGS: ChargeLogTableRow[] = [
  {
    id: 1,
    orderId: 'ORDER_2025080401',
    userId: 1001,
    userName: '정지호',
    amount: 50000,
    status: 'COMPLETED',
    createdAt: '2025-08-04T10:30:00Z',
  },
  {
    id: 2,
    orderId: 'ORDER_2025080402',
    userId: 1002,
    userName: '송현규',
    amount: 30000,
    status: 'COMPLETED',
    createdAt: '2025-08-04T11:15:00Z',
  },
  {
    id: 3,
    orderId: 'ORDER_2025080403',
    userId: 1003,
    userName: '정민경',
    amount: 100000,
    status: 'FAILED',
    createdAt: '2025-08-04T12:00:00Z',
  },
];

// 더미 로그 상세 데이터
const DUMMY_LOG_DETAILS = {
  1: {
    title: 'ZET 충전 성공 - ORDER_2025080401',
    request: {
      orderId: 'ORDER_2025080401',
      userId: 1001,
      amount: 50000,
      paymentMethod: 'CARD',
      timestamp: '2025-08-04T10:30:00Z',
    },
    tossResponse: {
      paymentKey: 'tgen_20250804103001_ABC123',
      orderId: 'ORDER_2025080401',
      status: 'DONE',
      totalAmount: 50000,
      method: '카드',
      approvedAt: '2025-08-04T10:30:15Z',
    },
    statusTransition: [
      { status: 'PENDING', timestamp: '2025-08-04T10:30:00Z', description: '결제 요청' },
      { status: 'PROCESSING', timestamp: '2025-08-04T10:30:10Z', description: '토스 결제 처리중' },
      {
        status: 'COMPLETED',
        timestamp: '2025-08-04T10:30:15Z',
        description: '결제 완료 및 ZET 지급',
      },
    ],
  },
  2: {
    title: 'ZET 충전 성공 - ORDER_2025080402',
    request: {
      orderId: 'ORDER_2025080402',
      userId: 1002,
      amount: 30000,
      paymentMethod: 'CARD',
      timestamp: '2025-08-04T11:15:00Z',
    },
    tossResponse: {
      paymentKey: 'tgen_20250804111501_DEF456',
      orderId: 'ORDER_2025080402',
      status: 'DONE',
      totalAmount: 30000,
      method: '카드',
      approvedAt: '2025-08-04T11:15:20Z',
    },
    statusTransition: [
      { status: 'PENDING', timestamp: '2025-08-04T11:15:00Z', description: '결제 요청' },
      { status: 'PROCESSING', timestamp: '2025-08-04T11:15:12Z', description: '토스 결제 처리중' },
      {
        status: 'COMPLETED',
        timestamp: '2025-08-04T11:15:20Z',
        description: '결제 완료 및 ZET 지급',
      },
    ],
  },
  3: {
    title: 'ZET 충전 실패 - ORDER_2025080403',
    request: {
      orderId: 'ORDER_2025080403',
      userId: 1003,
      paymentMethod: 'CARD',
      timestamp: '2025-08-04T12:00:00Z',
    },
    tossResponse: {
      paymentKey: null,
      orderId: 'ORDER_2025080403',
      status: 'FAILED',
      totalAmount: 100000,
      method: '카드',
      failReason: '한도 초과',
      failedAt: '2025-08-04T12:00:25Z',
    },
    statusTransition: [
      { status: 'PENDING', timestamp: '2025-08-04T12:00:00Z', description: '결제 요청' },
      { status: 'PROCESSING', timestamp: '2025-08-04T12:00:15Z', description: '토스 결제 처리중' },
      { status: 'FAILED', timestamp: '2025-08-04T12:00:25Z', description: '결제 실패 - 한도 초과' },
    ],
  },
};

export default function AdminZetChargeLogsPage() {
  const [chargeLogs, setChargeLogs] = useState<ChargeLogTableRow[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const { openModal } = useModal();

  // 더미 데이터 로드
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setChargeLogs(DUMMY_CHARGE_LOGS);
      setTotalElements(DUMMY_CHARGE_LOGS.length);
      setTotalPages(Math.ceil(DUMMY_CHARGE_LOGS.length / pageSize));
      setIsLoading(false);
    }, 500);
  }, [pageSize]);

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
      accessor: 'amount',
      width: '120px',
      render: (value: unknown) => (
        <span className="font-semibold text-blue-600">{Number(value).toLocaleString()}원</span>
      ),
    },
    {
      Header: '상태',
      accessor: 'status',
      width: '100px',
      render: (value: unknown) => {
        const status = String(value);
        const statusColors = {
          COMPLETED: 'bg-green-100 text-green-800',
          PENDING: 'bg-yellow-100 text-yellow-800',
          FAILED: 'bg-red-100 text-red-800',
          CANCELLED: 'bg-gray-100 text-gray-800',
        };
        const statusLabels = {
          COMPLETED: '완료',
          PENDING: '대기',
          FAILED: '실패',
          CANCELLED: '취소',
        };

        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status as keyof typeof statusColors]}`}
          >
            {statusLabels[status as keyof typeof statusLabels] || status}
          </span>
        );
      },
    },
    {
      Header: '발행시각',
      accessor: 'createdAt',
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
    const logDetail = DUMMY_LOG_DETAILS[row.id as keyof typeof DUMMY_LOG_DETAILS];

    if (!logDetail) {
      return;
    }

    openModal('chargeLogDetails', {
      title: logDetail.title,
      size: 'lg',
      type: 'single',
      headerAlign: 'left',
      hasCloseButton: true,
      primaryButtonText: '확인',
      children: (
        <div className="space-y-6 max-h-10 max-w-md overflow-y-auto">
          {/* 요청 정보 */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">요청 정보</h4>
            <div className="bg-gray-50 rounded-lg p-4">
              <pre className="text-sm text-gray-800 whitespace-pre-wrap">
                {JSON.stringify(logDetail.request, null, 2)}
              </pre>
            </div>
          </div>

          {/* 토스 응답 */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">토스 응답</h4>
            <div className="bg-gray-50 rounded-lg p-4">
              <pre className="text-sm text-gray-800 whitespace-pre-wrap">
                {JSON.stringify(logDetail.tossResponse, null, 2)}
              </pre>
            </div>
          </div>

          {/* 상태 전이 */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">상태 전이</h4>
            <div className="space-y-3">
              {logDetail.statusTransition.map((transition, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        transition.status === 'COMPLETED'
                          ? 'bg-green-500'
                          : transition.status === 'FAILED'
                            ? 'bg-red-500'
                            : transition.status === 'PROCESSING'
                              ? 'bg-yellow-500'
                              : 'bg-gray-400'
                      }`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-semibold text-gray-900">
                        {transition.status}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(transition.timestamp).toLocaleString('ko-KR')}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{transition.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    });
  }

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setChargeLogs([...DUMMY_CHARGE_LOGS]);
      setIsLoading(false);
    }, 500);
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

            {/* 통계 카드 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2">전체 충전</h3>
                <p className="text-2xl font-bold text-blue-600">{chargeLogs.length}</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2">성공</h3>
                <p className="text-2xl font-bold text-green-600">
                  {chargeLogs.filter((log) => log.status === 'COMPLETED').length}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2">실패</h3>
                <p className="text-2xl font-bold text-red-600">
                  {chargeLogs.filter((log) => log.status === 'FAILED').length}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2">총 충전액</h3>
                <p className="text-2xl font-bold text-purple-600">
                  {chargeLogs
                    .filter((log) => log.status === 'COMPLETED')
                    .reduce((sum, log) => sum + log.amount, 0)
                    .toLocaleString()}
                  원
                </p>
              </div>
            </div>

            {/* 충전 내역 로그 테이블 */}
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
