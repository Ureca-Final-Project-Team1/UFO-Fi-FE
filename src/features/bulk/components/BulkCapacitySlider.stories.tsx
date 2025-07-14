import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { BulkCapacitySlider } from './BulkCapacitySlider';

const InteractiveWrapper = ({
  initialValue,

  children,
}: {
  initialValue: number[];
  maxCapacity: number;
  children: (
    value: number[],
    setValue: React.Dispatch<React.SetStateAction<number[]>>,
  ) => React.ReactNode;
}) => {
  const [value, setValue] = useState(initialValue);
  return <>{children(value, setValue)}</>;
};

const meta: Meta<typeof BulkCapacitySlider> = {
  title: 'Features/Bulk/BulkCapacitySlider',
  component: BulkCapacitySlider,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '일괄구매 페이지에서 사용되는 데이터 용량 선택 슬라이더 컴포넌트입니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      description: '현재 선택된 용량값 (배열)',
      control: 'object',
    },
    setValue: {
      description: '용량값 변경 함수',
      action: 'setValue',
    },
    maxCapacity: {
      description: '최대 용량',
      control: { type: 'number', min: 1, max: 100 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof BulkCapacitySlider>;

// 기본 스토리 (Interactive)
export const Default: Story = {
  render: (args) => (
    <InteractiveWrapper initialValue={args.value} maxCapacity={args.maxCapacity}>
      {(value, setValue) => (
        <div className="w-80 p-6 bg-gray-900 rounded-lg">
          <BulkCapacitySlider {...args} value={value} setValue={setValue} />
        </div>
      )}
    </InteractiveWrapper>
  ),
  args: {
    value: [50],
    maxCapacity: 100,
  },
};

// 초기값이 0인 경우
export const InitialZero: Story = {
  render: (args) => (
    <InteractiveWrapper initialValue={args.value} maxCapacity={args.maxCapacity}>
      {(value, setValue) => (
        <div className="w-80 p-6 bg-gray-900 rounded-lg">
          <BulkCapacitySlider {...args} value={value} setValue={setValue} />
        </div>
      )}
    </InteractiveWrapper>
  ),
  args: {
    value: [0],
    maxCapacity: 100,
  },
};

// 최대값으로 설정된 경우
export const MaxValue: Story = {
  render: (args) => (
    <InteractiveWrapper initialValue={args.value} maxCapacity={args.maxCapacity}>
      {(value, setValue) => (
        <div className="w-80 p-6 bg-gray-900 rounded-lg">
          <BulkCapacitySlider {...args} value={value} setValue={setValue} />
        </div>
      )}
    </InteractiveWrapper>
  ),
  args: {
    value: [100],
    maxCapacity: 100,
  },
};
