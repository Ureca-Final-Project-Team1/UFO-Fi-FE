'use client';

import type { ProfileUser } from '@/api/types/profile';

interface ProfileStatsProps {
  profile: ProfileUser;
}

export function ProfileStats({ profile }: ProfileStatsProps) {
  return (
    <div className="flex justify-center gap-8">
      <div className="text-center">
        <div className="text-white text-lg font-bold">팔로워 {profile.followerCount}명</div>
      </div>

      <div className="text-center">
        <div className="text-white text-lg font-bold">팔로잉 {profile.followingCount}명</div>
      </div>
    </div>
  );
}
