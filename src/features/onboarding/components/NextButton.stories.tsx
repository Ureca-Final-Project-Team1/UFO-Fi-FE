import type { Meta, StoryObj } from '@storybook/react';

// Mock NextButton for Storybook
const MockNextButton = ({
  isLast = false,
  className = '',
}: {
  isLast?: boolean;
  className?: string;
}) => {
  const handleClick = () => {
    // isLast ? '시작하기 클릭됨' : '다음 클릭됨'
  };

  const buttonAnimation = isLast ? '' : 'animate-pulse';

  return (
    <div className="flex justify-center">
      <button
        onClick={handleClick}
        className={`transition-all duration-300 transform hover:scale-110 active:scale-95 ${buttonAnimation} ${className}`}
        aria-label={isLast ? '시작하기' : '다음'}
      >
        <div className="w-64 h-12 rounded-lg flex items-center justify-center text-white font-semibold text-lg drop-shadow-lg">
          {isLast ? (
            <div className="bg-gradient-to-r from-orange-500 to-red-500 w-full h-full rounded-lg flex items-center justify-center">
              🔥 시작하기
            </div>
          ) : (
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-full h-full rounded-lg flex items-center justify-center">
              ➡️ 다음
            </div>
          )}
        </div>
      </button>
    </div>
  );
};

const meta: Meta<typeof MockNextButton> = {
  title: 'Onboarding/NextButton',
  component: MockNextButton,
  parameters: {
    layout: 'padded',
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
type Story = StoryObj<typeof meta>;

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
