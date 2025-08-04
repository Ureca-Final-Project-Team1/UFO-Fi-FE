import type { Meta, StoryObj } from '@storybook/react';

// Mock ProfileStats for Storybook
const MockProfileStats = ({
  followerCount = 1234,
  followingCount = 567,
}: {
  followerCount?: number;
  followingCount?: number;
}) => {
  return (
    <div className="flex flex-2 justify-center gap-16 text-center bg-gray-900 p-6 rounded-lg">
      <div className="flex flex-col items-center">
        <span className="text-white text-2xl font-bold">{followerCount}</span>
        <span className="text-sm text-gray-400">팔로워</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-white text-2xl font-bold">{followingCount}</span>
        <span className="text-sm text-gray-400">팔로잉</span>
      </div>
    </div>
  );
};

const meta: Meta<typeof MockProfileStats> = {
  title: 'Profile/ProfileStats',
  component: MockProfileStats,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    followerCount: {
      control: { type: 'number', min: 0 },
      description: '팔로워 수',
    },
    followingCount: {
      control: { type: 'number', min: 0 },
      description: '팔로잉 수',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    followerCount: 1234,
    followingCount: 567,
  },
};

export const HighFollowers: Story = {
  args: {
    followerCount: 10000,
    followingCount: 50,
  },
};

export const LowFollowers: Story = {
  args: {
    followerCount: 5,
    followingCount: 10,
  },
};

export const EqualCounts: Story = {
  args: {
    followerCount: 100,
    followingCount: 100,
  },
};

export const ZeroCounts: Story = {
  args: {
    followerCount: 0,
    followingCount: 0,
  },
};
