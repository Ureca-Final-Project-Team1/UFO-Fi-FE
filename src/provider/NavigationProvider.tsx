'use client';

import { usePathname } from 'next/navigation';
import React from 'react';

import BottomNav from '@/shared/layout/BottomNav';
import TopNav from '@/shared/layout/TopNav';

interface NavigationProviderProps {
  children: React.ReactNode;
}

export default function NavigationProvider({ children }: NavigationProviderProps) {
  const pathname = usePathname();

  const isNavigationHidden =
    pathname.startsWith('/login') ||
    pathname.startsWith('/onboarding') ||
    pathname.startsWith('/signup/privacy');

  return (
    <div className="min-h-screen w-full flex justify-center">
      <div className="relative w-full min-w-[375px] max-w-[620px] overflow-hidden h-screen">
        {!isNavigationHidden && <TopNav title="UFO-Fi" />}
        <main
          className="overflow-y-auto hide-scrollbar"
          style={{
            height: `calc(100dvh - ${isNavigationHidden ? '0px' : '112px'})`, // TopNav(56px) + BottomNav(56px)
            marginTop: isNavigationHidden ? '0px' : '56px',
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
