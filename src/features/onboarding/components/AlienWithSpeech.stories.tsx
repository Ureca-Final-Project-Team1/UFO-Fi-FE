import type { Meta, StoryObj } from '@storybook/react';

// Mock AlienWithSpeech for Storybook
const MockAlienWithSpeech = ({
  message = '안녕하세요! UFO-Fi에 오신 것을 환영합니다! 👽',
  tailDirection = 'right',
  size = 'md',
  className = '',
}: {
  message?: string;
  tailDirection?: 'left' | 'right';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}) => {
  const getSizeClasses = (size: string) => {
    switch (size) {
      case 'sm':
        return 'max-w-xs text-xs';
      case 'lg':
        return 'max-w-md text-base';
      default:
        return 'max-w-sm text-sm';
    }
  };

  const getTailClasses = (direction: string) => {
    return direction === 'left' ? 'ml-2' : 'mr-2';
  };

  return (
    <div
      className={`w-full h-full flex justify-between items-center gap-6 relative px-4 z-40 ${className}`}
    >
      {/* 말풍선 */}
      <div className="flex-1 flex justify-end">
        <div
          className={`bg-white rounded-lg p-3 shadow-lg ${getSizeClasses(size)} ${getTailClasses(tailDirection)}`}
        >
          <div className="relative">
            <p className="text-gray-800">{message}</p>
            {/* 말풍선 꼬리 */}
            <div
              className={`absolute top-1/2 transform -translate-y-1/2 ${
                tailDirection === 'left'
                  ? '-left-2 border-r-8 border-r-white'
                  : '-right-2 border-l-8 border-l-white'
              } border-t-4 border-t-transparent border-b-4 border-b-transparent`}
            />
          </div>
        </div>
      </div>

      {/* 외계인 캐릭터 */}
      <div className="flex-1 flex justify-center">
        <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-4xl shadow-2xl animate-bounce">
          👽
        </div>
      </div>
    </div>
  );
};

const meta: Meta<typeof MockAlienWithSpeech> = {
  title: 'Onboarding/AlienWithSpeech',
  component: MockAlienWithSpeech,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    message: {
      control: { type: 'text' },
      description: '말풍선 메시지',
    },
    tailDirection: {
      control: { type: 'select' },
      options: ['left', 'right'],
      description: '말풍선 꼬리 방향',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: '말풍선 크기',
    },
    className: {
      control: { type: 'text' },
      description: '추가 CSS 클래스',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    message: '안녕하세요! UFO-Fi에 오신 것을 환영합니다! 👽',
    tailDirection: 'right',
    size: 'md',
  },
};

export const LeftTail: Story = {
  args: {
    message: '왼쪽 꼬리 말풍선입니다!',
    tailDirection: 'left',
    size: 'md',
  },
};

export const SmallSize: Story = {
  args: {
    message: '작은 말풍선입니다.',
    tailDirection: 'right',
    size: 'sm',
  },
};

export const LargeSize: Story = {
  args: {
    message: '큰 말풍선입니다. 더 많은 텍스트를 표시할 수 있어요!',
    tailDirection: 'right',
    size: 'lg',
  },
};

export const LongMessage: Story = {
  args: {
    message:
      '이것은 매우 긴 메시지입니다. 말풍선이 어떻게 반응하는지 확인해보세요. UFO-Fi는 정말 멋진 서비스입니다!',
    tailDirection: 'right',
    size: 'md',
  },
};

export const WelcomeMessage: Story = {
  args: {
    message: '우주 여행을 시작할 준비가 되셨나요? 🚀',
    tailDirection: 'left',
    size: 'lg',
  },
};
