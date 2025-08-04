import type { Meta, StoryObj } from '@storybook/react';

import type { ProfileUser } from '@/backend/types/profile';

const createMockProfile = (overrides?: Partial<ProfileUser>): ProfileUser => ({
  userId: 308,
  nickname: '신나는 지구인 #308',
  profileImageUrl: '',
  followerCount: 21,
  followingCount: 6,
  tradePostsRes: [],
  ...overrides,
});

// Mock ProfileStats for Storybook
const MockProfileStats = ({ profile = createMockProfile() }: { profile?: ProfileUser }) => {
  return (
    <div className="w-full bg-gray-900 p-4">
      <div className="max-w-md mx-auto">
        <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
          <h2 className="text-white text-base font-semibold mb-4">프로필 통계</h2>

          <div className="flex flex-2 justify-center gap-16 text-center">
            <div className="flex flex-col items-center">
              <span className="text-white text-2xl font-bold">{profile.followerCount}</span>
              <span className="text-sm text-gray-400">팔로워</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-white text-2xl font-bold">{profile.followingCount}</span>
              <span className="text-sm text-gray-400">팔로잉</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const meta: Meta<typeof MockProfileStats> = {
  title: 'Profile/ProfileStats',
  component: MockProfileStats,
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
  },
};

export default meta;
type Story = StoryObj<typeof MockProfileStats>;

export const Default: Story = {
  args: {
    profile: createMockProfile(),
  },
};

export const HighFollowers: Story = {
  args: {
    profile: createMockProfile({
      followerCount: 10000,
      followingCount: 50,
    }),
  },
};

export const LowFollowers: Story = {
  args: {
    profile: createMockProfile({
      followerCount: 5,
      followingCount: 10,
    }),
  },
};

export const EqualCounts: Story = {
  args: {
    profile: createMockProfile({
      followerCount: 100,
      followingCount: 100,
    }),
  },
};

export const ZeroCounts: Story = {
  args: {
    profile: createMockProfile({
      followerCount: 0,
      followingCount: 0,
    }),
  },
};

export const Desktop: Story = {
  args: {
    profile: createMockProfile(),
  },
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};
