'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import { ICON_PATHS } from '@/constants/icons';

import { IconType } from '../Icons';
import { Icon } from '../Icons/Icon';

interface HeaderProps {
  userName?: string;
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ userName = '김명령', onLogout }) => {
  const pathname = usePathname();

  const navItems = [
    { href: '/admin', label: '대시보드', icon: 'Home' as IconType },
    { href: '/admin/user', label: '사용자', icon: 'Users' as IconType },
    { href: '/admin/posts', label: '게시물', icon: 'FileText' as IconType },
    { href: '/admin/settings', label: '설정', icon: 'Settings' as IconType },
  ];

  return (
    <header className="w-full h-16 flex items-center justify-between px-4 lg:px-6 bg-white border-b border-gray-200 sticky top-0 z-50">
      {/* 좌측: 로고 + 네비게이션 */}
      <div className="flex items-center gap-4 lg:gap-8 min-w-0">
        <div className="flex items-center gap-2 min-w-0">
          <Image src={ICON_PATHS.UFO_LOGO} alt="UFO-Fi 로고" width={28} height={28} />
          <Link
            href="/admin"
            className="font-bold text-lg lg:text-xl text-gray-900 whitespace-nowrap pyeongchangpeace-logo"
          >
            UFO-Fi
          </Link>
        </div>

        {/* 데스크탑 네비게이션 */}
        <nav className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-blue-600 ${
                pathname === item.href
                  ? 'text-blue-600 border-b-2 border-blue-600 pb-1'
                  : 'text-gray-600'
              }`}
            >
              <Icon name={item.icon as IconType} className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* 우측: Admin 뱃지, 이름, 로그아웃 */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="bg-blue-100 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full">
            Admin
          </span>
          <span className="hidden sm:block text-sm font-medium text-gray-700">{userName}</span>
        </div>
        <button
          type="button"
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center"
          onClick={onLogout}
          title="로그아웃"
        >
          <Icon name="LogOut" className="w-5 h-5" color="black" />
        </button>
      </div>
    </header>
  );
};

export default Header;
