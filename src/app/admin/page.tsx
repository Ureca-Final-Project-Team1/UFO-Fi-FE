'use client';

import React from 'react';

import Header from '@/shared/ui/Header/Header';
import Sidebar from '@/shared/ui/Sidebar/Sidebar';

export default function AdminPage() {
  return (
    <div className="flex min-h-screen w-full bg-gray-100">
      {/* 사이드바 */}
      <Sidebar />
      {/* 메인 컨텐츠 */}
      <main className="flex-1 flex flex-col">
        {/* 헤더 */}
        <Header userName="Admin" />
        {/* 컨텐츠 영역 */}
        <section className="flex-1 p-8">
          <div className="text-gray-700 text-lg">여기에 어드민 기능별 컨텐츠가 들어갑니다.</div>
        </section>
      </main>
    </div>
  );
}
