import type { Meta, StoryObj } from '@storybook/nextjs';
import { toast } from 'sonner';

import { Toaster } from './sonner';
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
  render: () => (
    <div className="space-y-4">
      <Button onClick={() => toast('기본 토스트 메시지입니다.')}>기본 토스트</Button>
      <Button onClick={() => toast.success('성공 메시지입니다!')}>성공 토스트</Button>
      <Button onClick={() => toast.error('에러 메시지입니다.')}>에러 토스트</Button>
      <Button onClick={() => toast.warning('경고 메시지입니다.')}>경고 토스트</Button>
      <Button onClick={() => toast.info('정보 메시지입니다.')}>정보 토스트</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '다양한 타입의 토스트 메시지를 보여줍니다.',
      },
    },
  },
};

// Promise 토스트
export const PromiseToast: Story = {
  render: () => (
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
  ),
  parameters: {
    docs: {
      description: {
        story: 'Promise 기반의 로딩/성공/실패 상태를 보여주는 토스트입니다.',
      },
    },
  },
};
