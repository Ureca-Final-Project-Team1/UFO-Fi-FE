'use client';

import { usePathname } from 'next/navigation';
import React from 'react';

import BottomNav from '@/components/layout/BottomNav';
import TopNav from '@/components/layout/TopNav';

export default function NavigationProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isNavigationPage =
    pathname.startsWith('/login') ||
    pathname.startsWith('/onboarding') ||
    pathname.startsWith('/signup/privacy');

  return (
    <div className="min-h-screen w-full flex justify-center">
      <div className="relative w-full min-w-[375px] max-w-[620px] overflow-hidden h-screen">
        {!isNavigationPage && <TopNav title="UFO-Fi" />}
        <main
          className="overflow-y-auto hide-scrollbar"
          style={{
            height: `calc(100dvh - ${isNavigationPage ? '0px' : '56px'})`,
            paddingTop: isNavigationPage ? '0px' : '56px',
            WebkitOverflowScrolling: 'touch',
            overscrollBehavior: 'contain',
          }}
        >
          {children}
        </main>
        {!isNavigationPage && <BottomNav />}
      </div>
    </div>
  );
}
