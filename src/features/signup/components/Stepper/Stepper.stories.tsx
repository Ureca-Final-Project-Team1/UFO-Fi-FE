import type { Meta, StoryObj } from '@storybook/react';

import { Stepper } from './Stepper';

// Mock Stepper for Storybook
const MockStepper = ({
  step = 1,
  content = '정보 입력',
  textColor = 'text-white',
}: {
  step?: 1 | 2;
  content?: string;
  textColor?: string;
}) => {
  return (
    <div className="w-full bg-gray-900 p-4">
      <div className="max-w-md mx-auto">
        <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
          <h2 className="text-white text-base font-semibold mb-4">회원가입 진행 단계</h2>

          <div className="flex justify-center">
            <Stepper step={step} content={content} textColor={textColor} className="" />
          </div>

          <div className="mt-4 p-3 bg-blue-500/20 border border-blue-500/30 rounded-lg">
            <p className="text-blue-300 text-sm">
              <strong>현재 단계:</strong> {step}
            </p>
            <p className="text-blue-300 text-sm">
              <strong>단계 설명:</strong> {content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const meta: Meta<typeof MockStepper> = {
  title: 'Signup/Stepper',
  component: MockStepper,
  parameters: {
    layout: 'padded',
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    step: {
      control: { type: 'radio' },
      options: [1, 2],
      description: '현재 단계 (1: 정보 입력, 2: 가입 신청)',
    },
    content: {
      control: { type: 'text' },
      description: '단계 설명 텍스트',
    },
    textColor: {
      control: { type: 'select' },
      options: ['text-white', 'text-black', 'text-gray-300'],
      description: '텍스트 색상',
    },
  },
};

export default meta;
type Story = StoryObj<typeof MockStepper>;

export const Step1: Story = {
  args: {
    step: 1,
    content: '정보 입력',
    textColor: 'text-white',
  },
};

export const Step2: Story = {
  args: {
    step: 2,
    content: '가입 신청',
    textColor: 'text-white',
  },
};

export const CustomContent: Story = {
  args: {
    step: 1,
    content: '프로필 설정',
    textColor: 'text-white',
  },
};

export const DarkText: Story = {
  args: {
    step: 1,
    content: '정보 입력',
    textColor: 'text-black',
  },
};

export const GrayText: Story = {
  args: {
    step: 2,
    content: '가입 신청',
    textColor: 'text-gray-300',
  },
};

export const Desktop: Story = {
  args: {
    step: 1,
    content: '정보 입력',
    textColor: 'text-white',
  },
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};
