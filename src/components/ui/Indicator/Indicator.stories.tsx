import type { Meta, StoryObj } from '@storybook/nextjs';
import React, { useState } from 'react';

import { Indicator } from './Indicator';

const meta: Meta<typeof Indicator> = {
  title: 'UI/Indicator',
  component: Indicator,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '진행 단계(step)을 나타내기 위한 용도로 사용하는 원형 프로그래스 섹션입니다.',
      },
    },
  },
  argTypes: {
    step: {
      control: { type: 'number', min: 1 },
      description: '현재 단계 (1부터 시작)',
    },
    totalSteps: {
      control: { type: 'number', min: 1 },
      description: '전체 단계 수',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: '점의 크기',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: '배치 방향',
    },
    spacing: {
      control: 'select',
      options: ['tight', 'normal', 'wide'],
      description: '점 사이의 간격',
    },
    showHover: {
      control: 'boolean',
      description: '호버 효과 표시 여부',
    },
    onStepClick: {
      action: 'step clicked',
      description: '단계 클릭 시 실행될 함수',
    },
  },
  decorators: [
    (Story) => (
      <div className="p-8 bg-gray-50 rounded-lg">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Indicator>;

// Interactive Demo
const InteractiveDemo = () => {
  const [currentStep, setCurrentStep] = useState(2);
  const totalSteps = 5;

  return (
    <div className="space-y-8 text-center">
      <div>
        <h2 className="text-xl font-bold mb-2">Indicator</h2>
        <p className="text-gray-600 mb-4">
          진행 단계(step)을 나타내기 위한 용도로
          <br />
          사용하는 원형 프로그래스 섹션입니다.
        </p>

        <div className="flex gap-2 justify-center mb-6">
          <button
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            disabled={currentStep === 1}
          >
            이전
          </button>
          <span className="px-3 py-1 bg-primary-500 text-white rounded">
            {currentStep} / {totalSteps}
          </span>
          <button
            onClick={() => setCurrentStep(Math.min(totalSteps, currentStep + 1))}
            className="px-3 py-1 bg-primary-500 text-white rounded hover:bg-primary-600 disabled:opacity-50"
            disabled={currentStep === totalSteps}
          >
            다음
          </button>
        </div>
      </div>

      <Indicator step={currentStep} totalSteps={totalSteps} onStepClick={setCurrentStep} />
    </div>
  );
};

export const Default: Story = {
  args: {
    step: 2,
    totalSteps: 5,
    size: 'md',
    orientation: 'horizontal',
    spacing: 'normal',
    showHover: true,
  },
};

export const Interactive: Story = {
  render: () => <InteractiveDemo />,
  parameters: {
    docs: {
      description: {
        story: '인터랙티브하게 단계를 변경해볼 수 있는 예시입니다.',
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-sm font-medium mb-2">Small</h3>
        <Indicator step={2} totalSteps={5} size="sm" />
      </div>
      <div className="text-center">
        <h3 className="text-sm font-medium mb-2">Medium</h3>
        <Indicator step={2} totalSteps={5} size="md" />
      </div>
      <div className="text-center">
        <h3 className="text-sm font-medium mb-2">Large</h3>
        <Indicator step={2} totalSteps={5} size="lg" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '다양한 크기의 Indicator를 보여줍니다.',
      },
    },
  },
};

export const Orientations: Story = {
  render: () => (
    <div className="flex gap-8 items-center justify-center">
      <div className="text-center">
        <h3 className="text-sm font-medium mb-4">Horizontal</h3>
        <Indicator step={2} totalSteps={5} orientation="horizontal" />
      </div>
      <div className="text-center">
        <h3 className="text-sm font-medium mb-4">Vertical</h3>
        <Indicator step={2} totalSteps={5} orientation="vertical" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '가로/세로 방향의 Indicator를 보여줍니다.',
      },
    },
  },
};
