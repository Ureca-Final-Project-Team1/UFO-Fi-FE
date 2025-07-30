'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import { achievementsAPI } from '@/api/services/mypage/achievement';
import { IMAGE_PATHS } from '@/constants';
import { AchievementBadge } from '@/features/mypage/components/AchievementBadge';
import { Loading, Title } from '@/shared';
import AchievementModal from '@/shared/ui/Modal/AchievementModal';
import { useViewportStore } from '@/stores/useViewportStore';
import { Achievement, SelectedAchievementState } from '@/types/Achievement';

const titleName = ['우주 여행 입문자', '전파 항해자', '우주 개척자', '전설의 항해자'];

export default function AchievementPage() {
  const [selectedAchievement, setSelectedAchievement] = useState<SelectedAchievementState | null>(
    null,
  );
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const { isDesktop, isTablet } = useViewportStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [levels, setLevels] = useState({
    trade: 0,
    follow: 0,
    rotate: 0,
    total: 0,
  });

  const handleClick = (i: number, j: number, isAchieve: boolean) => {
    const type = j === 1 ? 'trade' : j === 2 ? 'rotate' : 'follow';
    const matched = achievements.find((a) => a.level === i && a.type === type);
    if (matched) {
      setSelectedAchievement({
        achievement: matched,
        i,
        j,
        isAchieve,
      });
      setIsModalOpen(true);
    }
  };
  useEffect(() => {
    setIsLoading(true);
    achievementsAPI
      .updateAchievements()
      .then((res) => {
        if (!res) {
          console.warn('업적 응답 데이터가 비어 있습니다.');
          return;
        }

        setLevels({
          trade: res.trade_level,
          follow: res.follow_level,
          rotate: res.rotate_level,
          total: res.total_level,
        });
        setAchievements(
          (res.achievements ?? []).map((a) => ({
            ...a,
            id: Number(a.id),
            type: a.type as 'trade' | 'follow' | 'rotate',
          })),
        );
      })
      .catch((err) => {
        console.error('Achievement fetch error:', err);
        setError('업적 정보를 불러오는데 실패했습니다.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <Loading />;
  if (error)
    return <div className="w-full min-h-full flex justify-center items-center">{error}</div>;

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
              src={IMAGE_PATHS.CLOUD}
              alt="cloud"
              fill
              className="z-0 object-contain"
              aria-hidden="true"
            />
            {[1, 2, 3].map((j) => {
              const type = j === 1 ? 'trade' : j === 2 ? 'rotate' : 'follow';
              const isAchieve = levels[type] >= i;

              const achievementName =
                achievements.find((a) => a.level === i && a.type === type)?.name ?? '';

              return (
                <div key={`${i}-${j}`} className="relative z-10 flex flex-col items-center gap-1">
                  <AchievementBadge
                    i={i}
                    j={j}
                    isAchieve={levels.total >= i - 1 ? isAchieve : false}
                    achievementName={achievementName}
                    onClick={() => handleClick(i, j, levels.total >= i - 1 ? isAchieve : false)}
                    className="hover:cursor-pointer"
                  />
                </div>
              );
            })}
          </div>
        </div>
      ))}
      <AchievementModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        achievement={selectedAchievement}
      />
    </div>
  );
}
