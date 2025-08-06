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
          'Sonner를 기반으로 한 토스트 알림 컴포넌트입니다. 다크/라이트 테마를 자동으로 지원하며, 다양한 variants를 제공합니다.',
      },
    },
  },
  argTypes: {
    theme: {
      control: { type: 'select' },
      options: ['default', 'light', 'dark', 'auto'],
      description: '토스트 테마',
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
      description: '토스트 위치',
    },
    expand: {
      control: { type: 'boolean' },
      description: '토스트 확장 여부',
    },
    richColors: {
      control: { type: 'boolean' },
      description: '리치 컬러 사용 여부',
    },
    closeButton: {
      control: { type: 'boolean' },
      description: '닫기 버튼 표시 여부',
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

// 다양한 위치의 토스트
export const Positions: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Button onClick={() => toast('상단 왼쪽', { position: 'top-left' })}>Top Left</Button>
        <Button onClick={() => toast('상단 중앙', { position: 'top-center' })}>Top Center</Button>
        <Button onClick={() => toast('상단 오른쪽', { position: 'top-right' })}>Top Right</Button>
        <Button onClick={() => toast('하단 왼쪽', { position: 'bottom-left' })}>Bottom Left</Button>
        <Button onClick={() => toast('하단 중앙', { position: 'bottom-center' })}>
          Bottom Center
        </Button>
        <Button onClick={() => toast('하단 오른쪽', { position: 'bottom-right' })}>
          Bottom Right
        </Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '다양한 위치에 토스트를 표시할 수 있습니다.',
      },
    },
  },
};

// 커스텀 스타일 토스트
export const CustomStyles: Story = {
  render: () => (
    <div className="space-y-4">
      <Button
        onClick={() => {
          toast('커스텀 스타일 토스트', {
            style: {
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
            },
          });
        }}
      >
        그라데이션 토스트
      </Button>
      <Button
        onClick={() => {
          toast('다크 테마 토스트', {
            style: {
              background: '#1a1a1a',
              color: '#ffffff',
              border: '1px solid #333',
            },
          });
        }}
      >
        다크 테마 토스트
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '커스텀 스타일을 적용한 토스트를 보여줍니다.',
      },
    },
  },
};

// 액션이 있는 토스트
export const WithActions: Story = {
  render: () => (
    <div className="space-y-4">
      <Button
        onClick={() => {
          toast('액션이 있는 토스트', {
            action: {
              label: '실행',
              onClick: () => console.warn('액션 실행됨'),
            },
          });
        }}
      >
        액션 토스트
      </Button>
      <Button
        onClick={() => {
          toast('취소 가능한 토스트', {
            action: {
              label: '취소',
              onClick: () => console.warn('취소됨'),
            },
            duration: Infinity,
          });
        }}
      >
        취소 가능 토스트
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '액션 버튼이 있는 토스트를 보여줍니다.',
      },
    },
  },
};
