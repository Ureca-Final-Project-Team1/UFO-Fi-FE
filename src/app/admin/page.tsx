'use client';

import React from 'react';

export default function AdminPage() {
  return (
    <div className="flex min-h-screen w-full bg-gray-100">
      {/* 사이드바 */}
      <aside className="w-60 bg-gray-900 text-white flex flex-col py-8 px-4 min-h-screen">
        <h2 className="text-2xl font-bold mb-8">UFO-FI Admin</h2>
        <nav className="flex flex-col gap-4">
          <a href="#" className="hover:text-cyan-400">
            대시보드
          </a>
          <a href="#" className="hover:text-cyan-400">
            회원 관리
          </a>
          <a href="#" className="hover:text-cyan-400">
            거래 관리
          </a>
          <a href="#" className="hover:text-cyan-400">
            신고 관리
          </a>
          <a href="#" className="hover:text-cyan-400">
            통계
          </a>
        </nav>
      </aside>
      {/* 메인 컨텐츠 */}
      <main className="flex-1 flex flex-col">
        {/* 헤더 */}
        <header className="w-full h-16 bg-white border-b flex items-center px-8 shadow-sm">
          <h1 className="text-xl font-bold">관리자 페이지</h1>
        </header>
        {/* 컨텐츠 영역 */}
        <section className="flex-1 p-8">
          <div className="text-gray-700 text-lg">여기에 어드민 기능별 컨텐츠가 들어갑니다.</div>
        </section>
      </main>
    </div>
  );
}
