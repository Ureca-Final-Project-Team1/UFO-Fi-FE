import UserManagementPage from '@/features/user-management/components/UserManagementPage';
import Header from '@/shared/ui/Header/Header';
import Sidebar from '@/shared/ui/Sidebar/Sidebar';

export default function AdminUserPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header userName="Admin" />
        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <UserManagementPage />
          </div>
        </main>
      </div>
    </div>
  );
}
