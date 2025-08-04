import type { Meta, StoryObj } from '@storybook/react';
import Image from 'next/image';

import { IMAGE_PATHS } from '@/constants/images';
import { SpeechBubble } from '@/shared';

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
  return (
    <div className="w-full bg-gray-900 p-4">
      <div className="max-w-md mx-auto">
        <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
          <h2 className="text-white text-base font-semibold mb-4">외계인과 말풍선</h2>

          <div
            className={`w-full h-full flex justify-between items-center gap-6 relative px-4 z-40 ${className}`}
          >
            {/* 말풍선 */}
            <div className="flex-1 flex justify-end">
              <SpeechBubble tailDirection={tailDirection} size={size} className="max-w-xs text-sm">
                {message}
              </SpeechBubble>
            </div>

            {/* 외계인 캐릭터 */}
            <div className="flex-1 flex justify-center">
              <div className="relative z-50 w-full h-full flex justify-center items-center">
                <Image
                  src={IMAGE_PATHS['AL_ONBOARDING']}
                  alt="UFO-Fi 외계인"
                  width={500}
                  height={500}
                  className="w-full h-full max-w-full max-h-full object-contain drop-shadow-2xl transition-all duration-300 animate-bounce aspect-square"
                  priority
                />
              </div>
            </div>
          </div>
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
    viewport: {
      defaultViewport: 'mobile1',
    },
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
type Story = StoryObj<typeof MockAlienWithSpeech>;

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

export const Desktop: Story = {
  args: {
    message: '안녕하세요! UFO-Fi에 오신 것을 환영합니다! 👽',
    tailDirection: 'right',
    size: 'md',
  },
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};
