import type { Meta, StoryObj } from '@storybook/nextjs';

import { RadioGroup } from './RadioGroup';
import { RadioGroupItem } from './RadioGroupItem';

const meta: Meta<typeof RadioGroup> = {
  title: 'UI/Radio',
  component: RadioGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Radix 기반의 기본 RadioGroup 컴포넌트입니다.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Playground: Story = {
  render: () => (
    <RadioGroup defaultValue="option-1">
      <RadioGroupItem value="option-1" id="r1" />
      <label htmlFor="r1" className="ml-2 text-sm">
        Option 1
      </label>

      <RadioGroupItem value="option-2" id="r2" />
      <label htmlFor="r2" className="ml-2 text-sm">
        Option 2
      </label>

      <RadioGroupItem value="option-3" id="r3" />
      <label htmlFor="r3" className="ml-2 text-sm">
        Option 3
      </label>
    </RadioGroup>
  ),
  parameters: {
    docs: {
      description: {
        story: 'RadioGroup과 RadioGroupItem의 기본 사용 예입니다.',
      },
    },
  },
};
