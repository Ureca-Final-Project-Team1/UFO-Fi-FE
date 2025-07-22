import Header from '@/shared/ui/Header/Header';
import Sidebar from '@/shared/ui/Sidebar/Sidebar';

export default function AdminPage() {
  return (
    <>
      <Header userName="Admin" />
      <div className="flex min-h-screen w-full">
        <Sidebar />
        <main className="flex-1 flex flex-col">
          <section className="flex-1 p-8">
            <div className="text-gray-700 text-lg">
              여기에 대시보드 등 기본 컨텐츠가 들어갑니다.
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
