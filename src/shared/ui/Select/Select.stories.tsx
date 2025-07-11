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
        component: 'Radix 기반 Select 컴포넌트입니다. cva를 사용하여 스타일을 모듈화하였습니다.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Playground: Story = {
  render: () => (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="통신사를 선택하세요" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="skt">SKT</SelectItem>
        <SelectItem value="lguplus">LG U+</SelectItem>
        <SelectItem value="kt">KT</SelectItem>
      </SelectContent>
    </Select>
  ),
  parameters: {
    docs: {
      description: {
        story:
          '`SelectTrigger`, `SelectValue`, `SelectContent`, `SelectItem`의 기본적인 조합 예시입니다. 다양한 사이즈 및 옵션 구성에 따라 확장 가능합니다.',
      },
    },
  },
};
