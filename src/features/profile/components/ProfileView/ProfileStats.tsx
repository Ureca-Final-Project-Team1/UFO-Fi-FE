'use client';

import type { ProfileUser } from '@/api/types/profile';

interface ProfileStatsProps {
  profile: ProfileUser;
}

export function ProfileStats({ profile }: ProfileStatsProps) {
  return (
    <div className="flex flex-2 justify-center gap-16 text-center">
      <div className="flex flex-col items-center">
        <span className="text-white text-2xl font-bold">{profile.followerCount}</span>
        <span className="text-sm text-gray-400">팔로워</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-white text-2xl font-bold">{profile.followingCount}</span>
        <span className="text-sm text-gray-400">팔로잉</span>
      </div>
    </div>
  );
}
