import type { Meta, StoryObj } from '@storybook/react';

// Mock AchievementBadge for Storybook
const MockAchievementBadge = ({
  className = '',
  i = 1,
  j = 1,
  isAchieve = true,
  achievementName = '업적 이름',
  showName = true,
  onClick,
}: {
  className?: string;
  i?: number;
  j?: number;
  isAchieve?: boolean;
  achievementName?: string;
  showName?: boolean;
  onClick?: () => void;
}) => {
  const getBadgeEmoji = (level: number, index: number) => {
    const emojis = ['🥉', '🥈', '🥇', '🏆', '👑', '💎', '⭐', '🌟'];
    const emojiIndex = ((level - 1) * 3 + index - 1) % emojis.length;
    return emojis[emojiIndex];
  };

  return (
    <div onClick={onClick} className={`${className} flex flex-col mb-5 cursor-pointer`}>
      <div className="relative w-[70px] h-[70px] border-2 border-gray-400 rounded-[14px] object-cover overflow-hidden bg-gray-200">
        <div
          className={`w-full h-full flex items-center justify-center text-4xl ${
            !isAchieve ? 'blur-sm' : ''
          }`}
        >
          {getBadgeEmoji(i, j)}
        </div>
        {!isAchieve && (
          <div className="w-[70px] h-[70px] flex justify-center items-center absolute inset-0">
            <div className="w-[35px] h-[35px] bg-gray-600 rounded-full flex items-center justify-center text-white text-lg">
              🔒
            </div>
          </div>
        )}
      </div>
      {showName && <p className="text-center pt-2 text-sm text-gray-700">{achievementName}</p>}
    </div>
  );
};

const meta: Meta<typeof MockAchievementBadge> = {
  title: 'Mypage/AchievementBadge',
  component: MockAchievementBadge,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'badge clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    i: 1,
    j: 1,
    isAchieve: true,
    achievementName: '첫 번째 업적',
    showName: true,
  },
};

export const Locked: Story = {
  args: {
    i: 1,
    j: 2,
    isAchieve: false,
    achievementName: '잠긴 업적',
    showName: true,
  },
};

export const WithoutName: Story = {
  args: {
    i: 2,
    j: 1,
    isAchieve: true,
    showName: false,
  },
};

export const HighLevel: Story = {
  args: {
    i: 3,
    j: 3,
    isAchieve: true,
    achievementName: '고급 업적',
    showName: true,
  },
};

export const LongName: Story = {
  args: {
    i: 1,
    j: 3,
    isAchieve: true,
    achievementName: '매우 긴 업적 이름입니다',
    showName: true,
  },
};

export const MultipleBadges: Story = {
  render: () => (
    <div className="flex gap-4">
      <MockAchievementBadge i={1} j={1} isAchieve={true} achievementName="업적 1" />
      <MockAchievementBadge i={1} j={2} isAchieve={false} achievementName="업적 2" />
      <MockAchievementBadge i={1} j={3} isAchieve={true} achievementName="업적 3" />
      <MockAchievementBadge i={2} j={1} isAchieve={true} achievementName="업적 4" />
    </div>
  ),
};
