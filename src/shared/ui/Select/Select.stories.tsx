import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectSeparator,
} from './index';

const meta: Meta<typeof Select> = {
  title: 'UI/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Radix 기반 Select 컴포넌트입니다. cva를 사용하여 스타일을 모듈화하였습니다.',
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'default'],
      description: 'Select의 크기',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 상태',
    },
    className: {
      control: 'text',
      description: '추가 CSS 클래스',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

// 기본 Select (흰색 배경)
export const Default: Story = {
  render: (args) => (
    <div className="p-6 bg-white rounded-lg border">
      <Select {...args}>
        <SelectTrigger size={args.size}>
          <SelectValue placeholder="통신사를 선택하세요" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="skt">SKT</SelectItem>
          <SelectItem value="lguplus">LG U+</SelectItem>
          <SelectItem value="kt">KT</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
  args: {
    size: 'default',
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: '기본 Select 컴포넌트입니다. 흰색 배경에서 사용합니다.',
      },
    },
  },
};

// 다크 테마 Select
export const DarkTheme: Story = {
  render: (args) => (
    <div className="p-6 bg-gray-900 rounded-lg">
      <Select {...args}>
        <SelectTrigger size={args.size}>
          <SelectValue placeholder="다크 테마에서 선택하세요" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">다크 옵션 1</SelectItem>
          <SelectItem value="option2">다크 옵션 2</SelectItem>
          <SelectItem value="option3">다크 옵션 3</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
  args: {
    size: 'default',
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: '다크 테마 Select 컴포넌트입니다.',
      },
    },
  },
};

// 크기별 Select
export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="p-4 bg-white rounded-lg border">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Small Size</h3>
        <Select>
          <SelectTrigger size="sm">
            <SelectValue placeholder="작은 크기" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="small1">작은 옵션 1</SelectItem>
            <SelectItem value="small2">작은 옵션 2</SelectItem>
            <SelectItem value="small3">작은 옵션 3</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="p-4 bg-white rounded-lg border">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Default Size</h3>
        <Select>
          <SelectTrigger size="default">
            <SelectValue placeholder="기본 크기" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default1">기본 옵션 1</SelectItem>
            <SelectItem value="default2">기본 옵션 2</SelectItem>
            <SelectItem value="default3">기본 옵션 3</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '다양한 크기의 Select 컴포넌트들을 보여줍니다.',
      },
    },
  },
};

// 그룹과 라벨이 있는 Select
export const WithGroupsAndLabels: Story = {
  render: (args) => (
    <div className="p-6 bg-white rounded-lg border">
      <Select {...args}>
        <SelectTrigger size={args.size}>
          <SelectValue placeholder="카테고리를 선택하세요" />
        </SelectTrigger>
        <SelectContent>
          <SelectLabel>음식</SelectLabel>
          <SelectItem value="korean">한식</SelectItem>
          <SelectItem value="chinese">중식</SelectItem>
          <SelectItem value="japanese">일식</SelectItem>
          <SelectSeparator />
          <SelectLabel>음료</SelectLabel>
          <SelectItem value="coffee">커피</SelectItem>
          <SelectItem value="tea">차</SelectItem>
          <SelectItem value="juice">주스</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
  args: {
    size: 'default',
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: '그룹과 라벨이 포함된 Select 컴포넌트입니다.',
      },
    },
  },
};

