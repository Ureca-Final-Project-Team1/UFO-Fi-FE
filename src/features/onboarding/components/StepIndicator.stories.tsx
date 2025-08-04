import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

// Mock StepIndicator for Storybook
const MockStepIndicator = ({
  step = 0,
  total = 5,
  className = '',
  showHover = true,
  size = 'md',
  spacing = 'normal',
}: {
  step?: number;
  total?: number;
  className?: string;
  showHover?: boolean;
  size?: 'sm' | 'md' | 'lg';
  spacing?: 'tight' | 'normal' | 'wide';
}) => {
  const [currentStep, setCurrentStep] = useState(step);

  const handleClick = (clickedStep: number) => {
    setCurrentStep(clickedStep);
    // 단계 ${clickedStep + 1}로 이동
  };

  const getSizeClasses = (size: string) => {
    switch (size) {
      case 'sm':
        return 'w-2 h-2';
      case 'lg':
        return 'w-4 h-4';
      default:
        return 'w-3 h-3';
    }
  };

  const getSpacingClasses = (spacing: string) => {
    switch (spacing) {
      case 'tight':
        return 'gap-1';
      case 'wide':
        return 'gap-4';
      default:
        return 'gap-2';
    }
  };

  return (
    <div className={`flex justify-center py-2 ${className}`}>
      <div className={`flex items-center ${getSpacingClasses(spacing)}`}>
        {Array.from({ length: total }, (_, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className={`
              ${getSizeClasses(size)} 
              rounded-full transition-all duration-200
              ${index === currentStep ? 'bg-blue-500 scale-110' : 'bg-gray-300 hover:bg-gray-400'}
              ${showHover && index !== currentStep ? 'hover:scale-105' : ''}
            `}
            aria-label={`단계 ${index + 1}`}
          />
        ))}
      </div>
      <div className="ml-4 text-sm text-gray-600">
        {currentStep + 1} / {total}
      </div>
    </div>
  );
};

const meta: Meta<typeof MockStepIndicator> = {
  title: 'Onboarding/StepIndicator',
  component: MockStepIndicator,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    step: {
      control: { type: 'number', min: 0, max: 10 },
      description: '현재 단계 (0부터 시작)',
    },
    total: {
      control: { type: 'number', min: 1, max: 10 },
      description: '전체 단계 수',
    },
    className: {
      control: { type: 'text' },
      description: '추가 CSS 클래스',
    },
    showHover: {
      control: { type: 'boolean' },
      description: '호버 효과 표시 여부',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: '인디케이터 크기',
    },
    spacing: {
      control: { type: 'select' },
      options: ['tight', 'normal', 'wide'],
      description: '인디케이터 간격',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    step: 0,
    total: 5,
    showHover: true,
    size: 'md',
    spacing: 'normal',
  },
};

export const Step3: Story = {
  args: {
    step: 2,
    total: 5,
    showHover: true,
    size: 'md',
    spacing: 'normal',
  },
};

export const SmallSize: Story = {
  args: {
    step: 1,
    total: 7,
    showHover: true,
    size: 'sm',
    spacing: 'normal',
  },
};

export const LargeSize: Story = {
  args: {
    step: 2,
    total: 4,
    showHover: true,
    size: 'lg',
    spacing: 'normal',
  },
};

export const TightSpacing: Story = {
  args: {
    step: 1,
    total: 6,
    showHover: true,
    size: 'md',
    spacing: 'tight',
  },
};

export const WideSpacing: Story = {
  args: {
    step: 3,
    total: 5,
    showHover: true,
    size: 'md',
    spacing: 'wide',
  },
};

export const NoHover: Story = {
  args: {
    step: 2,
    total: 5,
    showHover: false,
    size: 'md',
    spacing: 'normal',
  },
};

export const LastStep: Story = {
  args: {
    step: 4,
    total: 5,
    showHover: true,
    size: 'md',
    spacing: 'normal',
  },
};
