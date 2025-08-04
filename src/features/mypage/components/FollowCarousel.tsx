'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { followActionsAPI } from '@/backend';
import { recommendAPI } from '@/backend/services/follow/recommend';
import EmblaCarousel from '@/features/profile/components/Carousel/EmblaCarousel';
import { Button } from '@/shared';
import { useViewportStore } from '@/stores/useViewportStore';

import { useMyInfo } from '../hooks';
import { FollowCarouselSkeleton } from './FollowCarouselSkeleton';

type Neighbor = {
  id: number;
  nickname: string;
  profile: string;
};

export function FollowCarousel() {
  const { isDesktop } = useViewportStore();
  const { data: myInfo } = useMyInfo();
  const isLoggedIn = !!myInfo;

  const [neighbors, setNeighbors] = useState<Neighbor[]>([]);
  const [loading, setLoading] = useState(true);
  const [followStatusMap, setFollowStatusMap] = useState<Record<number, boolean>>({});
  const [actionLoadingMap, setActionLoadingMap] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        // await recommendAPI.updateQdrantCollection();
        const data = await recommendAPI.findRecommendUsers();
        setNeighbors(data ?? []);

        const initialMap = Object.fromEntries((data ?? []).map((n) => [n.id, false]));
        setFollowStatusMap(initialMap);
      } catch (err) {
        console.error('팔로우 추천 조회 실패:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  const handleFollowToggle = async (userId: number) => {
    if (!isLoggedIn) {
      toast.error('로그인이 필요합니다.');
      return;
    }

    const isFollowing = followStatusMap[userId] ?? false;
    setActionLoadingMap((prev) => ({ ...prev, [userId]: true }));

    try {
      if (isFollowing) {
        await followActionsAPI.unfollowUser(userId);
      } else {
        await followActionsAPI.followUser(userId);
      }

      setFollowStatusMap((prev) => ({
        ...prev,
        [userId]: !isFollowing,
      }));
    } catch {
      toast.error('팔로우 처리 중 오류가 발생했습니다.');
    } finally {
      setActionLoadingMap((prev) => ({ ...prev, [userId]: false }));
    }
  };

  if (loading) {
    return <FollowCarouselSkeleton isDesktop={isDesktop} />;
  }

  if (!neighbors.length) {
    return (
      <div className="w-full h-[180px] flex items-center justify-center rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
        <p className="body-16-regular text-white/70">팔로워 추천 결과가 없습니다.</p>
      </div>
    );
  }

  return (
    <EmblaCarousel
      options={{ align: 'start', loop: false, dragFree: false, containScroll: 'trimSnaps' }}
      className="flex gap-4 px-2"
      isDesktop={isDesktop}
    >
      {neighbors.map((n) => {
        const isFollowing = followStatusMap[n.id] ?? false;
        const isButtonLoading = actionLoadingMap[n.id] ?? false;

        return (
          <div
            key={n.id}
            className="min-w-[130px] flex flex-col gap-2 justify-between items-center rounded-xl p-3 shadow-md bg-white/10 backdrop-blur-md border border-white/20"
          >
            <Image
              src={n.profile}
              alt={`${n.nickname}-profile`}
              width={80}
              height={80}
              className="rounded-full object-cover border-2 border-white"
            />
            <p className="caption-14-bold text-center text-white drop-shadow">{n.nickname}</p>
            <Button
              variant={isFollowing ? 'following-button' : 'follow-button'}
              onClick={() => handleFollowToggle(n.id)}
              className={`w-full h-7 rounded-md caption-14-bold bg-gradient-to-r ${
                isFollowing
                  ? 'from-gray-400 to-gray-500 text-white'
                  : 'from-purple-500 to-indigo-500 text-white'
              }`}
              disabled={isButtonLoading}
            >
              {isButtonLoading ? (
                <div className="size-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : isFollowing ? (
                '언팔로우'
              ) : (
                '팔로우'
              )}
            </Button>
          </div>
        );
      })}
    </EmblaCarousel>
  );
}
