import type { Meta, StoryObj } from '@storybook/react';

import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './index';

const meta: Meta<typeof Select> = {
  title: 'UI/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Radix 기반 Select 컴포넌트입니다.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Playground: Story = {
  render: () => (
    <Select defaultValue="apple">
      <SelectTrigger>
        <SelectValue placeholder="과일을 선택하세요" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">🍎 사과</SelectItem>
        <SelectItem value="banana">🍌 바나나</SelectItem>
        <SelectItem value="orange">🍊 오렌지</SelectItem>
      </SelectContent>
    </Select>
  ),
  parameters: {
    docs: {
      description: {
        story: 'SelectTrigger, SelectValue, SelectContent, SelectItem 조합 예시입니다.',
      },
    },
  },
};
