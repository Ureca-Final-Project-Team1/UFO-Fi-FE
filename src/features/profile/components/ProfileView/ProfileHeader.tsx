'use client';

import Image from 'next/image';
import { toast } from 'sonner';

import type { ProfileUser } from '@/api/types/profile';
import { useMyInfo } from '@/features/mypage/hooks/useMyInfo';
import { useFollowStatus } from '@/features/profile/hooks/useFollowStatus';
import { useProfileFollowActions } from '@/features/profile/hooks/useProfileFollowActions';
import { Avatar, Button, Icon } from '@/shared';
import { useModalStore } from '@/stores/useModalStore';

import { ProfileShareContent } from '../ProfileShare/ProfileShareContent';

interface ProfileHeaderProps {
  profile: ProfileUser;
  isMyProfile: boolean;
}

export function ProfileHeader({ profile, isMyProfile }: ProfileHeaderProps) {
  const { openModal } = useModalStore();
  const { data: myInfo } = useMyInfo();

  const isLoggedIn = !!myInfo;
  const isActuallyMyProfile = isMyProfile || myInfo?.nickname === profile.nickname || false;

  // 팔로우 상태 확인
  const { data: followStatus, isLoading: isFollowStatusLoading } = useFollowStatus(
    profile.userId,
    isLoggedIn && !isActuallyMyProfile,
  );

  // 팔로우 액션
  const { followUser, unfollowUser, isLoading: isFollowActionLoading } = useProfileFollowActions();

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

  const handleFollowClick = () => {
    if (!isLoggedIn) {
      alert('로그인이 필요합니다.');
      return;
    }

    if (followStatus?.isFollowing) {
      unfollowUser(profile.userId);
    } else {
      followUser(profile.userId);
    }
  };

  const isFollowing = followStatus?.isFollowing ?? false;
  const isButtonLoading = isFollowStatusLoading || isFollowActionLoading;

  return (
    <div className="space-y-4">
      {/* 프로필 정보 */}
      <div className="flex items-center gap-4">
        <Avatar variant="default" size="lg" className="flex-shrink-0">
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

        <div className="flex flex-col min-w-0 flex-1">
          <h1 className="text-white text-xl font-bold truncate">{profile.nickname}</h1>
          <span className="text-gray-400 text-sm">네임태그 #{profile.userId}</span>
        </div>
      </div>

      {/* 버튼들 - 전체 너비 활용 */}
      <div className="flex gap-2 w-full">
        {/* 팔로우 버튼 - 본인 프로필이 아닐 때만 표시 */}
        {isLoggedIn && !isActuallyMyProfile && (
          <Button
            variant={isFollowing ? 'following-button' : 'follow-button'}
            size="sm"
            onClick={handleFollowClick}
            disabled={isButtonLoading}
            className="flex-1"
          >
            {isButtonLoading ? (
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : isFollowing ? (
              '언팔로우'
            ) : (
              '팔로우'
            )}
          </Button>
        )}

        {/* 로그아웃 상태에서는 로그인 유도 */}
        {!isLoggedIn && (
          <Button
            variant="follow-button"
            size="sm"
            onClick={() => {
              toast('로그인이 필요합니다.');
            }}
            className="flex-1"
          >
            로그인
          </Button>
        )}

        {/* 공유 버튼 */}
        <Button variant="secondary" size="sm" onClick={handleShareClick} className="flex-1">
          <Icon name="Share" className="w-4 h-4 mr-1" />
          공유
        </Button>
      </div>
    </div>
  );
}
