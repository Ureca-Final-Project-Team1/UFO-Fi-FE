import type { Meta, StoryObj } from '@storybook/nextjs';
import * as React from 'react';

import { Tooltip } from './Tooltip';
import { Button } from '../Button/Button';

const meta: Meta<typeof Tooltip> = {
  title: 'UI/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '재사용 가능한 Tooltip(툴팁) 컴포넌트입니다. 다양한 위치, 트리거, 커스텀 스타일을 지원합니다.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'dark', 'minimal'],
      description: 'Tooltip의 테마 스타일',
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'sm', 'lg'],
      description: 'Tooltip의 크기',
    },
    side: {
      control: { type: 'select' },
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Tooltip의 위치',
    },
    sideOffset: {
      control: 'number',
      description: 'Tooltip과 트리거 요소 간의 거리',
    },
    className: {
      control: 'text',
      description: '추가 CSS 클래스',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

// 기본 툴팁
export const Default: Story = {
  render: (args) => (
    <Tooltip {...args} content="기본 툴팁입니다.">
      <Button>Hover me</Button>
    </Tooltip>
  ),
  args: {
    variant: 'default',
    size: 'default',
    side: 'top',
    sideOffset: 0,
  },
  parameters: {
    docs: {
      description: {
        story: '기본 Tooltip 예시입니다.',
      },
    },
  },
};

// 다크 테마 툴팁
export const Dark: Story = {
  render: (args) => (
    <div className="bg-gray-900 p-4 rounded-lg">
      <Tooltip {...args} content="다크 테마 툴팁입니다.">
        <Button>Dark Tooltip</Button>
      </Tooltip>
    </div>
  ),
  args: {
    variant: 'dark',
    size: 'default',
    side: 'top',
    sideOffset: 0,
  },
};

// 미니멀 툴팁
export const Minimal: Story = {
  render: (args) => (
    <Tooltip {...args} content="미니멀 툴팁입니다.">
      <Button>Minimal Tooltip</Button>
    </Tooltip>
  ),
  args: {
    variant: 'minimal',
    size: 'default',
    side: 'top',
    sideOffset: 0,
  },
};

// 크기별 툴팁
export const Sizes: Story = {
  render: (args) => (
    <div className="flex gap-4">
      <Tooltip {...args} content="작은 툴팁" size="sm">
        <Button>Small</Button>
      </Tooltip>
      <Tooltip {...args} content="기본 툴팁" size="default">
        <Button>Default</Button>
      </Tooltip>
      <Tooltip {...args} content="큰 툴팁" size="lg">
        <Button>Large</Button>
      </Tooltip>
    </div>
  ),
  args: {
    variant: 'default',
    side: 'top',
    sideOffset: 0,
  },
};

// 다양한 위치
export const Placement: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 24 }}>
      <Tooltip {...args} content="상단 툴팁" side="top">
        <Button>Top</Button>
      </Tooltip>
      <Tooltip {...args} content="하단 툴팁" side="bottom">
        <Button>Bottom</Button>
      </Tooltip>
      <Tooltip {...args} content="왼쪽 툴팁" side="left">
        <Button>Left</Button>
      </Tooltip>
      <Tooltip {...args} content="오른쪽 툴팁" side="right">
        <Button>Right</Button>
      </Tooltip>
    </div>
  ),
  args: {
    variant: 'default',
    size: 'default',
    sideOffset: 0,
  },
  parameters: {
    docs: {
      description: {
        story: 'Tooltip의 다양한 위치(side) 예시입니다.',
      },
    },
  },
};

// 커스텀 오프셋
export const CustomOffset: Story = {
  render: (args) => (
    <Tooltip {...args} content="16px 오프셋 적용" sideOffset={16}>
      <Button>Custom Offset</Button>
    </Tooltip>
  ),
  args: {
    variant: 'default',
    size: 'default',
    side: 'top',
    sideOffset: 16,
  },
  parameters: {
    docs: {
      description: {
        story: 'sideOffset(오프셋)이 적용된 Tooltip 예시입니다.',
      },
    },
  },
};

// 긴 텍스트 툴팁
export const LongText: Story = {
  render: (args) => (
    <Tooltip
      {...args}
      content="이것은 매우 긴 툴팁 텍스트입니다. 여러 줄에 걸쳐 표시될 수 있습니다."
    >
      <Button>Long Text Tooltip</Button>
    </Tooltip>
  ),
  args: {
    variant: 'default',
    size: 'default',
    side: 'top',
    sideOffset: 0,
  },
  parameters: {
    docs: {
      description: {
        story: '긴 텍스트가 포함된 Tooltip 예시입니다.',
      },
    },
  },
};

// 아이콘과 함께
export const WithIcon: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Tooltip {...args} content="홈으로 이동">
        <button
          style={{ padding: 8, border: 'none', background: 'transparent', cursor: 'pointer' }}
        >
          🏠
        </button>
      </Tooltip>
      <Tooltip {...args} content="설정 페이지">
        <button
          style={{ padding: 8, border: 'none', background: 'transparent', cursor: 'pointer' }}
        >
          ⚙️
        </button>
      </Tooltip>
      <Tooltip {...args} content="도움말">
        <button
          style={{ padding: 8, border: 'none', background: 'transparent', cursor: 'pointer' }}
        >
          ❓
        </button>
      </Tooltip>
    </div>
  ),
  args: {
    variant: 'default',
    size: 'default',
    side: 'top',
    sideOffset: 0,
  },
  parameters: {
    docs: {
      description: {
        story: '아이콘 버튼과 함께 사용하는 Tooltip 예시입니다.',
      },
    },
  },
};

// 비활성화된 버튼
export const DisabledButton: Story = {
  render: (args) => (
    <Tooltip {...args} content="모든 필드를 입력해주세요">
      <span>
        {' '}
        {/* disabled 요소는 이벤트를 받지 못하므로 span으로 감싸기 */}
        <Button disabled style={{ pointerEvents: 'none' }}>
          저장
        </Button>
      </span>
    </Tooltip>
  ),
  args: {
    variant: 'default',
    size: 'default',
    side: 'top',
    sideOffset: 0,
  },
  parameters: {
    docs: {
      description: {
        story: '비활성화된 버튼에 대한 설명을 제공하는 Tooltip 예시입니다.',
      },
    },
  },
};
