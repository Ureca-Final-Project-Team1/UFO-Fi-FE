// src/features/common/components/ScrollToTopButton.tsx
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { Icon } from '@/shared';

export const ScrollToTopButton = () => {
  const { show, scrollToTop } = useScrollToTop(200);

  if (!show) return null;

  return (
    <button
      onClick={scrollToTop}
      className="size-12 flex items-center justify-center bg-primary-400/90 hover:bg-primary-400 rounded-full cursor-pointer shadow-lg transition-all duration-200 hover:scale-110 backdrop-blur-sm"
      aria-label="맨 위로 스크롤"
    >
      <Icon name="ArrowUp" className="size-6" color="white" />
    </button>
  );
};
