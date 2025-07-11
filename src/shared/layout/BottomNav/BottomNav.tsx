'use client';

import React from 'react';

import { cn } from '@/lib/utils';
import { useNavigation } from '@/shared/hooks/useNavigation';
import { Icon } from '@/shared/ui/Icons';
import type { IconType } from '@/shared/ui/Icons/Icons.types';

interface NavItem {
  id: string;
  label: string;
  icon: IconType;
}

interface BottomNavProps {
  onTabChange?: (tab: string) => void;
}

const navItems: NavItem[] = [
  { id: 'sell', label: '판매등록', icon: 'CirclePlus' as IconType },
  { id: 'exchange', label: '전파 거래소', icon: 'RadioTower' as IconType },
  { id: 'home', label: '홈', icon: 'planet' as IconType },
  { id: 'market', label: '거래 시세', icon: 'trending' as IconType },
  { id: 'mypage', label: '마이페이지', icon: 'astronaut' as IconType },
];

const BottomNav: React.FC<BottomNavProps> = ({ onTabChange }) => {
  const { activeTab, navigateToTab } = useNavigation();

  const handleTabClick = (tab: string) => {
    // 외부에서 전달된 onTabChange 콜백이 있으면 먼저 실행
    if (onTabChange && typeof onTabChange === 'function') {
      onTabChange(tab);
    }
    navigateToTab(tab);
  };

  return (
    <footer className="absolute bottom-0 left-0 right-0 h-14 z-30">
      <div className="w-full h-14 bg-primary-700 border-t border-white/10">
        <nav className="flex items-center justify-around h-14 w-full">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            const isHome = item.id === 'home';

            return (
              <div
                key={item.id}
                className={cn('flex justify-center items-end h-14', {
                  'relative z-10 w-18': isHome,
                  'flex-1': !isHome,
                })}
              >
                <button
                  onClick={() => handleTabClick(item.id)}
                  className={cn(
                    'flex flex-col items-center justify-center gap-1 transition-all duration-200',
                    isHome
                      ? 'w-full h-16 bg-primary-400 rounded-t-3xl'
                      : 'w-full h-14 hover:bg-white/5 active:scale-95',
                    isActive ? 'text-secondary-yellow' : 'text-white/70',
                  )}
                  aria-label={item.label}
                >
                  <Icon
                    name={item.icon}
                    size={isHome ? 'lg' : 'md'}
                    color={isActive ? 'rgb(var(--color-secondary-yellow))' : 'white'}
                  />
                  <span
                    className={cn(
                      'text-xs font-bold leading-none',
                      isActive ? 'text-secondary-yellow' : 'text-white/70',
                    )}
                  >
                    {item.label}
                  </span>
                </button>
              </div>
            );
          })}
        </nav>
      </div>
    </footer>
  );
};

export default BottomNav;
