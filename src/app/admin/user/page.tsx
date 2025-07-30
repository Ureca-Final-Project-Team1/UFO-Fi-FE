import UserManagementPage from '@/features/user-management/components/UserManagementPage';
import { Header, Sidebar } from '@/shared';

export default function AdminUserPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - 데스크탑에서만 표시 */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header userName="Admin" />
        <main className="flex-1 overflow-y-auto p-4 lg:p-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <UserManagementPage />
          </div>
        </main>
      </div>
    </div>
  );
}
