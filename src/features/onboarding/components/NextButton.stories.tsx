import type { Meta, StoryObj } from '@storybook/react';
import Image from 'next/image';

import { IMAGE_PATHS } from '@/constants/images';

// Mock NextButton Props Interface
interface MockNextButtonProps {
  isLast?: boolean;
  className?: string;
}

// Mock NextButton for Storybook
const MockNextButton = ({ isLast = false, className = '' }: MockNextButtonProps) => {
  const handleClick = () => {
    // isLast ? '시작하기 클릭됨' : '다음 클릭됨'
  };

  const imageSrc = isLast ? IMAGE_PATHS.FIRE_BTN_ONBOARDING : IMAGE_PATHS.NEXT_BTN_ONBOARDING;
  const altText = isLast ? '시작하기' : '다음';
  const buttonAnimation = isLast ? '' : 'animate-pulse';

  return (
    <div className="w-full bg-gray-900 p-4">
      <div className="max-w-md mx-auto">
        <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
          <h2 className="text-white text-base font-semibold mb-4">다음 버튼</h2>

          <div className="flex justify-center">
            <button
              onClick={handleClick}
              className={`transition-all duration-300 transform hover:scale-110 active:scale-95 ${buttonAnimation} ${className}`}
              aria-label={altText}
            >
              <Image
                src={imageSrc}
                alt={altText}
                width={140}
                height={30}
                className="w-64 h-auto drop-shadow-lg"
                priority
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const meta: Meta<typeof MockNextButton> = {
  title: 'Onboarding/NextButton',
  component: MockNextButton,
  parameters: {
    layout: 'padded',
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isLast: {
      control: { type: 'boolean' },
      description: '마지막 단계 여부',
    },
    className: {
      control: { type: 'text' },
      description: '추가 CSS 클래스',
    },
  },
};

export default meta;
type Story = StoryObj<typeof MockNextButton>;

export const Next: Story = {
  args: {
    isLast: false,
  },
};

export const Start: Story = {
  args: {
    isLast: true,
  },
};

export const WithCustomClass: Story = {
  args: {
    isLast: false,
    className: 'mt-8',
  },
};

export const StartWithCustomClass: Story = {
  args: {
    isLast: true,
    className: 'mt-8',
  },
};

export const Desktop: Story = {
  args: {
    isLast: false,
  },
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};
