'use client';

import { usePathname } from 'next/navigation';
import React from 'react';

export default function BackgroundProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isBackgroundPage =
    pathname.startsWith('/login') ||
    pathname.startsWith('/signup') ||
    pathname.startsWith('/blackhole');

  const backgroundClass = isBackgroundPage
    ? "bg-[url('/images/background-login.png')]"
    : "bg-[url('/images/background-basic.png')]";

  return (
    <div
      className={`w-full h-full bg-cover bg-no-repeat bg-top
                  flex flex-col items-center justify-between sm:px-10.5 px-4 text-white ${backgroundClass}`}
    >
      {children}
    </div>
  );
}
