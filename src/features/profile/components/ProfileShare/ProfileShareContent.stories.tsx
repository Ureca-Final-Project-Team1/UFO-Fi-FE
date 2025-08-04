import type { Meta, StoryObj } from '@storybook/react';

// Mock ProfileShareContent for Storybook
const MockProfileShareContent = ({
  profile = {
    userId: '12345',
    nickname: '우주탐험가',
    profileImageUrl: '',
    followerCount: 100,
    followingCount: 50,
  },
}: {
  profile?: {
    userId: string;
    nickname: string;
    profileImageUrl: string;
    followerCount: number;
    followingCount: number;
  };
}) => {
  const profileUrl = `https://ufo-fi.com/profile/${profile.userId}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(profileUrl);
    // 링크가 복사되었습니다: // console.log removed
  };

  const handleClose = () => {
    // 모달이 닫힙니다 // console.log removed
  };

  return (
    <div className="space-y-6">
      {/* QR 코드 */}
      <div className="flex justify-center">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="w-[200px] h-[200px] bg-gray-100 rounded flex items-center justify-center">
            <span className="text-gray-500 text-sm">QR Code</span>
          </div>
        </div>
      </div>

      {/* 공유 버튼들 */}
      <div className="space-y-3">
        <button className="w-full bg-[var(--color-kakao-button)] text-black py-3 rounded hover:bg-[var(--color-kakao-button)]/90 flex items-center justify-center gap-2">
          <span>k</span>
          카카오톡으로 공유
        </button>

        <button className="w-full bg-[var(--color-status-positive)] text-white py-3 rounded hover:bg-[var(--color-status-positive)]/90 flex items-center justify-center gap-2">
          <span>📱</span>
          카카오스토리로 공유
        </button>

        <button className="w-full bg-[#1877f2] text-white py-3 rounded hover:bg-[#1877f2]/90 flex items-center justify-center gap-2">
          <span>f</span>
          페이스북으로 공유
        </button>

        <button
          onClick={handleCopyLink}
          className="w-full bg-secondary text-secondary-foreground py-3 rounded hover:bg-secondary/90 flex items-center justify-center gap-2"
        >
          <div className="w-4 h-4 bg-gray-600 rounded flex items-center justify-center">
            <span className="text-white text-xs">↻</span>
          </div>
          링크 복사
        </button>

        <button
          onClick={handleClose}
          className="w-full bg-destructive text-destructive-foreground py-3 rounded hover:bg-destructive/90 flex items-center justify-center gap-2"
        >
          <span>✕</span>
          닫기
        </button>
      </div>
    </div>
  );
};

const meta: Meta<typeof MockProfileShareContent> = {
  title: 'Profile/ProfileShareContent',
  component: MockProfileShareContent,
  parameters: {
    layout: 'padded',
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
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    profile: {
      userId: '12345',
      nickname: '우주탐험가',
      profileImageUrl: '',
      followerCount: 100,
      followingCount: 50,
    },
  },
};

export const WithProfileImage: Story = {
  args: {
    profile: {
      userId: '67890',
      nickname: '프로필이미지',
      profileImageUrl: 'https://via.placeholder.com/64x64/4F46E5/FFFFFF?text=IMG',
      followerCount: 250,
      followingCount: 100,
    },
  },
};

export const HighFollowers: Story = {
  args: {
    profile: {
      userId: '11111',
      nickname: '인기유저',
      profileImageUrl: '',
      followerCount: 1000,
      followingCount: 200,
    },
  },
};
