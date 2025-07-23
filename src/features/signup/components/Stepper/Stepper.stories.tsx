import type { Meta, StoryObj } from '@storybook/nextjs';

import { Stepper } from './Stepper';

const meta: Meta<typeof Stepper> = {
  title: 'components/signup/Stepper',
  component: Stepper,
};

export const Step1: StoryObj<typeof Stepper> = {
  args: {
    step: 1,
    content: '정보 입력',
    textColor: 'text-black',
  },
};

export const Step2: StoryObj<typeof Stepper> = {
  args: {
    step: 2,
    content: '가입 신청',
    textColor: 'text-black',
  },
};

export default meta;
