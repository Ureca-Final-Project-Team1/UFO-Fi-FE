'use client';

import { usePathname } from 'next/navigation';
import React from 'react';

interface BackgroundProviderProps {
  children: React.ReactNode;
}

export function BackgroundProvider({ children }: BackgroundProviderProps) {
  const pathname = usePathname();

  const isNavigationHidden =
    pathname.startsWith('/login') ||
    pathname.startsWith('/onboarding') ||
    pathname.startsWith('/signup');

  const isAdminRoute = pathname.startsWith('/admin');

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <div
      className={`
        w-full h-full
        ${isNavigationHidden ? 'min-h-screen' : 'min-h-full'}
        flex flex-col items-center justify-between
        sm:px-10.5 px-4 text-white
        relative z-10
      `}
    >
      {children}
    </div>
  );
}
