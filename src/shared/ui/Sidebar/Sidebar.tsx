'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState, useEffect } from 'react';

import { cn } from '@/lib/utils';

import { IconType } from '../Icons';
import { SidebarProps, MenuItem } from './Sidebar.types';
import {
  sidebarVariants,
  sidebarNavVariants,
  menuItemContainerVariants,
  menuItemVariants,
  menuItemIconVariants,
  chevronIconVariants,
  submenuContainerVariants,
  submenuItemsContainerVariants,
} from './SidebarVariants';
import { Icon } from '../Icons/Icon';

const defaultMenuItems: MenuItem[] = [
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
    id: 'banned-words',
    label: '금칙어 설정',
    icon: 'Shield',
    href: '/admin/banned-words',
  },
  {
    id: 'zet-recovery',
    label: 'ZET 복구',
    icon: 'CreditCard',
    href: '/admin/zet-recovery',
  },
  {
    id: 'settings',
    label: '시스템 설정',
    icon: 'Settings',
    href: '/admin/settings',
  },
];

const Sidebar: React.FC<SidebarProps> = ({
  className = '',
  menuItems = defaultMenuItems,
  variant = 'default',
  size = 'default',
}) => {
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
  }, [pathname, menuItems]);

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

    // level을 variants에서 기대하는 타입으로 처리
    const levelVariant = level <= 2 ? (level as 0 | 1 | 2) : 0;

    return (
      <div key={item.id} className={cn(menuItemContainerVariants({ level: levelVariant }))}>
        {item.href ? (
          <Link
            href={item.href}
            className={cn(
              menuItemVariants({
                variant,
                size,
                level: levelVariant,
                state: isActive ? 'active' : 'inactive',
              }),
            )}
          >
            <Icon
              name={item.icon as IconType}
              className={cn(
                menuItemIconVariants({
                  variant,
                  size,
                  state: isActive ? 'active' : 'inactive',
                }),
              )}
            />
            <span className="flex-1">{item.label}</span>
          </Link>
        ) : (
          <button
            onClick={() => hasChildren && toggleMenu(item.id)}
            className={cn(
              menuItemVariants({
                variant,
                size,
                level: levelVariant,
                state: isActive ? 'active' : 'inactive',
              }),
              'w-full',
            )}
          >
            <Icon
              name={item.icon as IconType}
              className={cn(
                menuItemIconVariants({
                  variant,
                  size,
                  state: isActive ? 'active' : 'inactive',
                }),
              )}
            />
            <span className="flex-1 text-left">{item.label}</span>
            {hasChildren && (
              <Icon
                name={isOpen ? 'ChevronUp' : 'ChevronDown'}
                className={cn(
                  chevronIconVariants({
                    variant,
                    size,
                    state: isActive ? 'active' : 'inactive',
                  }),
                )}
              />
            )}
          </button>
        )}

        {/* 하위 메뉴 */}
        {hasChildren && (
          <div className={cn(submenuContainerVariants({ isOpen }))}>
            <div className={cn(submenuItemsContainerVariants({ variant, size }))}>
              {item.children?.map((child) => renderMenuItem(child, level + 1))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <aside className={cn(sidebarVariants({ variant, size }), className)}>
      {/* 메뉴 목록 */}
      <nav className={cn(sidebarNavVariants({ variant, size }))}>
        {menuItems.map((item) => renderMenuItem(item))}
      </nav>
    </aside>
  );
};

export default Sidebar;
