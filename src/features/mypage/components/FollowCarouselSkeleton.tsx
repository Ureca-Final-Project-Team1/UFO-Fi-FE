import EmblaCarousel from '@/features/profile/components/Carousel/EmblaCarousel';
import { Skeleton } from '@/shared';

export function FollowCarouselSkeleton({ isDesktop }: { isDesktop: boolean }) {
  return (
    <EmblaCarousel
      options={{
        align: 'start',
        loop: false,
        dragFree: false,
        containScroll: 'trimSnaps',
      }}
      className="flex gap-4 px-2"
      isDesktop={isDesktop}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="min-w-[130px] flex flex-col gap-2 justify-between items-center rounded-xl p-3 shadow-md bg-white/5 backdrop-blur-md border border-white/10"
        >
          <Skeleton className="w-[80px] h-[80px] rounded-full" />
          <Skeleton className="w-[70px] h-[14px]" />
          <Skeleton className="w-full h-7 rounded-md" />
        </div>
      ))}
    </EmblaCarousel>
  );
}
