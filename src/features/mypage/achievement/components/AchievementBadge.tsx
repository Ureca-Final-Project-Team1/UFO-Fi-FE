import Image from 'next/image';

import { BADGE_ICONS, IMAGE_PATHS } from '@/constants';

export interface AchievementBadgeProps {
  className?: string;
  i: number;
  j: number;
  isAchieve: boolean;
  achievementName?: string;
  showName?: boolean;
  onClick?: () => void;
}

export const AchievementBadge = ({
  className,
  i,
  j,
  isAchieve,
  achievementName,
  showName = true,
  onClick,
}: AchievementBadgeProps) => {
  return (
    <div key={j} onClick={onClick} className={`${className} flex flex-col mb-5`}>
      <div className="relative w-[70px] h-[70px] border-2 border-(--color-badge-border) rounded-[14px] object-cover overflow-hidden">
        <Image
          key={`lv${i}-${j}`}
          src={BADGE_ICONS[`lv${i}-${j}`]}
          alt={`${i}-${j}`}
          fill
          className={`${!isAchieve ? 'blur-xs' : ''}`}
        />
        {!isAchieve && (
          <div className="w-[70px] h-[70px] flex justify-center items-center">
            <Image
              src={IMAGE_PATHS.BADGES_LOCKED}
              alt="locked"
              width={35}
              height={35}
              className="absolute z-10"
            />
          </div>
        )}
      </div>
      {showName && (
        <p className="text-center pt-12 caption-14-regular">{achievementName ?? '업적 이름'}</p>
      )}
    </div>
  );
};
