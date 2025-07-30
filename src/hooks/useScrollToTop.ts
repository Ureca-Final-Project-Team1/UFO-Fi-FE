import { useScrollStore } from '@/stores/useScrollStore';

export const useScrollToTop = () => {
  const y = useScrollStore((s) => s.y);

  const show = y > 200;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return { show, scrollToTop };
};
