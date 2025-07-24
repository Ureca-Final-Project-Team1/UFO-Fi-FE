'use client';

import Image from 'next/image';

import type { ProfileUser } from '@/api/types/profile';
import { Avatar, Button, Icon } from '@/shared';
import { useModalStore } from '@/stores/useModalStore';

import { ProfileShareContent } from '../ProfileShare/ProfileShareContent';

interface ProfileHeaderProps {
  profile: ProfileUser;
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  const { openModal } = useModalStore();

  const handleShareClick = () => {
    openModal('profileShare', {
      title: '공유하기',
      description: 'SNS를 통해서 프로필을 공유해보세요!',
      type: 'none',
      size: 'lg',
      hasCloseButton: true,
      closeButtonPosition: 'top-right',
      headerAlign: 'center',
      children: <ProfileShareContent profile={profile} />,
    });
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Avatar variant="default" size="lg">
          {profile.profileImageUrl ? (
            <Image
              src={profile.profileImageUrl}
              alt={profile.nickname}
              width={64}
              height={64}
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <Icon name="astronaut" className="w-12 h-12 text-purple-200" />
          )}
        </Avatar>

        <div className="flex flex-col">
          <h1 className="text-white text-xl font-bold">{profile.nickname}</h1>
          <span className="text-gray-400 text-sm">네임태그 #{profile.userId}</span>
        </div>
      </div>

      <div className="flex gap-2">
        <Button variant="secondary" size="sm" onClick={handleShareClick}>
          <Icon name="Share" className="w-4 h-4 mr-1" />
          공유
        </Button>
      </div>
    </div>
  );
}
