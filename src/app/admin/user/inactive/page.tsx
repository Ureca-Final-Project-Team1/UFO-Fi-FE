'use client';

import Header from '@/shared/ui/Header/Header';
import Sidebar from '@/shared/ui/Sidebar/Sidebar';
import { Table } from '@/shared/ui/Table/Table';

export default function AdminInactiveUsersPage() {
  const inactiveUsersData = [
    {
      id: 1,
      nickname: 'blocked_user1',
      email: 'blocked1@example.com',
      reason: '신고 누적',
      date: '2024-01-15',
      reports: 15,
    },
    {
      id: 2,
      nickname: 'suspended_user2',
      email: 'suspended2@example.com',
      reason: '약관 위반',
      date: '2024-01-14',
      reports: 8,
    },
    {
      id: 3,
      nickname: 'banned_user3',
      email: 'banned3@example.com',
      reason: '관리자 조치',
      date: '2024-01-13',
      reports: 23,
    },
    {
      id: 4,
      nickname: 'inactive_user4',
      email: 'inactive4@example.com',
      reason: '계정 정지',
      date: '2024-01-12',
      reports: 5,
    },
    {
      id: 5,
      nickname: 'frozen_user5',
      email: 'frozen5@example.com',
      reason: '신고 누적',
      date: '2024-01-11',
      reports: 12,
    },
  ];

  const columns = [
    { Header: 'ID', accessor: 'id' as const },
    { Header: '닉네임', accessor: 'nickname' as const },
    { Header: '이메일', accessor: 'email' as const },
    {
      Header: '비활성화 사유',
      accessor: 'reason' as const,
      render: (value: unknown) => {
        const getBadgeStyle = (reason: string) => {
          switch (reason) {
            case '신고 누적':
              return 'bg-red-100 text-red-800';
            case '약관 위반':
              return 'bg-orange-100 text-orange-800';
            case '관리자 조치':
              return 'bg-purple-100 text-purple-800';
            default:
              return 'bg-gray-100 text-gray-800';
          }
        };
        return (
          <span
            className={`px-2 py-1 text-xs font-semibold rounded-full ${getBadgeStyle(String(value))}`}
          >
            {String(value)}
          </span>
        );
      },
    },
    { Header: '비활성화 일시', accessor: 'date' as const },
    {
      Header: '신고 횟수',
      accessor: 'reports' as const,
      render: (value: unknown) => (
        <span
          className={`font-medium ${
            Number(value) >= 15
              ? 'text-red-600'
              : Number(value) >= 10
                ? 'text-orange-600'
                : 'text-gray-600'
          }`}
        >
          {Number(value)}회
        </span>
      ),
    },
    {
      Header: '관리',
      accessor: 'actions' as const,
      render: () => (
        <div className="flex gap-2">
          <button className="text-green-600 hover:text-green-900 text-sm font-medium">
            활성화
          </button>
          <button className="text-blue-600 hover:text-blue-900 text-sm font-medium">상세</button>
          <button className="text-red-600 hover:text-red-900 text-sm font-medium">영구삭제</button>
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
            <h1 className="text-2xl font-bold text-gray-900 mb-6">비활성화된 사용자</h1>

            {/* 필터링 */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="사용자 검색..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                />
                <select className="px-4 py-2 border border-gray-300 rounded-lg">
                  <option>비활성화 사유</option>
                  <option>신고 누적</option>
                  <option>약관 위반</option>
                  <option>관리자 조치</option>
                  <option>계정 정지</option>
                </select>
                <select className="px-4 py-2 border border-gray-300 rounded-lg">
                  <option>전체 기간</option>
                  <option>최근 1주일</option>
                  <option>최근 1개월</option>
                  <option>최근 3개월</option>
                </select>
              </div>
            </div>

            {/* 통계 카드 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2">총 비활성화 사용자</h3>
                <p className="text-2xl font-bold text-red-600">142</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2">신고 누적</h3>
                <p className="text-2xl font-bold text-orange-600">89</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2">약관 위반</h3>
                <p className="text-2xl font-bold text-purple-600">34</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2">관리자 조치</h3>
                <p className="text-2xl font-bold text-gray-600">19</p>
              </div>
            </div>

            {/* 비활성화 사용자 목록 */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">비활성화 사용자 목록</h3>
              </div>
              <Table columns={columns} data={inactiveUsersData} />
            </div>

            {/* 페이지네이션 */}
            <div className="mt-6 flex justify-between items-center">
              <div className="text-sm text-gray-500">총 142명 중 1-5명 표시</div>
              <div className="flex gap-2">
                <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                  이전
                </button>
                <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">1</button>
                <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                  2
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                  3
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                  다음
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
