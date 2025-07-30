import { useEffect } from 'react';

import { useScrollStore } from '@/stores/useScrollStore';

export const useScrollTracker = () => {
  const setY = useScrollStore((s) => s.setY);

  useEffect(() => {
    const handleScroll = () => {
      setY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setY]);
};