// 많은 옵션을 가진 Select
export const ManyOptions: Story = {
  render: (args) => (
    <div className="p-6 bg-white rounded-lg border">
      <Select {...args}>
        <SelectTrigger size={args.size}>
          <SelectValue placeholder="많은 옵션 중 선택하세요" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">옵션 1</SelectItem>
          <SelectItem value="option2">옵션 2</SelectItem>
          <SelectItem value="option3">옵션 3</SelectItem>
          <SelectItem value="option4">옵션 4</SelectItem>
          <SelectItem value="option5">옵션 5</SelectItem>
          <SelectItem value="option6">옵션 6</SelectItem>
          <SelectItem value="option7">옵션 7</SelectItem>
          <SelectItem value="option8">옵션 8</SelectItem>
          <SelectItem value="option9">옵션 9</SelectItem>
          <SelectItem value="option10">옵션 10</SelectItem>
          <SelectItem value="option11">옵션 11</SelectItem>
          <SelectItem value="option12">옵션 12</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
  args: {
    size: 'default',
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: '많은 옵션을 가진 Select 컴포넌트입니다. 스크롤이 가능합니다.',
      },
    },
  },
};

// 비활성화된 Select
export const Disabled: Story = {
  render: (args) => (
    <div className="p-6 bg-white rounded-lg border">
      <Select {...args} disabled>
        <SelectTrigger size={args.size} disabled>
          <SelectValue placeholder="비활성화된 Select" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="disabled1">비활성화 옵션 1</SelectItem>
          <SelectItem value="disabled2">비활성화 옵션 2</SelectItem>
          <SelectItem value="disabled3">비활성화 옵션 3</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
  args: {
    size: 'default',
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: '비활성화된 Select 컴포넌트입니다.',
      },
    },
  },
};

// 인터랙티브 예시
const InteractiveSelect = (args: React.ComponentProps<typeof Select>) => {
  const [value, setValue] = React.useState('');

  return (
    <div className="p-6 bg-white rounded-lg border">
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          선택된 값: <span className="font-medium text-blue-600">{value || '선택되지 않음'}</span>
        </p>
      </div>
      <Select {...args} value={value} onValueChange={setValue}>
        <SelectTrigger size={args.size}>
          <SelectValue placeholder="인터랙티브하게 선택하세요" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="interactive1">인터랙티브 옵션 1</SelectItem>
          <SelectItem value="interactive2">인터랙티브 옵션 2</SelectItem>
          <SelectItem value="interactive3">인터랙티브 옵션 3</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export const Interactive: Story = {
  render: (args) => <InteractiveSelect {...args} />,
  args: {
    size: 'default',
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: '상태가 변경되는 인터랙티브한 Select 컴포넌트입니다.',
      },
    },
  },
};

// 컬러풀한 배경들
export const ColorfulBackgrounds: Story = {
  render: (args) => (
    <div className="space-y-6">
      <div className="p-4 bg-blue-100 rounded-lg">
        <h3 className="text-sm font-medium text-blue-900 mb-3">파란색 배경</h3>
        <Select {...args}>
          <SelectTrigger size={args.size}>
            <SelectValue placeholder="파란색 배경에서 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="blue1">파란색 옵션 1</SelectItem>
            <SelectItem value="blue2">파란색 옵션 2</SelectItem>
            <SelectItem value="blue3">파란색 옵션 3</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="p-4 bg-green-100 rounded-lg">
        <h3 className="text-sm font-medium text-green-900 mb-3">초록색 배경</h3>
        <Select {...args}>
          <SelectTrigger size={args.size}>
            <SelectValue placeholder="초록색 배경에서 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="green1">초록색 옵션 1</SelectItem>
            <SelectItem value="green2">초록색 옵션 2</SelectItem>
            <SelectItem value="green3">초록색 옵션 3</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="p-4 bg-red-100 rounded-lg">
        <h3 className="text-sm font-medium text-red-900 mb-3">빨간색 배경</h3>
        <Select {...args}>
          <SelectTrigger size={args.size}>
            <SelectValue placeholder="빨간색 배경에서 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="red1">빨간색 옵션 1</SelectItem>
            <SelectItem value="red2">빨간색 옵션 2</SelectItem>
            <SelectItem value="red3">빨간색 옵션 3</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  ),
  args: {
    size: 'default',
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: '다양한 배경색에서 Select 컴포넌트의 모습을 보여줍니다.',
      },
    },
  },
};
