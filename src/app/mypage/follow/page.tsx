'use client';

import FollowItem from '@/features/mypage/follow/components/FollowItem';
import { Title, Tabs, TabsList, TabsTrigger, TabsContent } from '@/shared/ui';

export default function Page() {
  // 더미 데이터
  const followers = [
    {
      id: 1,
      userId: '#308',
      profileImage: '/images/avatar.png',
      isFollowing: false, // 맞팔로우 여부
    },
    {
      id: 2,
      userId: '#309',
      profileImage: '/images/avatar.png',
      isFollowing: true, // 맞팔로우 상태
    },
    // 필요에 따라 더 추가
  ];

  const following = [
    {
      id: 1,
      userId: '#310',
      profileImage: '/images/avatar.png',
      isFollowing: true, // 항상 true (내가 팔로우한 사람들)
    },
    // 필요에 따라 더 추가
  ];

  const handleFollow = (userId: string) => {
    console.warn('[follow]', userId);
  };

  const handleUnfollow = (userId: string) => {
    console.warn('[unfollow]', userId);
  };

  const handleDelete = (userId: string) => {
    console.warn('[delete]', userId);
  };

  return (
    <div className="min-h-screen w-full text-white">
      {/* 헤더 */}
      <Title title="팔로우 목록" iconVariant="back" onClick={() => window.history.back()} />

      {/* 탭 메뉴 */}
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
            <div className="flex items-center flex-col px-4 space-y-4 min-h-[400px]">
              {followers.length === 0 ? (
                <p className="text-gray-400 mt-20">팔로워가 없습니다.</p>
              ) : (
                followers.map((user) => (
                  <FollowItem
                    key={user.id}
                    userId={user.userId}
                    profileImage={user.profileImage}
                    isFollowing={user.isFollowing}
                    onFollow={handleFollow}
                    onUnfollow={handleUnfollow}
                    onDelete={handleDelete}
                    type="follower"
                  />
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="following" className="text-white">
            <div className="flex items-center flex-col px-4 space-y-4 min-h-[400px]">
              {following.length === 0 ? (
                <p className="text-gray-400 mt-20">팔로잉한 사용자가 없습니다.</p>
              ) : (
                following.map((user) => (
                  <FollowItem
                    key={user.id}
                    userId={user.userId}
                    profileImage={user.profileImage}
                    isFollowing={user.isFollowing}
                    onFollow={handleFollow}
                    onUnfollow={handleUnfollow}
                    type="following"
                  />
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
