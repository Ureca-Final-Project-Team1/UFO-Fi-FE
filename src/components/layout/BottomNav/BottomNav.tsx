'use client';

import React from 'react';

import { Icon } from '@/components/ui/Icons';
import type { IconType } from '@/components/ui/Icons/Icons.types';
import { useNavigation } from '@/hooks/useNavigation';
import { cn } from '@/lib/utils';

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
      <div className="w-full h-full bg-primary-700 border-t border-white/10">
        <nav className="flex items-center justify-around h-full w-full">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            const isHome = item.id === 'home';

            return (
              <div
                key={item.id}
                className={cn('flex justify-center items-end', {
                  'relative -top-2 z-10 w-18 h-16': isHome,
                  'flex-1': !isHome,
                })}
              >
                <button
                  onClick={() => handleTabClick(item.id)}
                  className={cn(
                    'flex flex-col items-center justify-center gap-1 transition-all duration-200',
                    isHome
                      ? 'w-full h-full bg-primary-400 rounded-t-3xl'
                      : 'w-full h-16 hover:bg-white/5 active:scale-95',
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
