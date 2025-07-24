'use client';

import React, { useState } from 'react';

import { Icon } from '@/shared';

const menuItems = [
  { label: '대시보드', href: '/admin' },
  { label: '사용자 관리', href: '/admin/user' },
  { label: '게시물 관리', href: '/admin/posts' },
  { label: '금칙어 설정', href: '/admin/banned-words' },
  { label: '시스템 설정', href: '/admin/settings' },
];

export const AdminSideMenu: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* 모바일 햄버거 버튼 */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded bg-white shadow"
        onClick={() => setOpen(true)}
        aria-label="메뉴 열기"
      >
        <Icon name="Menu" className="w-6 h-6" />
      </button>

      {/* 오버레이 메뉴 (모바일) */}
      {open && (
        <div className="fixed inset-0 z-40 bg-black/40 flex">
          <nav className="w-64 bg-white h-full p-6 flex flex-col gap-4 shadow-lg animate-slide-in-left">
            <button
              className="self-end mb-4 p-1 rounded hover:bg-gray-100"
              onClick={() => setOpen(false)}
              aria-label="메뉴 닫기"
            >
              <Icon name="X" className="w-6 h-6" />
            </button>
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-gray-800 text-lg font-medium py-2 px-3 rounded hover:bg-gray-100 transition-colors"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
          {/* 오버레이 클릭 시 닫기 */}
          <div className="flex-1" onClick={() => setOpen(false)} />
        </div>
      )}

      {/* 데스크탑 사이드 메뉴 */}
      <nav className="hidden md:flex flex-col gap-4 w-56 min-h-screen bg-white border-r px-6 py-8 shadow-sm">
        {menuItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="text-gray-800 text-base font-medium py-2 px-3 rounded hover:bg-gray-100 transition-colors"
          >
            {item.label}
          </a>
        ))}
      </nav>
      <style jsx>{`
        @keyframes slide-in-left {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slide-in-left {
          animation: slide-in-left 0.2s ease;
        }
      `}</style>
    </>
  );
};
