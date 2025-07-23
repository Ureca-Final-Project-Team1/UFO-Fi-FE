'use client';

import { useRouter } from 'next/navigation';

import { useProfile } from '@/features/profile/hooks/useProfile';
import { Title } from '@/shared';

import { ProfileHeader } from './ProfileHeader';
import { ProfileStats } from './ProfileStats';
import { ProfileTabs } from './ProfileTabs';

interface ProfileViewProps {
  userId: number;
}

export function ProfileView({ userId }: ProfileViewProps) {
  const router = useRouter();
  const { data: profile, isLoading, error } = useProfile(userId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white">프로필을 불러오는 중...</div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <div className="text-white">프로필을 불러올 수 없습니다.</div>
        <button onClick={() => router.back()} className="text-cyan-400 underline">
          돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-full w-full pb-6">
      <Title title="프로필" iconVariant="back" />
      <div className="space-y-6 px-4">
        <ProfileHeader profile={profile} />
        <ProfileStats profile={profile} />
        <ProfileTabs profile={profile} />
      </div>
    </div>
  );
}
