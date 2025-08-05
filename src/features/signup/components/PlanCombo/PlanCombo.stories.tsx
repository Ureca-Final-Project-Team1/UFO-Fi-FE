import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { PlanCombo } from './PlanCombo';

// Mock PlanCombo for Storybook
const MockPlanCombo = ({
  planNames = ['5G 시그니처', '5G 라이트+', 'LTE 스페셜', '5G 프리미엄', 'LTE 베이직'],
  disabled = false,
  initialValue = '',
}: {
  planNames?: string[];
  disabled?: boolean;
  initialValue?: string;
}) => {
  const [selectedValue, setSelectedValue] = useState(initialValue);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    console.log('선택한 요금제:', value);
  };

  return (
    <div className="w-full bg-gray-900 p-4">
      <div className="max-w-md mx-auto">
        <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
          <h2 className="text-white text-base font-semibold mb-4">요금제 선택 컴포넌트</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-white text-sm font-medium mb-2">요금제 선택</label>
              <PlanCombo
                planNames={planNames}
                onSelect={handleSelect}
                value={selectedValue}
                disabled={disabled}
              />
            </div>

            {selectedValue && (
              <div className="p-3 bg-blue-500/20 border border-blue-500/30 rounded-lg">
                <p className="text-blue-300 text-sm">
                  <strong>선택된 요금제:</strong> {selectedValue}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const meta: Meta<typeof MockPlanCombo> = {
  title: 'Signup/PlanCombo',
  component: MockPlanCombo,
  parameters: {
    layout: 'padded',
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    planNames: {
      control: { type: 'object' },
      description: '요금제 목록',
    },
    disabled: {
      control: { type: 'boolean' },
      description: '비활성화 상태',
    },
    initialValue: {
      control: { type: 'text' },
      description: '초기 선택값',
    },
  },
};

export default meta;
type Story = StoryObj<typeof MockPlanCombo>;

export const Default: Story = {
  args: {
    planNames: ['5G 시그니처', '5G 라이트+', 'LTE 스페셜', '5G 프리미엄', 'LTE 베이직'],
    disabled: false,
    initialValue: '',
  },
};

export const WithSelectedValue: Story = {
  args: {
    planNames: ['5G 시그니처', '5G 라이트+', 'LTE 스페셜', '5G 프리미엄', 'LTE 베이직'],
    disabled: false,
    initialValue: '5G 라이트+',
  },
};

export const Disabled: Story = {
  args: {
    planNames: ['5G 시그니처', '5G 라이트+', 'LTE 스페셜'],
    disabled: true,
    initialValue: '',
  },
};

export const EmptyPlanList: Story = {
  args: {
    planNames: [],
    disabled: false,
    initialValue: '',
  },
};

export const ManyPlans: Story = {
  args: {
    planNames: [
      '5G 시그니처',
      '5G 라이트+',
      'LTE 스페셜',
      '5G 프리미엄',
      'LTE 베이직',
      '5G 울트라',
      'LTE 플러스',
      '5G 스탠다드',
    ],
    disabled: false,
    initialValue: '',
  },
};

export const Desktop: Story = {
  args: {
    planNames: ['5G 시그니처', '5G 라이트+', 'LTE 스페셜', '5G 프리미엄', 'LTE 베이직'],
    disabled: false,
    initialValue: '',
  },
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};
