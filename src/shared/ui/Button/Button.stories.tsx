import type { Meta, StoryObj } from '@storybook/nextjs';
import React from 'react';

import { Button } from './Button';
import type { ButtonProps } from './Button';
import { IconType } from '../Icons';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'destructive',
        'outline',
        'ghost',
        'link',
        'exploration-button',
        'cancel-button',
        'number-badge',
        'action-button',
        'next-button',
        'project-button',
        'follow-button',
        'following-button',
        'unfollow-button',
      ],
    },
    size: {
      control: 'select',
      options: ['sm', 'follow-sm', 'default', 'lg', 'icon', 'full-width', 'compact'],
    },
    icon: {
      control: 'select',
      options: [
        'ufo',
        'planet',
        'trending',
        'astronaut',
        'satellite',
        'box',
        'rotate',
      ] satisfies IconType[],
    },
    iconPosition: {
      control: 'radio',
      options: ['left', 'right'],
    },
    children: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Playground: Story = {
  args: {
    variant: 'primary',
    size: 'default',
    children: 'Click me',
    icon: undefined,
    iconPosition: 'left',
    onClick: () => alert('Playground 버튼 클릭됨'),
  },
};

export const WithIcon: Story = {
  args: {
    variant: 'primary',
    size: 'default',
    children: 'Explore',
    icon: 'satellite',
    iconPosition: 'left',
    onClick: () => alert('WithIcon 버튼 클릭됨'),
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      {[
        'primary',
        'secondary',
        'destructive',
        'outline',
        'ghost',
        'link',
        'exploration-button',
        'cancel-button',
        'number-badge',
        'action-button',
        'next-button',
        'project-button',
        'follow-button',
        'following-button',
        'unfollow-button',
      ].map((variant) => (
        <Button
          key={variant}
          variant={variant as ButtonProps['variant']}
          onClick={() => alert(`${variant} 버튼 클릭됨`)}
        >
          {variant}
        </Button>
      ))}
    </div>
  ),
  args: {
    size: 'default',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      {(
        [
          'sm',
          'follow-sm',
          'default',
          'lg',
          'icon',
          'full-width',
          'compact',
        ] as ButtonProps['size'][]
      ).map((size) => (
        <Button
          key={size}
          size={size}
          variant="primary"
          icon={size === 'icon' ? 'ufo' : undefined}
          aria-label={size === 'icon' ? '알림 열기' : undefined}
          onClick={() => alert(`${size} 버튼 클릭됨`)}
        >
          {size === 'icon' ? <span className="sr-only">알림 열기</span> : `${size} button`}
        </Button>
      ))}
    </div>
  ),
};

// 팔로우 버튼 전용 스토리 추가
export const FollowButtons: Story = {
  name: '팔로우 버튼 variants',
  render: () => (
    <div className="flex flex-col gap-4 p-4 bg-gray-900 rounded-lg">
      <div className="flex gap-4">
        <Button variant="follow-button" size="follow-sm">
          팔로우
        </Button>
        <Button variant="following-button" size="follow-sm">
          맞팔로우
        </Button>
        <Button variant="unfollow-button" size="follow-sm">
          언팔로우
        </Button>
      </div>

      <div className="flex gap-4">
        <Button variant="follow-button" size="sm">
          팔로우
        </Button>
        <Button variant="following-button" size="sm">
          맞팔로우
        </Button>
        <Button variant="unfollow-button" size="sm">
          언팔로우
        </Button>
      </div>

      <div className="text-white text-sm">
        상단: follow-sm 사이즈 (팔로우 전용) <br />
        하단: sm 사이즈 (일반)
      </div>
    </div>
  ),
};

const FollowButtonExampleComponent = () => {
  const [isFollowing, setIsFollowing] = React.useState(false);

  return (
    <div className="flex flex-col gap-4 p-4 bg-gray-900 rounded-lg">
      <div className="flex items-center gap-3">
        <div className="size-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
          U
        </div>
        <div className="flex-1 text-white">
          <p className="font-bold">지구인 #123</p>
        </div>
        <Button
          variant={isFollowing ? 'following-button' : 'follow-button'}
          size="follow-sm"
          onClick={() => setIsFollowing(!isFollowing)}
        >
          {isFollowing ? '맞팔로우' : '팔로우'}
        </Button>
      </div>

      <div className="text-white text-sm">버튼을 클릭하면 팔로우 상태가 변경됩니다.</div>
    </div>
  );
};

export const FollowButtonExample: Story = {
  name: '팔로우 버튼 사용 예시',
  render: () => <FollowButtonExampleComponent />,
};
