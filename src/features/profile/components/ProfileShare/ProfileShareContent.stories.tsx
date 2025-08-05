import type { Meta, StoryObj } from '@storybook/react';

import type { ProfileUser } from '@/backend/types/profile';
import { Icon } from '@/shared';

// 스토리북용 확장된 프로필 타입
interface MockProfileUser extends ProfileUser {
  honorific: string;
  level: number;
  totalZet: number;
  totalTradeCount: number;
  createdAt: string;
}

const createMockProfile = (overrides?: Partial<MockProfileUser>): MockProfileUser => ({
  userId: 12345,
  nickname: '우주탐험가',
  profileImageUrl: undefined,
  followerCount: 10,
  followingCount: 5,
  tradePostsRes: [],
  honorific: '초보 탐험가',
  level: 1,
  totalZet: 15000,
  totalTradeCount: 25,
  createdAt: '2024-01-15T10:30:00Z',
  ...overrides,
});

// Mock ProfileShareContent for Storybook
const MockProfileShareContent = ({
  profile = createMockProfile(),
}: {
  profile?: MockProfileUser;
}) => {
  const profileUrl = `https://ufo-fi.com/profile/${profile.userId}`;

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(profileUrl)
      .then(() => {
        // 링크가 복사되었습니다
      })
      .catch((err) => {
        console.error('링크 복사 실패:', err);
      });
  };

  const handleClose = () => {
    // 모달이 닫힙니다
  };

  return (
    <div className="w-full bg-gray-900 p-4">
      <div className="max-w-md mx-auto">
        <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
          <h2 className="text-white text-base font-semibold mb-4">프로필 공유</h2>

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
                <Icon name="Share" className="size-4" />
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
                <Icon name="Copy" className="size-4" />
                링크 복사
              </button>

              <button
                onClick={handleClose}
                className="w-full bg-destructive text-destructive-foreground py-3 rounded hover:bg-destructive/90 flex items-center justify-center gap-2"
              >
                <Icon name="X" className="size-4" />
                닫기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const meta: Meta<typeof MockProfileShareContent> = {
  title: 'Profile/ProfileShareContent',
  component: MockProfileShareContent,
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
type Story = StoryObj<typeof MockProfileShareContent>;

export const Default: Story = {
  args: {
    profile: createMockProfile(),
  },
};

export const WithProfileImage: Story = {
  args: {
    profile: createMockProfile({
      profileImageUrl: 'https://example.com/profile.jpg',
    }),
  },
};

export const HighLevelUser: Story = {
  args: {
    profile: createMockProfile({
      nickname: '우주마스터',
      honorific: '전설의 탐험가',
      level: 10,
      totalZet: 500000,
      totalTradeCount: 150,
    }),
  },
};

export const NewUser: Story = {
  args: {
    profile: createMockProfile({
      nickname: '새로운탐험가',
      honorific: '초보 탐험가',
      level: 1,
      totalZet: 1000,
      totalTradeCount: 0,
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
