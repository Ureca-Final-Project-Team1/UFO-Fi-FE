'use client';

import { usePathname } from 'next/navigation';
import React from 'react';

import BottomNav from '@/shared/layout/BottomNav';
import TopNav from '@/shared/layout/TopNav';

interface NavigationProviderProps {
  children: React.ReactNode;
}

const NAV_HEIGHT = 56; // TopNav 높이
const BOTTOM_NAV_HEIGHT = 64; // BottomNav 높이

export function NavigationProvider({ children }: NavigationProviderProps) {
  const pathname = usePathname();

  const isNavigationHidden =
    pathname.startsWith('/login') ||
    pathname.startsWith('/onboarding') ||
    pathname.startsWith('/signup/privacy');

  return (
    <div className="min-h-screen w-full flex justify-center">
      <div className="relative w-full min-w-[375px] max-w-[620px] overflow-hidden h-screen">
        {!isNavigationHidden && <TopNav />}
        <main
          className="overflow-y-auto hide-scrollbar"
          style={{
            height: `calc(100dvh - ${isNavigationHidden ? '0px' : `${NAV_HEIGHT + BOTTOM_NAV_HEIGHT}px`})`,
            marginTop: isNavigationHidden ? '0px' : `${NAV_HEIGHT}px`,
            WebkitOverflowScrolling: 'touch',
            overscrollBehavior: 'contain',
          }}
        >
          {children}
        </main>
        {!isNavigationHidden && <BottomNav />}
      </div>
    </div>
  );
}
