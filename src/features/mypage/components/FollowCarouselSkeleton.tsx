'use client';

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
      className="flex gap-4 h-[160px]"
      isDesktop={isDesktop}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="min-w-[120px] flex flex-col gap-2 justify-between items-center rounded-xl p-3 shadow-md bg-white/5 backdrop-blur-md border border-white/10"
        >
          <Skeleton className="w-[75px] h-[75px] rounded-full" />
          <Skeleton className="w-[70px] h-[14px]" />
          <Skeleton className="w-full h-6 rounded-md" />
        </div>
      ))}
    </EmblaCarousel>
  );
}
