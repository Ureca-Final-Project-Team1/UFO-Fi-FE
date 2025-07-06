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
