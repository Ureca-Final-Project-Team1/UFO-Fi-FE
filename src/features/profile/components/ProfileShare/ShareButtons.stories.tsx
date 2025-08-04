import type { Meta, StoryObj } from '@storybook/react';

// Mock ShareButtons for Storybook
const MockShareButtons = ({
  profileUrl = 'https://ufo-fi.com/profile/12345',
}: {
  profileUrl?: string;
}) => {
  const onCopyLink = () => {
    navigator.clipboard.writeText(profileUrl);
    // 링크가 복사되었습니다: // console.log removed
  };

  const shareOptions = [
    {
      id: 'kakao',
      name: '카카오톡',
      icon: 'k',
      bgColor: 'bg-yellow-400',
      textColor: 'text-black',
    },
    {
      id: 'facebook',
      name: '페이스북',
      icon: 'f',
      bgColor: 'bg-blue-600',
      textColor: 'text-white',
    },
    {
      id: 'twitter',
      name: '트위터',
      icon: '𝕏',
      bgColor: 'bg-black',
      textColor: 'text-white',
    },
    {
      id: 'naver',
      name: '네이버',
      icon: 'N',
      bgColor: 'bg-green-600',
      textColor: 'text-white',
    },
    {
      id: 'line',
      name: '라인',
      icon: 'LINE',
      bgColor: 'bg-green-500',
      textColor: 'text-white',
    },
  ];

  const handleShare = () => {
    // 공유 기능 실행 // console.log removed
  };

  return (
    <div className="space-y-6">
      {/* 스와이퍼로 가로 스크롤 */}
      <div className="w-full">
        <div className="flex gap-4 overflow-x-auto pb-2">
          {shareOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={handleShare}
              className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-100 transition-colors min-w-[70px] flex-shrink-0"
            >
              <div
                className={`size-14 rounded-full flex items-center justify-center ${option.bgColor}`}
              >
                <span className={`${option.textColor} text-lg`}>{option.icon}</span>
              </div>
              <span className="text-xs text-gray-600 text-center leading-tight">{option.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 공유 링크 복사 버튼 */}
      <button
        onClick={onCopyLink}
        className="w-full bg-secondary text-secondary-foreground py-3 px-4 rounded hover:bg-secondary/90 flex items-center justify-center gap-2"
      >
        <div className="w-4 h-4 bg-gray-600 rounded flex items-center justify-center">
          <span className="text-white text-xs">↻</span>
        </div>
        공유 링크 복사하기
      </button>
    </div>
  );
};

const meta: Meta<typeof MockShareButtons> = {
  title: 'Profile/ShareButtons',
  component: MockShareButtons,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    profileUrl: {
      control: { type: 'text' },
      description: '프로필 URL',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    profileUrl: 'https://ufo-fi.com/profile/12345',
  },
};

export const CustomUrl: Story = {
  args: {
    profileUrl: 'https://example.com/custom-profile/11111',
  },
};
