import type { Meta, StoryObj } from '@storybook/react';

import { PlanCombo } from './PlanCombo';

const meta: Meta<typeof PlanCombo> = {
  title: 'Components/signup/PlanCombo',
  component: PlanCombo,
};

export default meta;
type Story = StoryObj<typeof PlanCombo>;

export const Default: Story = {
  args: {
    planNames: ['5G 시그니처', '5G 라이트+', 'LTE 스페셜'],
    onSelect: (value) => console.log('선택한 요금제:', value),
  },
};
