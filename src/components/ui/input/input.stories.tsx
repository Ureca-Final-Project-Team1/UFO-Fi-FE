import type { Meta, StoryObj } from '@storybook/react';

import { AccountInput } from './AccountInput';
import { BankSelectInput } from './BankSelectInput';
import { BasicInput } from './BasicInput';
import { LabeledInput } from './LabeledInput';
import { PhoneInput } from './PhoneInput';
import { PriceInput } from './PriceInput';

const meta: Meta = {
  title: 'UI/Inputs/Playground',
  tags: ['autodocs'],
  args: {
    inputType: 'basic', // 기본 선택값
    size: 'md',
  },
  argTypes: {
    inputType: {
      control: 'select',
      options: ['basic', 'account', 'bankSelect', 'price', 'namePhone'],
      description: '표시할 인풋 컴포넌트 선택',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: '컴포넌트 패딩 등 크기 조절용 클래스',
    },
  },
};

export default meta;

type PlaygroundProps = {
  inputType: 'basic' | 'account' | 'bankSelect' | 'price' | 'namePhone';
  size: 'sm' | 'md' | 'lg';
};

const sizeMap = {
  sm: 'w-[100px]',
  md: 'w-[150px]',
  lg: 'w-[200px]',
};

export const Playground: StoryObj<PlaygroundProps> = {
  render: ({ inputType, size }) => {
    const sizeClass = sizeMap[size];

    switch (inputType) {
      case 'account':
        return <AccountInput className={sizeClass} />;
      case 'bankSelect':
        return (
          <BankSelectInput
            selectedBank="은행명"
            onClick={() => alert('은행 선택창 열기')}
            className={sizeClass}
          />
        );
      case 'price':
        return <PriceInput className={sizeClass} />;
      case 'namePhone':
        return (
          <div className={`space-y-4 bg-[#050018] p-4 rounded-md`}>
            <div className="space-y-1">
              <LabeledInput label="이름" className={sizeClass} />
            </div>
            <div className="space-y-1">
              <label className="text-sm text-white">전화번호</label>
              <PhoneInput className={sizeClass} />
            </div>
          </div>
        );
      case 'basic':
      default:
        return <BasicInput placeholder="기본 입력창입니다." className={sizeClass} />;
    }
  },
};
