import type { Meta, StoryObj } from '@storybook/react';

import { Carrier } from '@/api/types/carrier';
import { MobileDataType } from '@/api/types/mobileData';
import type { ProfileUser } from '@/api/types/profile';
import { IMAGE_PATHS } from '@/constants/images';

const createMockProfile = (overrides?: Partial<ProfileUser>): ProfileUser => ({
  userId: 308,
  nickname: '신나는 지구인 #308',
  profileImageUrl: IMAGE_PATHS.AVATAR,
  followerCount: 21,
  followingCount: 6,
  tradePostsRes: [
    {
      postId: 1,
      mobileDataType: '_5G' as MobileDataType,
      carrier: Carrier.LGU,
      sellMobileDataAmountGB: 5,
      title: '5GX 프리미엄 팝니다',
      createdAt: '2025-07-16T08:28:37',
    },
    {
      postId: 2,
      mobileDataType: '_5G' as MobileDataType,
      carrier: Carrier.KT,
      sellMobileDataAmountGB: 3,
      title: '요고 다이렉트 요고 38',
      createdAt: '2025-07-15T14:20:00',
    },
    {
      postId: 3,
      mobileDataType: 'LTE' as MobileDataType,
      carrier: Carrier.SKT,
      sellMobileDataAmountGB: 7,
      title: '데이터 쉐어링 플랜',
      createdAt: '2025-07-14T10:15:30',
    },
  ],
  ...overrides,
});

const getMockProfileById = (userId: number): ProfileUser => {
  switch (userId) {
    case 1:
      return createMockProfile({ userId: 1, nickname: '내 프로필' });
    case 999:
      return createMockProfile({ userId: 999, nickname: '팔로잉중인 지구인' });
    case 888:
      return createMockProfile({ userId: 888, nickname: '미팔로우 지구인' });
    default:
      return createMockProfile();
  }
};

// 팔로우 버튼 컴포넌트 추가
const FollowButton = ({
  isFollowing,
  isLoggedIn = true,
}: {
  isFollowing?: boolean;
  isMyProfile?: boolean;
  isLoggedIn?: boolean;
}) => {
  if (!isLoggedIn) {
    return (
      <button className="px-4 py-2 bg-primary-300 text-white rounded-lg text-sm hover:bg-primary-400 transition-colors">
        로그인
      </button>
    );
  }

  return (
    <button
      className={`px-4 py-2 rounded-lg text-sm transition-colors ${
        isFollowing
          ? 'bg-gray-100 text-black hover:bg-gray-200'
          : 'bg-primary-300 text-white hover:bg-primary-400'
      }`}
    >
      {isFollowing ? '언팔로우' : '팔로우'}
    </button>
  );
};

const MockProfileView = ({
  userId,
  isMyProfile = false,
  isFollowing = false,
  isLoggedIn = true,
}: {
  userId: number;
  isMyProfile?: boolean;
  isFollowing?: boolean;
  isLoggedIn?: boolean;
}) => {
  const profile = getMockProfileById(userId);

  return (
    <div className="flex flex-col w-full pb-6">
      <div className="flex items-center p-4 border-b border-white/10">
        <button className="text-white mr-4">←</button>
        <h1 className="text-white text-lg font-bold">{profile.nickname}의 프로필</h1>
      </div>

      <div className="space-y-6 px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-purple-200 rounded-full flex items-center justify-center">
              {profile.profileImageUrl ? (
                <img
                  src={profile.profileImageUrl}
                  alt={profile.nickname}
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <span>👽</span>
              )}
            </div>
            <div className="flex flex-col">
              <h1 className="text-white text-xl font-bold">{profile.nickname}</h1>
              <span className="text-gray-400 text-sm">지구인 #{profile.userId}</span>
            </div>
          </div>

          <div className="flex gap-2">
            <FollowButton
              isFollowing={isFollowing}
              isMyProfile={isMyProfile}
              isLoggedIn={isLoggedIn}
            />
            <button className="px-4 py-2 bg-gray-700 text-white rounded-lg text-sm hover:bg-gray-600 transition-colors flex items-center gap-1">
              공유
            </button>
          </div>
        </div>

        <div className="flex justify-center gap-8">
          <div className="text-center">
            <div className="text-white text-lg font-bold">팔로워 {profile.followerCount}명</div>
          </div>
          <div className="text-center">
            <div className="text-white text-lg font-bold">팔로잉 {profile.followingCount}명</div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <h3 className="text-white font-semibold text-lg">거래 현황</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-300 text-sm">7일 평균 거래량</span>
                <span className="text-white text-sm font-medium">2건</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300 text-sm">7일 평균 거래 시간</span>
                <div className="flex items-center gap-1">
                  <span className="text-white text-sm font-medium">낮</span>
                  <span className="text-lg">☀️</span>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-white opacity-20"></div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="text-white font-semibold text-lg">판매중인 데이터</h3>
              {profile.tradePostsRes.length > 0 && (
                <button className="text-cyan-400 text-sm hover:text-cyan-300 transition-colors">
                  자세히 보기
                </button>
              )}
            </div>

            {profile.tradePostsRes.length > 0 ? (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {profile.tradePostsRes.map((post) => (
                  <div
                    key={post.postId}
                    className="bg-gray-800 rounded-lg p-4 w-24 h-24 flex flex-col items-center justify-center space-y-2 flex-shrink-0"
                  >
                    <div className="w-6 h-6 bg-red-500 rounded"></div>
                    <div className="text-cyan-400 text-xs font-bold text-center">
                      {post.sellMobileDataAmountGB}GB
                    </div>
                    <div className="text-gray-400 text-xs">250ZET</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-400 py-4">판매중인 데이터가 없습니다.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const meta: Meta<typeof MockProfileView> = {
  title: 'Components/Profile/ProfileView',
  component: MockProfileView,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '사용자 프로필 전체 뷰 컴포넌트 - 팔로우/언팔로우 기능 포함',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-gray-900">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    userId: {
      control: 'number',
      description: '조회할 사용자 ID',
    },
    isMyProfile: {
      control: 'boolean',
      description: '내 프로필 여부',
    },
    isFollowing: {
      control: 'boolean',
      description: '팔로우 상태',
    },
    isLoggedIn: {
      control: 'boolean',
      description: '로그인 상태',
    },
  },
};

export default meta;
type Story = StoryObj<typeof MockProfileView>;

export const Default: Story = {
  args: {
    userId: 308,
    isMyProfile: false,
    isFollowing: false,
    isLoggedIn: true,
  },
};

export const MyProfile: Story = {
  args: {
    userId: 1,
    isMyProfile: true,
    isFollowing: false,
    isLoggedIn: true,
  },
  parameters: {
    docs: {
      description: { story: '내 프로필을 표시할 때는 "내 프로필" 표시가 나타납니다.' },
    },
  },
};

export const NotFollowingUser: Story = {
  args: {
    userId: 888,
    isMyProfile: false,
    isFollowing: false,
    isLoggedIn: true,
  },
  parameters: {
    docs: {
      description: { story: '팔로우하지 않은 사용자의 프로필 - "팔로우" 버튼이 표시됩니다.' },
    },
  },
};

export const FollowingUser: Story = {
  args: {
    userId: 999,
    isMyProfile: false,
    isFollowing: true,
    isLoggedIn: true,
  },
  parameters: {
    docs: {
      description: { story: '이미 팔로우한 사용자의 프로필 - "언팔로우" 버튼이 표시됩니다.' },
    },
  },
};
