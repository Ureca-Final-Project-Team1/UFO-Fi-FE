'use client';

import Link from 'next/link';
import React from 'react';

import { cn } from '@/lib/utils';
import type { IconType } from '@/shared';
import { Icon } from '@/shared';
import { useNavigation } from '@/shared/hooks/useNavigation';

interface NavItem {
  id: string;
  label: string;
  icon: IconType;
  href: string;
}

interface BottomNavProps {
  onTabChange?: (tab: string) => void;
}

const navItems: NavItem[] = [
  { id: 'sell', label: '판매등록', icon: 'CirclePlus' as IconType, href: '/sell' },
  { id: 'exchange', label: '전파 거래소', icon: 'RadioTower' as IconType, href: '/exchange' },
  { id: 'home', label: '홈', icon: 'planet' as IconType, href: '/' },
  { id: 'signal', label: '전파 거리', icon: 'graph' as IconType, href: '/signal' },
  { id: 'mypage', label: '마이페이지', icon: 'astronaut' as IconType, href: '/mypage' },
];

const BottomNav: React.FC<BottomNavProps> = ({ onTabChange }) => {
  const { activeTab } = useNavigation();

  const handleTabClick = (tab: string) => {
    // 외부에서 전달된 onTabChange 콜백이 있으면 먼저 실행
    if (onTabChange && typeof onTabChange === 'function') {
      onTabChange(tab);
    }
  };

  return (
    <nav className="bottom-nav-fixed" role="navigation" aria-label="주요 네비게이션">
      <div className="flex items-center justify-around h-16 w-full">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const isHome = item.id === 'home';

          return (
            <div
              key={item.id}
              className={cn('flex justify-center items-end h-16', {
                'relative z-10 w-18 mt-0': isHome,
                'flex-1': !isHome,
              })}
            >
              <Link
                href={item.href}
                onClick={() => handleTabClick(item.id)}
                className={cn(
                  'flex flex-col items-center justify-center gap-1 transition-all duration-200 cursor-pointer no-underline',
                  isHome
                    ? 'w-full h-[72px] bg-primary-400 rounded-t-3xl'
                    : 'w-full h-16 hover:bg-white/5 active:scale-95',
                )}
                aria-label={item.label}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon
                  name={item.icon}
                  size={isHome ? 'lg' : 'md'}
                  color={isActive ? 'var(--color-secondary-yellow)' : 'white'}
                  className={isActive ? 'text-yellow-400' : 'text-white'}
                />
                <span
                  className={cn(
                    'text-xs font-bold leading-none transition-colors',
                    isActive ? 'text-yellow-400' : 'text-white/70',
                  )}
                >
                  {item.label}
                </span>
              </Link>
            </div>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
