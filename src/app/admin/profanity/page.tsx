import ProfanityManagementPage from '@/features/profanity-management/components/ProfanityManagementPage';
import Header from '@/shared/ui/Header/Header';
import Sidebar from '@/shared/ui/Sidebar/Sidebar';

export default function AdminProfanityPage() {
  return (
    <>
      <Header userName="Admin" />
      <div className="flex min-h-screen w-full">
        <Sidebar />
        <main className="flex-1 flex flex-col">
          <section className="flex-1 p-8 min-h-screen w-full bg-white">
            <ProfanityManagementPage />
          </section>
        </main>
      </div>
    </>
  );
}
