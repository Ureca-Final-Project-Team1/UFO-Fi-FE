import { useScrollToTop } from '@/hooks/useScrollToTop';
import { Icon } from '@/shared';

export const ScrollToTopButton = () => {
  const { show, scrollToTop } = useScrollToTop();

  if (!show) return null;

  return (
    <div className="fixed bottom-20 z-50 w-10 h-10 flex items-center justify-center bg-primary-300 p-1 hover:bg-white/10 rounded-full cursor-pointer">
      <Icon name="ArrowUp" className="w-5 h-5" color="white" onClick={scrollToTop} />
    </div>
  );
};
