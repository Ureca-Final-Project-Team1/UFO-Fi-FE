'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useState, useCallback, useEffect } from 'react';

const getTabFromPathname = (pathname: string): string => {
  if (!pathname) return 'home';
  if (pathname === '/') return 'home';
  if (pathname.startsWith('/sell')) return 'sell';
  if (pathname.startsWith('/exchange')) return 'exchange';
  if (pathname.startsWith('/signal')) return 'signal';
  if (pathname.startsWith('/mypage')) return 'mypage';
  return 'home';
};

export const useNavigation = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [activeTab, setActiveTab] = useState(() => getTabFromPathname(pathname));

  // pathname이 변경될 때마다 activeTab 업데이트
  useEffect(() => {
    const newTab = getTabFromPathname(pathname);
    setActiveTab(newTab);
  }, [pathname]);

  const navigateToTab = useCallback(
    (tab: string) => {
      try {
        if (!router || !router.push) {
          console.warn('Router not available');
          return;
        }
        // UI를 먼저 업데이트
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
          case 'signal':
            router.push('/signal');
            break;
          case 'mypage':
            router.push('/mypage');
            break;
          default:
            router.push('/');
        }
      } catch (error) {
        console.error('Navigation error:', error);
        setActiveTab(getTabFromPathname(pathname));
      }
    },
    [router, pathname],
  );

  return {
    activeTab,
    navigateToTab,
  };
};
