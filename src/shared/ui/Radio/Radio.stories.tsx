import type { Meta, StoryObj } from '@storybook/nextjs';
import * as React from 'react';

import { RadioGroup } from './RadioGroup';

const meta: Meta<typeof RadioGroup> = {
  title: 'UI/Radio',
  component: RadioGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Radix 기반의 기본 RadioGroup 컴포넌트입니다. 문자열 배열만 넘기면 자동으로 렌더링됩니다.',
      },
    },
  },
  argTypes: {
    options: {
      control: 'object',
      description: '라디오 버튼 옵션들',
    },
    defaultValue: {
      control: 'text',
      description: '기본 선택값',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'vertical', 'horizontal'],
      description: '라디오 그룹 레이아웃',
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'compact', 'large'],
      description: '라디오 그룹 크기',
    },
    color: {
      control: { type: 'select' },
      options: ['white', 'black', 'blue', 'green', 'red', 'yellow'],
      description: '라디오 버튼 색상',
    },
    className: {
      control: 'text',
      description: '추가 CSS 클래스',
    },
  },
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

// 인터랙티브 컴포넌트
const InteractiveRadioGroup = (args: React.ComponentProps<typeof RadioGroup>) => {
  const [value, setValue] = React.useState('option 1');

  return (
    <div className="p-6 bg-white rounded-lg border">
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          선택된 값: <span className="font-medium text-blue-600">{value}</span>
        </p>
      </div>
      <RadioGroup {...args} value={value} onValueChange={setValue} />
    </div>
  );
};

// 기본 라디오 그룹 (흰색 배경)
export const Default: Story = {
  render: (args) => (
    <div className="p-6 bg-white rounded-lg border">
      <RadioGroup {...args} />
    </div>
  ),
  args: {
    options: ['Option 1', 'Option 2', 'Option 3'],
    defaultValue: 'option 1',
    color: 'default',
    variant: 'default',
    size: 'default',
  },
  parameters: {
    docs: {
      description: {
        story: '기본 라디오 그룹입니다. 흰색 배경에서 검은색 라디오 버튼을 사용합니다.',
      },
    },
  },
};

// 다크 테마 라디오 그룹
export const DarkTheme: Story = {
  render: (args) => (
    <div className="p-6 bg-gray-900 rounded-lg">
      <RadioGroup {...args} />
    </div>
  ),
  args: {
    options: ['Dark Option 1', 'Dark Option 2', 'Dark Option 3'],
    defaultValue: 'dark option 1',
    color: 'default',
    variant: 'default',
    size: 'default',
  },
  parameters: {
    docs: {
      description: {
        story: '다크 테마 라디오 그룹입니다. 어두운 배경에서 흰색 라디오 버튼을 사용합니다.',
      },
    },
  },
};

// 수평 레이아웃
export const HorizontalLayout: Story = {
  render: (args) => (
    <div className="p-6 bg-white rounded-lg border">
      <RadioGroup {...args} />
    </div>
  ),
  args: {
    options: ['Option 1', 'Option 2', 'Option 3'],
    defaultValue: 'option 1',
    color: 'default',
    variant: 'horizontal',
    size: 'default',
  },
  parameters: {
    docs: {
      description: {
        story: '수평 레이아웃의 라디오 그룹입니다.',
      },
    },
  },
};

// 크기별 라디오 그룹
export const Sizes: Story = {
  render: (args) => (
    <div className="space-y-6">
      <div className="p-4 bg-white rounded-lg border">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Small Size</h3>
        <RadioGroup {...args} size="compact" />
      </div>

      <div className="p-4 bg-white rounded-lg border">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Default Size</h3>
        <RadioGroup {...args} size="default" />
      </div>

      <div className="p-4 bg-white rounded-lg border">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Large Size</h3>
        <RadioGroup {...args} size="large" />
      </div>
    </div>
  ),
  args: {
    options: ['Size Option 1', 'Size Option 2', 'Size Option 3'],
    defaultValue: 'size option 1',
    color: 'default',
    variant: 'default',
  },
  parameters: {
    docs: {
      description: {
        story: '다양한 크기의 라디오 그룹들을 보여줍니다.',
      },
    },
  },
};

