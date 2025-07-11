import type { Meta, StoryObj } from '@storybook/nextjs';
import React, { useState } from 'react';

import { Indicator } from './Indicator';

const meta: Meta<typeof Indicator> = {
  title: 'UI/Indicator',
  component: Indicator,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '진행 단계(step)을 나타내기 위한 용도로 사용하는 원형 프로그래스 섹션입니다. ' +
          '온보딩 등에서 현재 위치와 전체 진행률을 시각적으로 표현할 때 활용됩니다. ' +
          '각 점은 클릭 가능하도록 설정했으며, 호버 효과와 부드러운 애니메이션을 제공합니다.',
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
  parameters: {
    docs: {
      description: {
        story: '기본 설정의 Indicator입니다. 5단계 중 2단계가 진행된 상태를 보여줍니다.',
      },
    },
  },
};

export const Interactive: Story = {
  render: () => <InteractiveDemo />,
  parameters: {
    docs: {
      description: {
        story:
          '인터랙티브하게 단계를 변경해볼 수 있는 예시입니다. ' +
          '이전/다음 버튼으로 진행 상태를 변경하거나, 완료된 단계의 점을 직접 클릭하여 해당 단계로 이동할 수 있습니다. ' +
          '실제 사용 시에는 폼 검증이나 단계별 조건을 확인한 후 이동하도록 구현하는 것을 권장합니다.',
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-sm font-medium mb-2">Small (8px)</h3>
        <Indicator step={2} totalSteps={5} size="sm" />
      </div>
      <div className="text-center">
        <h3 className="text-sm font-medium mb-2">Medium (12px)</h3>
        <Indicator step={2} totalSteps={5} size="md" />
      </div>
      <div className="text-center">
        <h3 className="text-sm font-medium mb-2">Large (16px)</h3>
        <Indicator step={2} totalSteps={5} size="lg" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          '다양한 크기의 Indicator를 보여줍니다. ' +
          'Small은 모바일 하단이나 작은 공간에, Medium은 일반적인 용도로, Large는 중요한 프로세스나 강조가 필요한 곳에 사용합니다.',
      },
    },
  },
};

export const Orientations: Story = {
  render: () => (
    <div className="flex gap-8 items-center justify-center">
      <div className="text-center">
        <h3 className="text-sm font-medium mb-4">Horizontal (가로)</h3>
        <Indicator step={2} totalSteps={5} orientation="horizontal" />
      </div>
      <div className="text-center">
        <h3 className="text-sm font-medium mb-4">Vertical (세로)</h3>
        <Indicator step={2} totalSteps={5} orientation="vertical" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          '가로/세로 방향의 Indicator를 보여줍니다. ' +
          'Horizontal은 페이지 상단이나 카드 내부에서 주로 사용되며, Vertical은 사이드바나 세로로 긴 폼에서 활용됩니다.',
      },
    },
  },
};

export const Spacings: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-sm font-medium mb-2">Tight (4px 간격)</h3>
        <Indicator step={3} totalSteps={8} spacing="tight" />
      </div>
      <div className="text-center">
        <h3 className="text-sm font-medium mb-2">Normal (8px 간격)</h3>
        <Indicator step={3} totalSteps={8} spacing="normal" />
      </div>
      <div className="text-center">
        <h3 className="text-sm font-medium mb-2">Wide (12px 간격)</h3>
        <Indicator step={3} totalSteps={8} spacing="wide" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          '점 사이의 간격을 조절한 예시입니다. ' +
          '단계가 많을 때는 Tight를, 여유로운 공간이 있을 때는 Wide를 사용하여 레이아웃에 맞게 조정할 수 있습니다.',
      },
    },
  },
};
