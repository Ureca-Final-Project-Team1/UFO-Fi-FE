import type { Meta, StoryObj } from '@storybook/nextjs';
import * as React from 'react';

import { Switch } from './Switch';

const meta: Meta<typeof Switch> = {
  title: 'UI/Switch',
  component: Switch,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '재사용 가능한 Switch(토글) 컴포넌트입니다. 다양한 폼과 설정 UI에 사용할 수 있으며, 다양한 variants를 지원합니다.',
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Switch 크기',
    },
    variant: {
      control: { type: 'select' },
      options: [
        'default',
        'primary',
        'secondary',
        'accent',
        'success',
        'warning',
        'error',
        'custom',
      ],
      description: 'Switch 스타일 변형',
    },
    theme: {
      control: { type: 'select' },
      options: ['light', 'dark', 'auto'],
      description: 'Switch 테마',
    },
    disabled: {
      control: { type: 'boolean' },
      description: '비활성화 상태',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

// 기본 스위치
const DefaultSwitch = () => {
  const [checked, setChecked] = React.useState(false);
  return <Switch checked={checked} onCheckedChange={setChecked} />;
};
export const Default: Story = {
  render: () => <DefaultSwitch />,
  parameters: {
    docs: {
      description: {
        story: '기본 Switch 컴포넌트입니다.',
      },
    },
  },
};

// 라벨과 함께 사용
const WithLabelSwitch = () => {
  const [checked, setChecked] = React.useState(true);
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <Switch checked={checked} onCheckedChange={setChecked} />
      <span>{checked ? 'ON' : 'OFF'}</span>
    </label>
  );
};
export const WithLabel: Story = {
  render: () => <WithLabelSwitch />,
  parameters: {
    docs: {
      description: {
        story: '라벨과 함께 사용하는 Switch 예시입니다.',
      },
    },
  },
};

// 비활성화 상태
export const Disabled: Story = {
  render: () => <Switch disabled />,
  parameters: {
    docs: {
      description: {
        story: '비활성화(Disabled) 상태의 Switch입니다.',
      },
    },
  },
};

// 다양한 크기
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <span className="w-8 text-xs">SM:</span>
        <Switch size="sm" />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-8 text-sm">MD:</span>
        <Switch size="md" />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-8 text-base">LG:</span>
        <Switch size="lg" />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-8 text-lg">XL:</span>
        <Switch size="xl" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '다양한 크기의 Switch를 보여줍니다.',
      },
    },
  },
};

// 다양한 변형
export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <span className="w-16 text-sm">Default:</span>
        <Switch variant="default" />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-16 text-sm">Primary:</span>
        <Switch variant="primary" />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-16 text-sm">Secondary:</span>
        <Switch variant="secondary" />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-16 text-sm">Accent:</span>
        <Switch variant="accent" />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-16 text-sm">Success:</span>
        <Switch variant="success" />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-16 text-sm">Warning:</span>
        <Switch variant="warning" />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-16 text-sm">Error:</span>
        <Switch variant="error" />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-16 text-sm">Custom:</span>
        <Switch variant="custom" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '다양한 스타일 변형의 Switch를 보여줍니다.',
      },
    },
  },
};

// 상태별 예시
export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <span className="w-16 text-sm">Unchecked:</span>
        <Switch checked={false} />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-16 text-sm">Checked:</span>
        <Switch checked={true} />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-16 text-sm">Disabled:</span>
        <Switch disabled />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-16 text-sm">Disabled Checked:</span>
        <Switch checked={true} disabled />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '다양한 상태의 Switch를 보여줍니다.',
      },
    },
  },
};

// 인터랙티브 예시
const InteractiveSwitch = () => {
  const [checked, setChecked] = React.useState(false);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Switch checked={checked} onCheckedChange={setChecked} />
        <span className="text-sm">
          현재 상태: <strong>{checked ? 'ON' : 'OFF'}</strong>
        </span>
      </div>
      <button
        onClick={() => setChecked(!checked)}
        className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        상태 토글
      </button>
    </div>
  );
};

export const Interactive: Story = {
  render: () => <InteractiveSwitch />,
  parameters: {
    docs: {
      description: {
        story: '상호작용 가능한 Switch 예시입니다.',
      },
    },
  },
};
