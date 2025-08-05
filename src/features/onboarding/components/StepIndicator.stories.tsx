import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Indicator } from '@/shared';

// Mock StepIndicator Props Interface
interface MockStepIndicatorProps {
  step?: number;
  total?: number;
  className?: string;
  showHover?: boolean;
  size?: 'sm' | 'md' | 'lg';
  spacing?: 'tight' | 'normal' | 'wide';
}

// Mock StepIndicator for Storybook
const MockStepIndicator = ({
  step = 0,
  total = 5,
  className = '',
  showHover = true,
  size = 'md',
  spacing = 'normal',
}: MockStepIndicatorProps) => {
  const [currentStep, setCurrentStep] = useState(step);

  const handleClick = (clickedStep: number) => {
    setCurrentStep(clickedStep - 1); // Indicator는 1-based이므로 변환
    // 단계 ${clickedStep}로 이동
  };

  return (
    <div className="w-full bg-gray-900 p-4">
      <div className="max-w-md mx-auto">
        <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
          <h2 className="text-white text-base font-semibold mb-4">단계 인디케이터</h2>

          <div className={`flex justify-center py-2 ${className}`}>
            <Indicator
              step={currentStep + 1} // Indicator는 1-based
              totalSteps={total}
              onStepClick={handleClick}
              size={size}
              spacing={spacing}
              showHover={showHover}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const meta: Meta<typeof MockStepIndicator> = {
  title: 'Onboarding/StepIndicator',
  component: MockStepIndicator,
  parameters: {
    layout: 'padded',
    viewport: {
      defaultViewport: 'mobile1',
    },
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
type Story = StoryObj<typeof MockStepIndicator>;

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

export const Desktop: Story = {
  args: {
    step: 2,
    total: 5,
    showHover: true,
    size: 'md',
    spacing: 'normal',
  },
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};
