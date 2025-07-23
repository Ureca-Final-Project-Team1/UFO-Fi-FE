'use client';

import { useState } from 'react';

import type { ProfileUser } from '@/api/types/profile';
import { Avatar, Button, Icon } from '@/shared';

import { ProfileShare } from '../ProfileShare';

interface ProfileHeaderProps {
  profile: ProfileUser;
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  const [showShareModal, setShowShareModal] = useState(false);

  const handleShareClick = () => {
    setShowShareModal(true);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Avatar variant="default" size="lg">
          {profile.profileImageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={profile.profileImageUrl}
              alt={profile.nickname}
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <Icon name="astronaut" className="w-12 h-12 text-purple-200" />
          )}
        </Avatar>

        <div className="flex flex-col">
          <h1 className="text-white text-xl font-bold">{profile.nickname}</h1>
          <span className="text-gray-400 text-sm">지구인 #{profile.userId}</span>
        </div>
      </div>

      <div className="flex gap-2">
        <Button variant="secondary" size="sm" onClick={handleShareClick}>
          <Icon name="Share" className="w-4 h-4 mr-1" />
          공유
        </Button>
      </div>

      <ProfileShare
        profile={profile}
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
      />
    </div>
  );
}
