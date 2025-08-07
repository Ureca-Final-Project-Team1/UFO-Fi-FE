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
    contentVariant: {
      control: { type: 'select' },
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'error', 'custom'],
      description: '툴팁 콘텐츠 스타일 변형',
    },
    contentSize: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
      description: '툴팁 콘텐츠 크기',
    },
    contentTheme: {
      control: { type: 'select' },
      options: ['light', 'dark', 'custom'],
      description: '툴팁 콘텐츠 테마',
    },
    contentRounded: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg', 'full'],
      description: '툴팁 콘텐츠 둥근 모서리',
    },
    arrowVariant: {
      control: { type: 'select' },
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'error', 'custom'],
      description: '툴팁 화살표 스타일 변형',
    },
    arrowSize: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: '툴팁 화살표 크기',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

// 기본 툴팁
export const Default: Story = {
  render: () => (
    <Tooltip content="기본 툴팁입니다.">
      <Button>Hover me</Button>
    </Tooltip>
  ),
  parameters: {
    docs: {
      description: {
        story: '기본 Tooltip 예시입니다.',
      },
    },
  },
};

// 다양한 위치
export const Placement: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24 }}>
      <Tooltip content="상단 툴팁" side="top">
        <Button>Top</Button>
      </Tooltip>
      <Tooltip content="하단 툴팁" side="bottom">
        <Button>Bottom</Button>
      </Tooltip>
      <Tooltip content="왼쪽 툴팁" side="left">
        <Button>Left</Button>
      </Tooltip>
      <Tooltip content="오른쪽 툴팁" side="right">
        <Button>Right</Button>
      </Tooltip>
    </div>
  ),
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
  render: () => (
    <Tooltip content="16px 오프셋 적용" sideOffset={16}>
      <Button>Custom Offset</Button>
    </Tooltip>
  ),
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
  render: () => (
    <Tooltip content="이것은 매우 긴 툴팁 텍스트입니다. 여러 줄에 걸쳐 표시될 수 있습니다.">
      <Button>Long Text Tooltip</Button>
    </Tooltip>
  ),
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
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Tooltip content="홈으로 이동">
        <button
          style={{ padding: 8, border: 'none', background: 'transparent', cursor: 'pointer' }}
        >
          🏠
        </button>
      </Tooltip>
      <Tooltip content="설정 페이지">
        <button
          style={{ padding: 8, border: 'none', background: 'transparent', cursor: 'pointer' }}
        >
          ⚙️
        </button>
      </Tooltip>
      <Tooltip content="도움말">
        <button
          style={{ padding: 8, border: 'none', background: 'transparent', cursor: 'pointer' }}
        >
          ❓
        </button>
      </Tooltip>
    </div>
  ),
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
  render: () => (
    <Tooltip content="모든 필드를 입력해주세요">
      <span>
        {' '}
        {/* disabled 요소는 이벤트를 받지 못하므로 span으로 감싸기 */}
        <Button disabled style={{ pointerEvents: 'none' }}>
          저장
        </Button>
      </span>
    </Tooltip>
  ),
  parameters: {
    docs: {
      description: {
        story: '비활성화된 버튼에 대한 설명을 제공하는 Tooltip 예시입니다.',
      },
    },
  },
};

// 다양한 크기
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Tooltip content="Small size" contentSize="sm">
        <Button>Small</Button>
      </Tooltip>
      <Tooltip content="Medium size (default)" contentSize="md">
        <Button>Medium</Button>
      </Tooltip>
      <Tooltip content="Large size" contentSize="lg">
        <Button>Large</Button>
      </Tooltip>
      <Tooltip content="Extra large size" contentSize="xl">
        <Button>XL</Button>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '다양한 크기의 Tooltip을 보여줍니다.',
      },
    },
  },
};

// 다양한 변형
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Tooltip content="Default variant" contentVariant="default">
        <Button>Default</Button>
      </Tooltip>
      <Tooltip content="Primary variant" contentVariant="primary">
        <Button>Primary</Button>
      </Tooltip>
      <Tooltip content="Secondary variant" contentVariant="secondary">
        <Button>Secondary</Button>
      </Tooltip>
      <Tooltip content="Success variant" contentVariant="success">
        <Button>Success</Button>
      </Tooltip>
      <Tooltip content="Warning variant" contentVariant="warning">
        <Button>Warning</Button>
      </Tooltip>
      <Tooltip content="Error variant" contentVariant="error">
        <Button>Error</Button>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '다양한 스타일 변형의 Tooltip을 보여줍니다.',
      },
    },
  },
};

// 다양한 테마
export const Themes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Tooltip content="Light theme" contentTheme="light">
        <Button>Light</Button>
      </Tooltip>
      <Tooltip content="Dark theme" contentTheme="dark">
        <Button>Dark</Button>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '다양한 테마의 Tooltip을 보여줍니다.',
      },
    },
  },
};

// 다양한 둥근 모서리
export const Rounded: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Tooltip content="No rounded" contentRounded="none">
        <Button>None</Button>
      </Tooltip>
      <Tooltip content="Small rounded" contentRounded="sm">
        <Button>Small</Button>
      </Tooltip>
      <Tooltip content="Medium rounded (default)" contentRounded="md">
        <Button>Medium</Button>
      </Tooltip>
      <Tooltip content="Large rounded" contentRounded="lg">
        <Button>Large</Button>
      </Tooltip>
      <Tooltip content="Full rounded" contentRounded="full">
        <Button>Full</Button>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '다양한 둥근 모서리의 Tooltip을 보여줍니다.',
      },
    },
  },
};

// 다양한 화살표 크기
export const ArrowSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Tooltip content="Small arrow" arrowSize="sm">
        <Button>Small</Button>
      </Tooltip>
      <Tooltip content="Medium arrow (default)" arrowSize="md">
        <Button>Medium</Button>
      </Tooltip>
      <Tooltip content="Large arrow" arrowSize="lg">
        <Button>Large</Button>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '다양한 화살표 크기의 Tooltip을 보여줍니다.',
      },
    },
  },
};