// 컬러풀한 라디오 그룹들
export const ColorfulOptions: Story = {
  render: (args) => (
    <div className="space-y-6">
      <div className="p-4 bg-blue-100 rounded-lg">
        <h3 className="text-sm font-medium text-blue-900 mb-3">파란색 테마</h3>
        <RadioGroup {...args} color="primary" />
      </div>

      <div className="p-4 bg-green-100 rounded-lg">
        <h3 className="text-sm font-medium text-green-900 mb-3">초록색 테마</h3>
        <RadioGroup {...args} color="success" />
      </div>

      <div className="p-4 bg-red-100 rounded-lg">
        <h3 className="text-sm font-medium text-red-900 mb-3">빨간색 테마</h3>
        <RadioGroup {...args} color="error" />
      </div>

      <div className="p-4 bg-yellow-100 rounded-lg">
        <h3 className="text-sm font-medium text-yellow-900 mb-3">노란색 테마</h3>
        <RadioGroup {...args} color="warning" />
      </div>
    </div>
  ),
  args: {
    options: ['Color Option 1', 'Color Option 2', 'Color Option 3'],
    defaultValue: 'color option 1',
    variant: 'default',
    size: 'default',
  },
  parameters: {
    docs: {
      description: {
        story: '다양한 색상의 라디오 버튼들을 보여줍니다.',
      },
    },
  },
};

// 긴 옵션 텍스트
export const LongOptions: Story = {
  render: (args) => (
    <div className="p-6 bg-white rounded-lg border max-w-md">
      <RadioGroup {...args} />
    </div>
  ),
  args: {
    options: [
      '매우 긴 옵션 텍스트입니다. 이것은 라디오 버튼이 긴 텍스트를 어떻게 처리하는지 보여줍니다.',
      '또 다른 긴 옵션 텍스트입니다. 여러 줄에 걸쳐 표시될 수 있습니다.',
      '세 번째 긴 옵션입니다.',
    ],
    defaultValue:
      '매우 긴 옵션 텍스트입니다. 이것은 라디오 버튼이 긴 텍스트를 어떻게 처리하는지 보여줍니다.',
    color: 'default',
    variant: 'default',
    size: 'default',
  },
  parameters: {
    docs: {
      description: {
        story: '긴 텍스트 옵션을 가진 라디오 그룹입니다.',
      },
    },
  },
};

// 많은 옵션들
export const ManyOptions: Story = {
  render: (args) => (
    <div className="p-6 bg-white rounded-lg border max-h-64 overflow-y-auto">
      <RadioGroup {...args} />
    </div>
  ),
  args: {
    options: [
      'Option 1',
      'Option 2',
      'Option 3',
      'Option 4',
      'Option 5',
      'Option 6',
      'Option 7',
      'Option 8',
      'Option 9',
      'Option 10',
    ],
    defaultValue: 'option 1',
    color: 'default',
    variant: 'default',
    size: 'default',
  },
  parameters: {
    docs: {
      description: {
        story: '많은 옵션을 가진 라디오 그룹입니다. 스크롤이 가능합니다.',
      },
    },
  },
};

// 인터랙티브 예시
export const Interactive: Story = {
  render: (args) => <InteractiveRadioGroup {...args} />,
  args: {
    options: ['Interactive Option 1', 'Interactive Option 2', 'Interactive Option 3'],
    color: 'default',
    variant: 'default',
    size: 'default',
  },
  parameters: {
    docs: {
      description: {
        story: '상태가 변경되는 인터랙티브한 라디오 그룹입니다.',
      },
    },
  },
};
