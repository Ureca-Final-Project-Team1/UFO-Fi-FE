import Header from '@/shared/ui/Header/Header';
import Sidebar from '@/shared/ui/Sidebar/Sidebar';

export default function AdminPage() {
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
                <p className="text-3xl font-bold text-blue-600">1,234</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">활성 사용자</h3>
                <p className="text-3xl font-bold text-green-600">987</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">전체 게시물</h3>
                <p className="text-3xl font-bold text-purple-600">5,678</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">신고 접수</h3>
                <p className="text-3xl font-bold text-red-600">23</p>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">최근 활동</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">새로운 사용자 가입</span>
                    <span className="text-sm text-gray-500">2분 전</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">게시물 신고 접수</span>
                    <span className="text-sm text-gray-500">15분 전</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">시스템 업데이트 완료</span>
                    <span className="text-sm text-gray-500">1시간 전</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">시스템 상태</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">서버 상태</span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                      정상
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">데이터베이스</span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                      정상
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">API 응답시간</span>
                    <span className="text-sm text-gray-500">120ms</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
