import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import type { ProfileUser } from '@/backend/types/profile';
import { IMAGE_PATHS } from '@/constants/images';
import { Icon } from '@/shared';

const createMockProfile = (overrides?: Partial<ProfileUser>): ProfileUser => ({
  userId: 308,
  nickname: '신나는 지구인 #308',
  profileImageUrl: IMAGE_PATHS.AVATAR,
  followerCount: 21,
  followingCount: 6,
  tradePostsRes: [],
  ...overrides,
});

// Mock ProfileHeader for Storybook
const MockProfileHeader = ({
  profile = createMockProfile(),
  isMyProfile = false,
  isLoggedIn = true,
  isFollowing = false,
}: {
  profile?: ProfileUser;
  isMyProfile?: boolean;
  isLoggedIn?: boolean;
  isFollowing?: boolean;
}) => {
  const [following, setFollowing] = useState(isFollowing);

  const handleFollowClick = () => {
    if (!isLoggedIn) {
      alert('로그인이 필요합니다.');
      return;
    }

    setFollowing(!following);
  };

  const handleShareClick = () => {
    // 공유 버튼 클릭됨
  };

  return (
    <div className="w-full bg-gray-900 p-4">
      <div className="max-w-md mx-auto">
        <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
          <h2 className="text-white text-base font-semibold mb-4">프로필 헤더</h2>

          <div className="space-y-4">
            {/* 프로필 정보 */}
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-purple-200 rounded-full flex items-center justify-center">
                  <Icon name="astronaut" className="size-8 text-purple-600" />
                </div>
              </div>

              <div className="flex flex-col min-w-0 flex-1">
                <h1 className="text-white text-xl font-bold truncate">{profile.nickname}</h1>
                <span className="text-gray-400 text-sm">네임태그 #{profile.userId}</span>
              </div>
            </div>

            {/* 버튼들 - 전체 너비 활용 */}
            <div className="flex gap-2 w-full">
              {/* 팔로우 버튼 - 본인 프로필이 아닐 때만 표시 */}
              {isLoggedIn && !isMyProfile && (
                <button
                  onClick={handleFollowClick}
                  className={`flex-1 py-2 px-4 rounded text-sm font-medium transition-colors ${
                    following
                      ? 'bg-gray-600 text-white hover:bg-gray-700'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  {following ? '언팔로우' : '팔로우'}
                </button>
              )}

              {/* 로그아웃 상태에서는 로그인 유도 */}
              {!isLoggedIn && (
                <button
                  onClick={() => alert('로그인이 필요합니다.')}
                  className="flex-1 py-2 px-4 rounded text-sm font-medium bg-blue-500 text-white hover:bg-blue-600"
                >
                  로그인
                </button>
              )}

              {/* 공유 버튼 */}
              <button
                onClick={handleShareClick}
                className="flex-1 py-2 px-4 rounded text-sm font-medium bg-gray-600 text-white hover:bg-gray-700 flex items-center justify-center"
              >
                <Icon name="Share" className="size-4 mr-1" />
                공유
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const meta: Meta<typeof MockProfileHeader> = {
  title: 'Profile/ProfileHeader',
  component: MockProfileHeader,
  parameters: {
    layout: 'padded',
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    profile: {
      control: { type: 'object' },
      description: '프로필 정보',
    },
    isMyProfile: {
      control: { type: 'boolean' },
      description: '내 프로필 여부',
    },
    isLoggedIn: {
      control: { type: 'boolean' },
      description: '로그인 상태',
    },
    isFollowing: {
      control: { type: 'boolean' },
      description: '팔로우 상태',
    },
  },
};

export default meta;
type Story = StoryObj<typeof MockProfileHeader>;

export const Default: Story = {
  args: {
    profile: createMockProfile(),
    isMyProfile: false,
    isLoggedIn: true,
    isFollowing: false,
  },
};

export const MyProfile: Story = {
  args: {
    profile: createMockProfile({ userId: 67890, nickname: '내프로필' }),
    isMyProfile: true,
    isLoggedIn: true,
    isFollowing: false,
  },
};

export const Following: Story = {
  args: {
    profile: createMockProfile({ userId: 11111, nickname: '팔로우중' }),
    isMyProfile: false,
    isLoggedIn: true,
    isFollowing: true,
  },
};

export const NotLoggedIn: Story = {
  args: {
    profile: createMockProfile({ userId: 22222, nickname: '로그인필요' }),
    isMyProfile: false,
    isLoggedIn: false,
    isFollowing: false,
  },
};

export const WithProfileImage: Story = {
  args: {
    profile: createMockProfile({
      userId: 44444,
      nickname: '프로필이미지',
      profileImageUrl: IMAGE_PATHS.AVATAR,
    }),
    isMyProfile: false,
    isLoggedIn: true,
    isFollowing: false,
  },
};

export const Desktop: Story = {
  args: {
    profile: createMockProfile(),
    isMyProfile: false,
    isLoggedIn: true,
    isFollowing: false,
  },
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};
