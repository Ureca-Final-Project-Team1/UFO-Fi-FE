import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

// Mock ProfileHeader for Storybook
const MockProfileHeader = ({
  profile = {
    userId: '12345',
    nickname: '우주탐험가',
    profileImageUrl: '',
  },
  isMyProfile = false,
  isLoggedIn = true,
  isFollowing = false,
}: {
  profile?: {
    userId: string;
    nickname: string;
    profileImageUrl: string;
  };
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
    console.log('공유 버튼 클릭됨');
  };

  return (
    <div className="space-y-4 bg-gray-900 p-6 rounded-lg">
      {/* 프로필 정보 */}
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0">
          {profile.profileImageUrl ? (
            <img
              src={profile.profileImageUrl}
              alt={profile.nickname}
              className="w-16 h-16 object-cover rounded-full"
            />
          ) : (
            <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center">
              <span className="text-2xl">👨‍🚀</span>
            </div>
          )}
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
          <span className="mr-1">📤</span>
          공유
        </button>
      </div>
    </div>
  );
};

const meta: Meta<typeof MockProfileHeader> = {
  title: 'Profile/ProfileHeader',
  component: MockProfileHeader,
  parameters: {
    layout: 'padded',
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
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    profile: {
      userId: '12345',
      nickname: '우주탐험가',
      profileImageUrl: '',
    },
    isMyProfile: false,
    isLoggedIn: true,
    isFollowing: false,
  },
};

export const MyProfile: Story = {
  args: {
    profile: {
      userId: '67890',
      nickname: '내프로필',
      profileImageUrl: '',
    },
    isMyProfile: true,
    isLoggedIn: true,
    isFollowing: false,
  },
};

export const Following: Story = {
  args: {
    profile: {
      userId: '11111',
      nickname: '팔로우중',
      profileImageUrl: '',
    },
    isMyProfile: false,
    isLoggedIn: true,
    isFollowing: true,
  },
};

export const NotLoggedIn: Story = {
  args: {
    profile: {
      userId: '22222',
      nickname: '로그인필요',
      profileImageUrl: '',
    },
    isMyProfile: false,
    isLoggedIn: false,
    isFollowing: false,
  },
};

export const WithProfileImage: Story = {
  args: {
    profile: {
      userId: '44444',
      nickname: '프로필이미지',
      profileImageUrl: 'https://via.placeholder.com/64x64/4F46E5/FFFFFF?text=IMG',
    },
    isMyProfile: false,
    isLoggedIn: true,
    isFollowing: false,
  },
};
