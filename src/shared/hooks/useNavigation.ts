'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useState, useCallback } from 'react';

export const useNavigation = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [activeTab, setActiveTab] = useState(() => {
    if (!pathname) return 'home';
    if (pathname === '/') return 'home';
    if (pathname.startsWith('/sell')) return 'sell';
    if (pathname.startsWith('/exchange')) return 'exchange';
    if (pathname.startsWith('/market')) return 'market';
    if (pathname.startsWith('/mypage')) return 'mypage';
    return 'home';
  });

  const navigateToTab = useCallback(
    (tab: string) => {
      try {
        if (!router || !router.push) {
          console.warn('Router not available');
          return;
        }

        setActiveTab(tab);

        switch (tab) {
          case 'sell':
            router.push('/sell');
            break;
          case 'exchange':
            router.push('/exchange');
            break;
          case 'home':
            router.push('/');
            break;
          case 'market':
            router.push('/market');
            break;
          case 'mypage':
            router.push('/mypage');
            break;
          default:
            router.push('/');
        }
      } catch (error) {
        console.error('Navigation error:', error);
      }
    },
    [router],
  );

  return {
    activeTab,
    navigateToTab,
  };
};
