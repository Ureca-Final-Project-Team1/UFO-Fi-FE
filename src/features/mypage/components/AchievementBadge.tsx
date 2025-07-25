import Image from 'next/image';

export interface AchievementBadgeProps {
  className?: string;
  i: number;
  j: number;
  isAchieve: boolean;
  achievementName?: string;
}

export const AchievementBadge = ({
  className,
  i,
  j,
  isAchieve,
  achievementName,
}: AchievementBadgeProps) => {
  return (
    <div key={j} className={`${className} flex flex-col mb-5`}>
      <div className="relative w-[70px] h-[70px] border-2 border-(--color-badge-border) rounded-[14px] object-cover overflow-hidden">
        <Image
          key={`lv${i}-${j}`}
          src={`/icons/badges/lv${i}-${j}.svg`}
          alt={`${i}-${j}`}
          fill
          className={`${!isAchieve ? 'blur-xs' : ''}`}
        />
        {!isAchieve && (
          <div className="w-[70px] h-[70px] flex justify-center items-center">
            <Image
              src="/icons/badges/locked.svg"
              alt="locked"
              width={35}
              height={35}
              className="absolute z-10"
            />
          </div>
        )}
      </div>
      <p className="text-center pt-12 caption-14-regular">{achievementName ?? '업적 이름'}</p>
    </div>
  );
};
