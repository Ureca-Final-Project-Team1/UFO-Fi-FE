'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState, useEffect, useCallback, useMemo, useRef, ComponentProps } from 'react';

import { Icon } from '@/shared';
import type { IconType } from '@/shared';

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
    icon: 'Home' as IconType,
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
    id: 'settings',
    label: '시스템 설정',
    icon: 'Settings',
    href: '/admin/settings',
  },
];

// 스타일 맵 객체들
const menuItemStyleMap = {
  active: 'bg-blue-50 text-blue-700 border-l-4 border-blue-700',
  inactive: 'text-gray-700 hover:bg-gray-50 hover:text-gray-900',
};

const iconColorMap = {
  active: 'text-blue-700',
  inactive: 'text-gray-500 group-hover:text-gray-700',
};

const chevronColorMap = {
  active: 'text-blue-700',
  inactive: 'text-gray-400 group-hover:text-gray-600',
};

const overlayStyleMap = {
  closing: 'bg-black/0',
  open: 'bg-black/40',
};

const navStyleMap = {
  closing: 'transform translate-x-full',
  open: 'transform translate-x-0',
};

type AdminSideMenuProps = ComponentProps<'div'>;

export const AdminSideMenu: React.FC<AdminSideMenuProps> = (props) => {
  const { className } = props;
  const [open, setOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [openMenus, setOpenMenus] = useState<Set<string>>(new Set());
  const pathname = usePathname();
  const menuRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // 현재 활성 메뉴 계산을 메모이제이션
  const currentMenuItem = useMemo(() => {
    return menuItems.find(
      (item) => item.href === pathname || item.children?.some((child) => child.href === pathname),
    );
  }, [pathname]);

  useEffect(() => {
    // 현재 경로에 따라 해당 메뉴 열기
    if (currentMenuItem && currentMenuItem.children) {
      setOpenMenus(new Set([currentMenuItem.id]));
    }
  }, [currentMenuItem]);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setOpen(false);
      setIsClosing(false);
    }, 200);
  }, []);

  // ESC 키로 메뉴 닫기
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) {
        handleClose();
      }
    };

    if (open) {
      document.addEventListener('keydown', handleEscape);
      // 포커스 트랩: 메뉴가 열릴 때 닫기 버튼에 포커스
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 100);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open, handleClose]);

  const toggleMenu = useCallback((menuId: string) => {
    setOpenMenus((prev) => {
      const newOpenMenus = new Set(prev);
      if (newOpenMenus.has(menuId)) {
        newOpenMenus.delete(menuId);
      } else {
        newOpenMenus.add(menuId);
      }
      return newOpenMenus;
    });
  }, []);

  const isMenuActive = useCallback(
    (item: MenuItem): boolean => {
      if (item.href) {
        return pathname === item.href;
      }
      return item.children?.some((child) => pathname === child.href) || false;
    },
    [pathname],
  );

  const renderMenuItem = useCallback(
    (item: MenuItem, level = 0) => {
      const isOpen = openMenus.has(item.id);
      const isActive = isMenuActive(item);
      const hasChildren = item.children && item.children.length > 0;

      return (
        <div key={item.id} className={level === 0 ? 'mb-1' : ''}>
          {item.href ? (
            <Link
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 group ${
                isActive ? menuItemStyleMap.active : menuItemStyleMap.inactive
              } ${level > 0 ? 'ml-6 py-2' : ''}`}
              onClick={handleClose}
            >
              <Icon
                name={item.icon}
                className={` size-5 transition-colors ${
                  isActive ? iconColorMap.active : iconColorMap.inactive
                }`}
              />
              <span className="flex-1">{item.label}</span>
            </Link>
          ) : (
            <button
              onClick={() => hasChildren && toggleMenu(item.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 w-full group ${
                isActive ? menuItemStyleMap.active : menuItemStyleMap.inactive
              }`}
            >
              <Icon
                name={item.icon}
                className={`size-5 transition-colors ${
                  isActive ? iconColorMap.active : iconColorMap.inactive
                }`}
              />
              <span className="flex-1 text-left">{item.label}</span>
              {hasChildren && (
                <Icon
                  name={isOpen ? 'ChevronUp' : 'ChevronDown'}
                  className={`size-4 transition-all duration-200 ${
                    isActive ? chevronColorMap.active : chevronColorMap.inactive
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
    },
    [openMenus, isMenuActive, handleClose, toggleMenu],
  );

  // 메뉴 아이템 렌더링을 메모이제이션
  const menuItemsRendered = useMemo(() => {
    return menuItems.map((item) => renderMenuItem(item));
  }, [renderMenuItem]);

  return (
    <div {...props}>
      {/* 햄버거 버튼 - 테블릿 이하에서 표시 */}
      <button
        className={`lg:hidden p-2 hover:bg-gray-100 transition-colors rounded flex items-center justify-center ${className ?? ''}`}
        onClick={handleOpen}
        aria-label="메뉴 열기"
      >
        <Icon name="Menu" className="size-5 text-gray-700" />
      </button>

      {/* 오버레이 메뉴 (모바일/테블릿) */}
      {(open || isClosing) && (
        <div
          className={`fixed inset-0 z-[9998] flex transition-opacity duration-200 ${
            isClosing ? overlayStyleMap.closing : overlayStyleMap.open
          }`}
          role="dialog"
          aria-modal="true"
          aria-label="관리자 메뉴"
        >
          {/* 오버레이 클릭 시 닫기 */}
          <div className="flex-1" onClick={handleClose} />
          <nav
            ref={menuRef}
            className={`w-72 bg-white h-full flex flex-col shadow-lg transition-transform duration-200 ease-out ${
              isClosing ? navStyleMap.closing : navStyleMap.open
            } ${open && !isClosing ? 'animate-slide-in-right' : ''}`}
            role="navigation"
            aria-label="관리자 메뉴"
          >
            {/* 헤더 */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon name="Shield" className="size-6 text-blue-600" />
                  <span className="font-bold text-lg text-gray-900">관리자</span>
                </div>
                <button
                  ref={closeButtonRef}
                  className="p-1 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  onClick={handleClose}
                  aria-label="메뉴 닫기"
                >
                  <Icon name="X" className="size-6 text-gray-500" />
                </button>
              </div>
            </div>

            {/* 메뉴 목록 */}
            <div className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">{menuItemsRendered}</div>
          </nav>
        </div>
      )}
      <style jsx>{`
        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};
