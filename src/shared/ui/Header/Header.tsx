'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { Icon } from '../Icons/Icon';

interface HeaderProps {
  userName?: string;
}

const Header: React.FC<HeaderProps> = ({ userName = '김명령' }) => {
  return (
    <header className="w-full h-12 flex items-center justify-between px-6 bg-white border-b">
      {/* 좌측: 로고 + 네비게이션 */}
      <div className="flex items-center gap-8 min-w-0">
        <div className="flex items-center gap-2 min-w-0">
          <Image src="/icons/ufo-logo.svg" alt="UFO-Fi 로고" width={24} height={24} />
          <span className="font-bold text-lg text-[#1A1A1A] whitespace-nowrap pyeongchangpeace-logo">
            UFO-Fi
          </span>
        </div>
        <nav className="flex items-center gap-6 ml-6">
          <Link href="/admin" className="text-primary font-semibold text-sm hover:underline">
            대시보드
          </Link>
          <Link href="/admin/users" className="text-gray-500 text-sm hover:text-primary">
            사용자
          </Link>
          <a href="#" className="text-gray-500 text-sm hover:text-primary">
            게시물
          </a>
          <a href="#" className="text-gray-500 text-sm hover:text-primary">
            금칙어
          </a>
        </nav>
      </div>
      {/* 우측: Admin 뱃지, 이름, 로그아웃 */}
      <div className="flex items-center gap-3">
        <span className="bg-blue-100 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full">
          {userName}
        </span>
        <button
          type="button"
          className="p-1 rounded hover:bg-gray-100 transition-colors flex items-center align-baseline"
        >
          <Icon name="LogOut" className="w-5 h-50" color="black" />
        </button>
      </div>
    </header>
  );
};

export default Header;
