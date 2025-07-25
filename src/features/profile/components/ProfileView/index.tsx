'use client';

import { useRouter } from 'next/navigation';

import { TitleWithRouter } from '@/features/common/components/TitleWithRouter';
import { useProfile } from '@/features/profile/hooks/useProfile';

import { ProfileContentSections } from './ProfileContentSections';
import { ProfileHeader } from './ProfileHeader';
import { ProfileStats } from './ProfileStats';

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

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <div className="text-white">프로필을 불러올 수 없습니다.</div>
        <div className="text-red-400 text-sm">{error.message}</div>
        <button onClick={() => router.back()} className="text-cyan-400 underline">
          돌아가기
        </button>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <div className="text-white">프로필을 찾을 수 없습니다.</div>
        <button onClick={() => router.back()} className="text-cyan-400 underline">
          돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-full w-full pb-6">
      <TitleWithRouter title="프로필 보기" iconVariant="back" />

      <div className="space-y-6 px-4">
        <ProfileHeader profile={profile} />
        <ProfileStats profile={profile} />
        <ProfileContentSections profile={profile} />
      </div>
    </div>
  );
}
