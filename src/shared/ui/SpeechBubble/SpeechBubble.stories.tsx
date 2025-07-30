import type { Meta, StoryObj } from '@storybook/nextjs';

import { SpeechBubble } from './SpeechBubble';

const meta: Meta<typeof SpeechBubble> = {
  title: 'UI/SpeechBubble',
  component: SpeechBubble,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '다양한 방향의 꼬리와 스타일을 지원하는 말풍선 컴포넌트입니다.',
      },
    },
  },
  argTypes: {
    tailDirection: {
      control: 'select',
      options: ['left', 'right', 'top', 'bottom'],
      description: '말풍선 꼬리 방향',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: '말풍선 크기',
    },
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary'],
      description: '말풍선 스타일 변형',
    },
  },
};

export default meta;
type Story = StoryObj<typeof SpeechBubble>;

export const Default: Story = {
  args: {
    children: '안녕하세요! 기본 말풍선입니다.',
    tailDirection: 'left',
    size: 'md',
    variant: 'default',
  },
};

export const AllDirections: Story = {
  name: 'All Directions',
  render: () => (
    <div className="grid grid-cols-2 gap-8 p-8">
      <div className="flex justify-center">
        <SpeechBubble tailDirection="left">왼쪽 꼬리</SpeechBubble>
      </div>
      <div className="flex justify-center">
        <SpeechBubble tailDirection="right">오른쪽 꼬리</SpeechBubble>
      </div>
      <div className="flex justify-center">
        <SpeechBubble tailDirection="top">위쪽 꼬리</SpeechBubble>
      </div>
      <div className="flex justify-center">
        <SpeechBubble tailDirection="bottom">아래쪽 꼬리</SpeechBubble>
      </div>
    </div>
  ),
};

export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => (
    <div className="flex flex-col items-center gap-4 p-8">
      <SpeechBubble size="sm" tailDirection="left">
        작은 크기
      </SpeechBubble>
      <SpeechBubble size="md" tailDirection="left">
        중간 크기
      </SpeechBubble>
      <SpeechBubble size="lg" tailDirection="left">
        큰 크기의 말풍선입니다
      </SpeechBubble>
    </div>
  ),
};

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div className="flex flex-col items-center gap-4 p-8">
      <SpeechBubble variant="default" tailDirection="left">
        기본 스타일
      </SpeechBubble>
      <SpeechBubble variant="secondary" tailDirection="left">
        세컨더리 스타일
      </SpeechBubble>
    </div>
  ),
};

export const ExchangeExample: Story = {
  name: 'Exchange Header Example',
  render: () => (
    <div className="p-4 bg-gray-50">
      <SpeechBubble tailDirection="left" size="sm" className="text-xs">
        조건에 맞는 상품을 원하시면 필터링 기능을 이용해보세요!
      </SpeechBubble>
    </div>
  ),
};

export const AlienExample: Story = {
  name: 'Alien Speech Example',
  render: () => (
    <div className="p-8 bg-blue-50">
      <SpeechBubble tailDirection="bottom">지구인님, 오늘 거래하실 건가요?</SpeechBubble>
    </div>
  ),
};
