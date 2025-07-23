import React from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-white w-full">{children}</div>;
}
