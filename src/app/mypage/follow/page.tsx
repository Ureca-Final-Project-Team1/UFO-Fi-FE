'use client';

import { useMemo } from 'react';

import { TitleWithRouter } from '@/features/common/components/TitleWithRouter';
import FollowTabContent from '@/features/mypage/follow/components/FollowTabContent';
import { useFollowActions } from '@/features/mypage/follow/hooks/useFollowActions';
import { useFollowers } from '@/features/mypage/follow/hooks/useFollowers';
import { useFollowing } from '@/features/mypage/follow/hooks/useFollowing';
import { FOLLOW_TYPE } from '@/features/mypage/follow/types/FollowType.types';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/shared/ui';

export default function Page() {
  const { data: followersData, isLoading: followersLoading } = useFollowers();
  const { data: followingData, isLoading: followingLoading } = useFollowing();
  const { followUser, unfollowUser } = useFollowActions();

  const followers = useMemo(() => {
    if (!followersData?.followersReadRes) return [];

    return followersData.followersReadRes.map((user) => ({
      id: `#${user.id}`,
      profileImage: user.profilePhotoUrl || '/images/avatar.png',
      isFollowing: false,
      username: user.username,
      nickname: user.nickname,
    }));
  }, [followersData]);

  const following = useMemo(() => {
    if (!followingData?.followingsReadRes) return [];

    return followingData.followingsReadRes.map((user) => ({
      id: `#${user.id}`,
      profileImage: user.profilePhotoUrl || '/images/avatar.png',
      isFollowing: true,
      username: user.username,
      nickname: user.nickname,
    }));
  }, [followingData]);

  const handleFollow = (userId: string) => {
    const numericId = parseInt(userId.replace('#', ''));
    followUser(numericId);
  };

  const handleUnfollow = (userId: string) => {
    const numericId = parseInt(userId.replace('#', ''));
    unfollowUser(numericId);
  };

  const followerActions = {
    onFollow: handleFollow,
    onUnfollow: handleUnfollow,
  };

  const followingActions = {
    onFollow: handleFollow,
    onUnfollow: handleUnfollow,
  };

  return (
    <div className="min-h-screen w-full text-white">
      <TitleWithRouter title="팔로우 목록" iconVariant="back" />

      <div className="mx-4 mb-6">
        <Tabs defaultValue="followers">
          <TabsList className="bg-transparent w-full mb-6">
            <TabsTrigger value="followers" variant="darkTab" size="full">
              팔로워 {followers.length > 0 && `(${followers.length})`}
            </TabsTrigger>
            <TabsTrigger value="following" variant="darkTab" size="full">
              팔로잉 {following.length > 0 && `(${following.length})`}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="followers" className="text-white">
            {followersLoading ? (
              <div className="flex justify-center py-8">
                <div className="text-white">팔로워 목록을 불러오는 중...</div>
              </div>
            ) : (
              <FollowTabContent
                users={followers}
                type={FOLLOW_TYPE.FOLLOWER}
                actions={followerActions}
                emptyMessage="팔로워가 없습니다."
              />
            )}
          </TabsContent>

          <TabsContent value="following" className="text-white">
            {followingLoading ? (
              <div className="flex justify-center py-8">
                <div className="text-white">팔로잉 목록을 불러오는 중...</div>
              </div>
            ) : (
              <FollowTabContent
                users={following}
                type={FOLLOW_TYPE.FOLLOWING}
                actions={followingActions}
                emptyMessage="팔로잉한 사용자가 없습니다."
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
