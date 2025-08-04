import type { Meta, StoryObj } from '@storybook/react';
import Image from 'next/image';

import { FilterBox } from './FilterBox';

const meta: Meta<typeof FilterBox> = {
  title: 'Exchange/FilterBox',
  component: FilterBox,
  parameters: {
    layout: 'padded',
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    name: { control: { type: 'text' } },
    isMultipleSelection: { control: { type: 'boolean' } },
  },
};

export default meta;
type Story = StoryObj<typeof FilterBox>;

export const Default: Story = {
  args: {
    name: '통신사',
    isMultipleSelection: false,
    children: (
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <input
            type="radio"
            name="carrier"
            id="skt"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
          />
          <Image
            src="/icons/carriers/skt.svg"
            alt="SKT"
            width={24}
            height={24}
            className="w-6 h-6"
          />
          <label htmlFor="skt" className="text-white text-sm">
            SKT
          </label>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="radio"
            name="carrier"
            id="kt"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
          />
          <Image src="/icons/carriers/kt.svg" alt="KT" width={24} height={24} className="w-6 h-6" />
          <label htmlFor="kt" className="text-white text-sm">
            KT
          </label>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="radio"
            name="carrier"
            id="lgu"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
          />
          <Image
            src="/icons/carriers/lgu.svg"
            alt="LG U+"
            width={24}
            height={24}
            className="w-6 h-6"
          />
          <label htmlFor="lgu" className="text-white text-sm">
            LG U+
          </label>
        </div>
      </div>
    ),
  },
  decorators: [
    (Story) => (
      <div className="h-full flex flex-col bg-gray-900">
        <div className="px-4 pt-4">
          <Story />
        </div>
      </div>
    ),
  ],
};

export const MultipleSelection: Story = {
  args: {
    name: '용량',
    isMultipleSelection: true,
    children: (
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="1gb"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="1gb" className="text-white text-sm">
            1GB
          </label>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="5gb"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="5gb" className="text-white text-sm">
            5GB
          </label>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="10gb"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="10gb" className="text-white text-sm">
            10GB
          </label>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="20gb"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="20gb" className="text-white text-sm">
            20GB
          </label>
        </div>
      </div>
    ),
  },
  decorators: [
    (Story) => (
      <div className="h-full flex flex-col bg-gray-900">
        <div className="px-4 pt-4">
          <Story />
        </div>
      </div>
    ),
  ],
};

export const NetworkType: Story = {
  args: {
    name: '네트워크 타입',
    isMultipleSelection: false,
    children: (
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <input
            type="radio"
            name="network"
            id="4g"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
          />
          <label htmlFor="4g" className="text-white text-sm">
            4G
          </label>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="radio"
            name="network"
            id="5g"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
          />
          <label htmlFor="5g" className="text-white text-sm">
            5G
          </label>
        </div>
      </div>
    ),
  },
  decorators: [
    (Story) => (
      <div className="h-full flex flex-col bg-gray-900">
        <div className="px-4 pt-4">
          <Story />
        </div>
      </div>
    ),
  ],
};

export const PriceRange: Story = {
  args: {
    name: '가격 범위',
    isMultipleSelection: false,
    children: (
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <input
            type="radio"
            name="price"
            id="low"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
          />
          <label htmlFor="low" className="text-white text-sm">
            1,000 ZET 이하
          </label>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="radio"
            name="price"
            id="medium"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
          />
          <label htmlFor="medium" className="text-white text-sm">
            1,000 - 3,000 ZET
          </label>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="radio"
            name="price"
            id="high"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
          />
          <label htmlFor="high" className="text-white text-sm">
            3,000 ZET 이상
          </label>
        </div>
      </div>
    ),
  },
  decorators: [
    (Story) => (
      <div className="h-full flex flex-col bg-gray-900">
        <div className="px-4 pt-4">
          <Story />
        </div>
      </div>
    ),
  ],
};
