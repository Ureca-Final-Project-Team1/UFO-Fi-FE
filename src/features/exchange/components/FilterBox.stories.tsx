import type { Meta, StoryObj } from '@storybook/react';

import { FilterBox } from './FilterBox';

const meta: Meta<typeof FilterBox> = {
  title: 'Exchange/FilterBox',
  component: FilterBox,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: { type: 'text' },
      description: '필터 박스의 제목',
    },
    isMultipleSelection: {
      control: { type: 'boolean' },
      description: '중복 선택 가능 여부',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: '통신사',
    isMultipleSelection: false,
    children: (
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <input type="checkbox" id="skt" />
          <label htmlFor="skt" className="text-sm">
            SKT
          </label>
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" id="kt" />
          <label htmlFor="kt" className="text-sm">
            KT
          </label>
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" id="lgu" />
          <label htmlFor="lgu" className="text-sm">
            LG U+
          </label>
        </div>
      </div>
    ),
  },
};

export const MultipleSelection: Story = {
  args: {
    name: '데이터 용량',
    isMultipleSelection: true,
    children: (
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <input type="checkbox" id="small" />
          <label htmlFor="small" className="text-sm">
            1-5GB
          </label>
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" id="medium" />
          <label htmlFor="medium" className="text-sm">
            6-10GB
          </label>
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" id="large" />
          <label htmlFor="large" className="text-sm">
            11GB+
          </label>
        </div>
      </div>
    ),
  },
};

export const NetworkType: Story = {
  args: {
    name: '네트워크 타입',
    isMultipleSelection: false,
    children: (
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <input type="radio" name="network" id="4g" />
          <label htmlFor="4g" className="text-sm">
            4G
          </label>
        </div>
        <div className="flex items-center gap-2">
          <input type="radio" name="network" id="5g" />
          <label htmlFor="5g" className="text-sm">
            5G
          </label>
        </div>
      </div>
    ),
  },
};

export const PriceRange: Story = {
  args: {
    name: '가격 범위',
    isMultipleSelection: false,
    children: (
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <input type="radio" name="price" id="low" />
          <label htmlFor="low" className="text-sm">
            1,000 ZET 이하
          </label>
        </div>
        <div className="flex items-center gap-2">
          <input type="radio" name="price" id="medium" />
          <label htmlFor="medium" className="text-sm">
            1,001-5,000 ZET
          </label>
        </div>
        <div className="flex items-center gap-2">
          <input type="radio" name="price" id="high" />
          <label htmlFor="high" className="text-sm">
            5,001 ZET 이상
          </label>
        </div>
      </div>
    ),
  },
};
