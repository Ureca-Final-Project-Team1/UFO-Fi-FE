import type { Meta, StoryObj } from '@storybook/nextjs';

import { RadioGroup } from './RadioGroup';

const meta: Meta<typeof RadioGroup> = {
  title: 'UI/Radio',
  component: RadioGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Radix 기반의 기본 RadioGroup 컴포넌트입니다. 문자열 배열만 넘기면 자동으로 렌더링됩니다.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Playground: Story = {
  render: () => (
    <RadioGroup options={['Option 1', 'Option 2', 'Option 3']} defaultValue="option 1" />
  ),
  parameters: {
    docs: {
      description: {
        story: '3개의 옵션을 가진 RadioGroup 기본 예시입니다.',
      },
    },
  },
};
