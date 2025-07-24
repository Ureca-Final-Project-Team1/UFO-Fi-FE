import React from 'react';

import { AdminSideMenu } from '@/shared/ui/AdminSideMenu/AdminSideMenu';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* AdminSideMenu는 항상 렌더링되지만 lg:hidden으로 데스크탑에서는 숨김 */}
      <AdminSideMenu />
      <div className="min-h-screen bg-gray-50">{children}</div>
    </>
  );
}
