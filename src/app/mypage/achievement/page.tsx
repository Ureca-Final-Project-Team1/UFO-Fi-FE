'use client';

import Image from 'next/image';

import { AchievementBadge } from '@/features/mypage/components/AchievementBadge';
import { Title } from '@/shared';
import { useViewportStore } from '@/stores/useViewportStore';

const titleName = ['우주 여행 입문자', '전파 항해자', '우주 개척자', '전설의 항해자'];

export default function AchievementPage() {
  const { isDesktop, isTablet } = useViewportStore();

  return (
    <div className="relative w-full min-h-full items-center flex flex-col gap-6">
      <Title iconVariant="back" className="w-full body-20-bold pb-2" title="업적 도감" />
      <p className="w-full text-center caption-12-medium">
        작지만 즐거운 업적을 모두 달성하고
        <br />
        칭호를 받아보세요!
      </p>
      <Image
        src="/images/alien-pointing.svg"
        alt="pointer"
        width={isDesktop ? 100 : isTablet ? 80 : 60}
        height={isDesktop ? 100 : isTablet ? 80 : 60}
        className="absolute top-5 right-4 z-20"
      />

      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex flex-col gap-4 w-full">
          <hr className="border-t border-[color:var(--color-hr-border)] w-full" />
          <p className="body-16-bold text-white">
            Lv.{i} {titleName[i - 1]}
          </p>
          <div className="relative w-full flex items-end justify-evenly">
            <Image
              src="/images/cloud.svg"
              alt="cloud"
              fill
              className="z-0 object-contain"
              aria-hidden="true"
            />
            {[1, 2, 3].map((j) => (
              <div key={`${i}-${j}`} className="relative z-10 flex flex-col items-center gap-1">
                <AchievementBadge i={i} j={j} isAchieve={false} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
