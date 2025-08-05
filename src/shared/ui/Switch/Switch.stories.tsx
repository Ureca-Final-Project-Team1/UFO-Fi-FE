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
          '재사용 가능한 Switch(토글) 컴포넌트입니다. 다양한 폼과 설정 UI에 사용할 수 있습니다.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'dark', 'minimal'],
      description: 'Switch의 테마 스타일',
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'sm', 'lg'],
      description: 'Switch의 크기',
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
type Story = StoryObj<typeof Switch>;

// 기본 스위치
const DefaultSwitch = (args: React.ComponentProps<typeof Switch>) => {
  const [checked, setChecked] = React.useState(false);
  return <Switch {...args} checked={checked} onCheckedChange={setChecked} />;
};
export const Default: Story = {
  render: (args) => <DefaultSwitch {...args} />,
  args: {
    variant: 'default',
    size: 'default',
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: '기본 Switch 컴포넌트입니다.',
      },
    },
  },
};

// 다크 테마 스위치
const DarkSwitch = (args: React.ComponentProps<typeof Switch>) => {
  const [checked, setChecked] = React.useState(true);
  return <Switch {...args} checked={checked} onCheckedChange={setChecked} />;
};
export const Dark: Story = {
  render: (args) => <DarkSwitch {...args} />,
  args: {
    variant: 'dark',
    size: 'default',
    disabled: false,
  },
};

// 미니멀 스위치
const MinimalSwitch = (args: React.ComponentProps<typeof Switch>) => {
  const [checked, setChecked] = React.useState(false);
  return <Switch {...args} checked={checked} onCheckedChange={setChecked} />;
};
export const Minimal: Story = {
  render: (args) => <MinimalSwitch {...args} />,
  args: {
    variant: 'minimal',
    size: 'default',
    disabled: false,
  },
};

// 크기별 스위치
export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      <div className="flex flex-col items-center gap-2">
        <span className="text-sm">Small</span>
        <Switch {...args} size="sm" />
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-sm">Default</span>
        <Switch {...args} size="default" />
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-sm">Large</span>
        <Switch {...args} size="lg" />
      </div>
    </div>
  ),
  args: {
    variant: 'default',
    disabled: false,
  },
};

// 라벨과 함께 사용
const WithLabelSwitch = (args: React.ComponentProps<typeof Switch>) => {
  const [checked, setChecked] = React.useState(true);
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <Switch {...args} checked={checked} onCheckedChange={setChecked} />
      <span>{checked ? 'ON' : 'OFF'}</span>
    </label>
  );
};
export const WithLabel: Story = {
  render: (args) => <WithLabelSwitch {...args} />,
  args: {
    variant: 'default',
    size: 'default',
    disabled: false,
  },
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
  render: (args) => <Switch {...args} disabled />,
  args: {
    variant: 'default',
    size: 'default',
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: '비활성화(Disabled) 상태의 Switch입니다.',
      },
    },
  },
};
