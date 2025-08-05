'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState, useEffect } from 'react';

import { IconType } from '../Icons';
import { Icon } from '../Icons/Icon';

interface MenuItem {
  id: string;
  label: string;
  icon: IconType;
  href?: string;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    label: '대시보드',
    icon: 'Home',
    href: '/admin',
  },
  {
    id: 'user',
    label: '사용자 관리',
    icon: 'User',
    children: [
      {
        id: 'inactive-users',
        label: '비활성화된 사용자',
        icon: 'UserX',
        href: '/admin/user/inactive',
      },
    ],
  },
  {
    id: 'post',
    label: '게시물 관리',
    icon: 'FileText',
    children: [
      {
        id: 'reported-posts',
        label: '신고된 게시물',
        icon: 'TriangleAlert',
        href: '/admin/posts/reported',
      },
    ],
  },
  {
    id: 'zet-management',
    label: 'ZET 관리',
    icon: 'Coins',
    children: [
      {
        id: 'zet-recovery',
        label: 'ZET 복구',
        icon: 'RefreshCw',
        href: '/admin/zet-recovery',
      },
      {
        id: 'zet-charge-logs',
        label: '충전 내역 로그',
        icon: 'History',
        href: '/admin/zet-charge-logs',
      },
    ],
  },
  {
    id: 'banned-words',
    label: '금칙어 설정',
    icon: 'Shield',
    href: '/admin/banned-words',
  },
  {
    id: 'settings',
    label: '시스템 설정',
    icon: 'Settings',
    href: '/admin/settings',
  },
];

const Sidebar = () => {
  const [openMenus, setOpenMenus] = useState<Set<string>>(new Set());
  const pathname = usePathname();

  useEffect(() => {
    // 현재 경로에 따라 해당 메뉴 열기
    const currentMenuItem = menuItems.find(
      (item) => item.href === pathname || item.children?.some((child) => child.href === pathname),
    );

    if (currentMenuItem && currentMenuItem.children) {
      setOpenMenus(new Set([currentMenuItem.id]));
    }
  }, [pathname]);

  const toggleMenu = (menuId: string) => {
    const newOpenMenus = new Set(openMenus);
    if (newOpenMenus.has(menuId)) {
      newOpenMenus.delete(menuId);
    } else {
      newOpenMenus.add(menuId);
    }
    setOpenMenus(newOpenMenus);
  };

  const isMenuActive = (item: MenuItem): boolean => {
    if (item.href) {
      return pathname === item.href;
    }
    return item.children?.some((child) => pathname === child.href) || false;
  };

  const renderMenuItem = (item: MenuItem, level = 0) => {
    const isOpen = openMenus.has(item.id);
    const isActive = isMenuActive(item);
    const hasChildren = item.children && item.children.length > 0;

    return (
      <div key={item.id} className={level === 0 ? 'mb-1' : ''}>
        {item.href ? (
          <Link
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 group ${
              isActive
                ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-700'
                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
            } ${level > 0 ? 'ml-6 py-2' : ''}`}
          >
            <Icon
              name={item.icon as IconType}
              className={`size-5 transition-colors ${
                isActive ? 'text-blue-700' : 'text-gray-500 group-hover:text-gray-700'
              }`}
            />
            <span className="flex-1">{item.label}</span>
          </Link>
        ) : (
          <button
            onClick={() => hasChildren && toggleMenu(item.id)}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 w-full group ${
              isActive
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <Icon
              name={item.icon as IconType}
              className={`size-5 transition-colors ${
                isActive ? 'text-blue-700' : 'text-gray-500 group-hover:text-gray-700'
              }`}
            />
            <span className="flex-1 text-left">{item.label}</span>
            {hasChildren && (
              <Icon
                name={isOpen ? 'ChevronUp' : 'ChevronDown'}
                className={`size-4 transition-all duration-200 ${
                  isActive ? 'text-blue-700' : 'text-gray-400 group-hover:text-gray-600'
                }`}
              />
            )}
          </button>
        )}

        {/* 하위 메뉴 */}
        {hasChildren && (
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="mt-1 space-y-1">
              {item.children?.map((child) => renderMenuItem(child, level + 1))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <aside className="w-72 h-screen bg-white border-r border-gray-200 flex flex-col">
      {/* 메뉴 목록 */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {menuItems.map((item) => renderMenuItem(item))}
      </nav>
    </aside>
  );
};

export default Sidebar;
