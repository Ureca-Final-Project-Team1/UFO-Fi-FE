import type { Meta, StoryObj } from '@storybook/nextjs';
import * as React from 'react';

import { Tooltip } from './tooltip';
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
};

const FollowUnfollowExample = () => {
  const [isFollow, setIsFollow] = React.useState(false);
  return (
    <Button
      style={{
        background: isFollow ? '#fff' : '#3B4CCA',
        color: isFollow ? '#222' : '#fff',
        borderRadius: 20,
        width: 140,
        height: 60,
        fontSize: 16,
        fontWeight: 700,
        border: isFollow ? '2px solid #222' : 'none',
      }}
      onClick={() => setIsFollow(!isFollow)}
    >
      {isFollow ? '언팔로우' : '팔로우'}
    </Button>
  );
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
      <Tooltip content="상단" side="top">
        <Button>Top</Button>
      </Tooltip>
      <Tooltip content="하단" side="bottom">
        <Button>Bottom</Button>
      </Tooltip>
      <Tooltip content="왼쪽" side="left">
        <Button>Left</Button>
      </Tooltip>
      <Tooltip content="오른쪽" side="right">
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
export const Custom: Story = {
  render: () => (
    <Tooltip content="오프셋 적용" sideOffset={16}>
      <Button>Custom Tooltip</Button>
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

export const FollowUnfollow: Story = {
  render: () => <FollowUnfollowExample />,
  parameters: {
    docs: {
      description: {
        story: '팔로우/언팔로우 토글 버튼 예시입니다.',
      },
    },
  },
};
