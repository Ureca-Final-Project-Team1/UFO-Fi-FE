'use client';

import { useRouter } from 'next/navigation';

import { useProfileWithFollow } from '@/features/profile/hooks/useProfileWithFollow';
import { Button, Loading, Title } from '@/shared';

import { ProfileContentSections } from './ProfileContentSections';
import { ProfileHeader } from './ProfileHeader';
import { ProfileStats } from './ProfileStats';

interface ProfileViewProps {
  userId: number;
}

export function ProfileView({ userId }: ProfileViewProps) {
  const router = useRouter();
  const { data: profile, isLoading, error, isMyProfile } = useProfileWithFollow(userId);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="flex flex-col w-full pb-6">
        <div className="text-white">프로필을 불러올 수 없습니다.</div>
        <div className="text-red-400 text-sm">{error.message}</div>
        <Button type="button" size="full-width" onClick={() => router.back()}>
          돌아가기
        </Button>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex flex-col w-full pb-6">
        <div className="text-white">프로필을 찾을 수 없습니다.</div>
        <Button type="button" size="full-width" onClick={() => router.back()}>
          돌아가기
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full pb-6">
      <Title title="프로필 보기" iconVariant="back" />

      <div className="space-y-6 px-4">
        <ProfileHeader profile={profile} isMyProfile={isMyProfile} />
        <ProfileStats profile={profile} />
        <ProfileContentSections profile={profile} />
      </div>
    </div>
  );
}
