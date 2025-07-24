import Header from '@/shared/ui/Header/Header';
import Sidebar from '@/shared/ui/Sidebar/Sidebar';

export default function AdminBannedWordsPage() {
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
            <h1 className="text-2xl font-bold text-gray-900 mb-6">금칙어 설정</h1>

            {/* 금칙어 추가 */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">새 금칙어 추가</h3>
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="금칙어 입력..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                />
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  추가
                </button>
              </div>
            </div>

            {/* 금칙어 목록 */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      금칙어
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      등록일
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      관리
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {['욕설1', '욕설2', '스팸'].map((word, i) => (
                    <tr key={i}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{word}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        2024-01-{(i + 1).toString().padStart(2, '0')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">수정</button>
                        <button className="text-red-600 hover:text-red-900">삭제</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
