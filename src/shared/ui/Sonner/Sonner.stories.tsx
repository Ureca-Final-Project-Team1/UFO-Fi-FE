import type { Meta, StoryObj } from '@storybook/nextjs';
import { toast } from 'sonner';

import { Toaster } from './Sonner';
import { Button } from '../Button/Button';

const meta: Meta<typeof Toaster> = {
  title: 'UI/Sonner',
  component: Toaster,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Sonner를 기반으로 한 토스트 알림 컴포넌트입니다. 다크/라이트 테마를 자동으로 지원합니다.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'dark', 'minimal'],
      description: '토스트의 테마 스타일',
    },
    position: {
      control: { type: 'select' },
      options: [
        'top-left',
        'top-center',
        'top-right',
        'bottom-left',
        'bottom-center',
        'bottom-right',
      ],
      description: '토스트의 위치',
    },
    className: {
      control: 'text',
      description: '추가 CSS 클래스',
    },
  },
  decorators: [
    (Story) => (
      <div>
        <Story />
        <Toaster />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Toaster>;

// 기본 토스트
export const Default: Story = {
  render: (args) => (
    <div className="space-y-4">
      <Button onClick={() => toast('기본 토스트 메시지입니다.')}>기본 토스트</Button>
      <Button onClick={() => toast.success('성공 메시지입니다!')}>성공 토스트</Button>
      <Button onClick={() => toast.error('에러 메시지입니다.')}>에러 토스트</Button>
      <Button onClick={() => toast.warning('경고 메시지입니다.')}>경고 토스트</Button>
      <Button onClick={() => toast.info('정보 메시지입니다.')}>정보 토스트</Button>
      <Toaster {...args} />
    </div>
  ),
  args: {
    variant: 'default',
    position: 'bottom-center',
  },
  parameters: {
    docs: {
      description: {
        story: '다양한 타입의 토스트 메시지를 보여줍니다.',
      },
    },
  },
};

export const Dark: Story = {
  render: (args) => (
    <div className="space-y-4">
      <Button onClick={() => toast('다크 테마 토스트 메시지입니다.')}>다크 토스트</Button>
      <Button onClick={() => toast.success('다크 테마 성공 메시지입니다!')}>
        다크 성공 토스트
      </Button>
      <Button onClick={() => toast.error('다크 테마 에러 메시지입니다.')}>다크 에러 토스트</Button>
      <Toaster {...args} />
    </div>
  ),
  args: {
    variant: 'dark',
    position: 'bottom-center',
  },
};

export const Minimal: Story = {
  render: (args) => (
    <div className="space-y-4">
      <Button onClick={() => toast('미니멀 토스트 메시지입니다.')}>미니멀 토스트</Button>
      <Button onClick={() => toast.success('미니멀 성공 메시지입니다!')}>미니멀 성공 토스트</Button>
      <Button onClick={() => toast.error('미니멀 에러 메시지입니다.')}>미니멀 에러 토스트</Button>
      <Toaster {...args} />
    </div>
  ),
  args: {
    variant: 'minimal',
    position: 'bottom-center',
  },
};

export const TopPosition: Story = {
  render: (args) => (
    <div className="space-y-4">
      <Button onClick={() => toast('상단에 표시되는 토스트입니다.')}>상단 토스트</Button>
      <Button onClick={() => toast.success('상단 성공 토스트입니다!')}>상단 성공 토스트</Button>
      <Toaster {...args} />
    </div>
  ),
  args: {
    variant: 'default',
    position: 'top-center',
  },
};

// Promise 토스트
export const PromiseToast: Story = {
  render: (args) => (
    <div className="space-y-4">
      <Button
        onClick={() => {
          toast.promise(new Promise((resolve) => setTimeout(resolve, 2000)), {
            loading: '업로드 중...',
            success: '업로드 완료!',
            error: '업로드 실패',
          });
        }}
      >
        Promise 토스트
      </Button>
      <Toaster {...args} />
    </div>
  ),
  args: {
    variant: 'default',
    position: 'bottom-center',
  },
  parameters: {
    docs: {
      description: {
        story: 'Promise 기반의 로딩/성공/실패 상태를 보여주는 토스트입니다.',
      },
    },
  },
};
