'use client';

import FollowTabContent from '@/features/mypage/follow/components/FollowTabContent';
import { FOLLOW_TYPE } from '@/features/mypage/follow/types/FollowType.types';
import { Title, Tabs, TabsList, TabsTrigger, TabsContent } from '@/shared/ui';

export default function Page() {
  const followers = [
    {
      id: '#308',
      profileImage: '/images/avatar.png',
      isFollowing: false,
    },
    {
      id: '#309',
      profileImage: '/images/avatar.png',
      isFollowing: true,
    },
  ];

  const following = [
    {
      id: '#310',
      profileImage: '/images/avatar.png',
      isFollowing: true,
    },
  ];

  const handleFollow = (userId: string) => {
    console.warn('[follow]', userId);
  };

  const handleUnfollow = (userId: string) => {
    console.warn('[unfollow]', userId);
  };

  // 팔로워 탭 액션 (삭제 기능 포함)
  const followerActions = {
    onFollow: handleFollow,
    onUnfollow: handleUnfollow,
  };

  // 팔로잉 탭 액션 (삭제 기능 없음)
  const followingActions = {
    onFollow: handleFollow,
    onUnfollow: handleUnfollow,
  };

  return (
    <div className="min-h-screen w-full text-white">
      <Title title="팔로우 목록" iconVariant="back" onClick={() => window.history.back()} />

      <div className="mx-4 mb-6">
        <Tabs defaultValue="followers">
          <TabsList className="bg-transparent w-full mb-6">
            <TabsTrigger value="followers" variant="darkTab" size="full">
              팔로워
            </TabsTrigger>
            <TabsTrigger value="following" variant="darkTab" size="full">
              팔로잉
            </TabsTrigger>
          </TabsList>

          <TabsContent value="followers" className="text-white">
            <FollowTabContent
              users={followers}
              type={FOLLOW_TYPE.FOLLOWER}
              actions={followerActions}
              emptyMessage="팔로워가 없습니다."
            />
          </TabsContent>

          <TabsContent value="following" className="text-white">
            <FollowTabContent
              users={following}
              type={FOLLOW_TYPE.FOLLOWING}
              actions={followingActions}
              emptyMessage="팔로잉한 사용자가 없습니다."
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
