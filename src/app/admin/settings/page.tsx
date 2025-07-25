import Header from '@/shared/ui/Header/Header';
import Sidebar from '@/shared/ui/Sidebar/Sidebar';

export default function AdminSettingsPage() {
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
            <h1 className="text-2xl font-bold text-gray-900 mb-6">시스템 설정</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 일반 설정 */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">일반 설정</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      사이트 제목
                    </label>
                    <input
                      type="text"
                      defaultValue="UFO-Fi Admin"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      유지보수 모드
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                      <option>비활성</option>
                      <option>활성</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 보안 설정 */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">보안 설정</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      세션 만료 시간 (분)
                    </label>
                    <input
                      type="number"
                      defaultValue="30"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      로그인 시도 제한
                    </label>
                    <input
                      type="number"
                      defaultValue="5"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* 알림 설정 */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">알림 설정</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input type="checkbox" defaultChecked className="mr-3" />
                    <label className="text-sm text-gray-700">새 사용자 가입 알림</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" defaultChecked className="mr-3" />
                    <label className="text-sm text-gray-700">신고 접수 알림</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="mr-3" />
                    <label className="text-sm text-gray-700">시스템 에러 알림</label>
                  </div>
                </div>
              </div>

              {/* 백업 설정 */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">백업 설정</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      자동 백업 주기
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                      <option>매일</option>
                      <option>매주</option>
                      <option>매월</option>
                    </select>
                  </div>
                  <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                    수동 백업 실행
                  </button>
                </div>
              </div>
            </div>

            {/* 저장 버튼 */}
            <div className="mt-6 flex justify-end">
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                설정 저장
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
