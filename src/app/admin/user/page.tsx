import UserManagementPage from '@/features/user-management/components/UserManagementPage';
import Header from '@/shared/ui/Header/Header';
import Sidebar from '@/shared/ui/Sidebar/Sidebar';

export default function AdminUserPage() {
  return (
    <>
      <Header userName="Admin" />
      <div className="flex min-h-screen w-full">
        <Sidebar />
        <main className="flex-1 flex flex-col">
          <section className="flex-1 p-8 min-h-screen w-full bg-white">
            <UserManagementPage />
          </section>
        </main>
      </div>
    </>
  );
}
