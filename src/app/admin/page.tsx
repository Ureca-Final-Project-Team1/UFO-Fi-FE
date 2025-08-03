'use client';

import { useEffect, useState } from 'react';

import { statisticsService, type StatisticsData } from '@/api';
import { Header, Sidebar, Skeleton } from '@/shared';

const ANALYTICS_LINKS = [
  {
    id: 'ga4',
    title: 'GA4 실시간 이벤트 보기 (DebugView)',
    url: process.env.NEXT_PUBLIC_GA4_URL || '#',
    icon: '📊',
  },
  {
    id: 'gtm',
    title: 'GTM 태그 설정 (Google Tag Manager)',
    url: process.env.NEXT_PUBLIC_GTM_URL || '#',
    icon: '🏷️',
  },
  {
    id: 'clarity',
    title: 'Microsoft Clarity 세션 보기',
    url: process.env.NEXT_PUBLIC_CLARITY_URL || '#',
    icon: '🔍',
  },
];

export default function AdminPage() {
  const [statistics, setStatistics] = useState<StatisticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        setLoading(true);
        const response = await statisticsService.getStatistics();
        setStatistics(response.content);
      } catch (err) {
        console.error('통계 데이터 로딩 실패:', err);
        setError('통계 데이터를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-50">
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header userName="Admin" />
          <main className="flex-1 overflow-y-auto p-4 lg:p-8">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">대시보드</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="bg-white rounded-lg shadow p-6">
                    <Skeleton className="h-4 w-3/4 mb-2" />
                    <Skeleton className="h-8 w-1/2" />
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen bg-gray-50">
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header userName="Admin" />
          <main className="flex-1 overflow-y-auto p-4 lg:p-8">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">대시보드</h1>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-600">{error}</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - 데스크탑에서만 표시 */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header userName="Admin" />

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">대시보드</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">전체 사용자</h3>
                <p className="text-3xl font-bold text-blue-600">
                  {statistics?.allUsersCount?.toLocaleString() || 0}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">활성 사용자</h3>
                <p className="text-3xl font-bold text-green-600">
                  {statistics?.notReportedUsersCount?.toLocaleString() || 0}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">전체 게시물</h3>
                <p className="text-3xl font-bold text-purple-600">
                  {statistics?.allTradePostsCount?.toLocaleString() || 0}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">신고 접수</h3>
                <p className="text-3xl font-bold text-red-600">
                  {statistics?.allReportCount?.toLocaleString() || 0}
                </p>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Analytics 도구 대시보드 바로가기
                </h3>

                <ul className="space-y-3 text-sm">
                  {ANALYTICS_LINKS.map((link) => (
                    <li key={link.id}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        {link.icon} {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
