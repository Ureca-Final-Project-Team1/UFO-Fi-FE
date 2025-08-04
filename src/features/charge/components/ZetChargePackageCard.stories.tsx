import type { Meta, StoryObj } from '@storybook/react';

import { PACKAGES } from '@/constants';
import { Icon } from '@/shared';

import { ZetChargePackageCard } from './ZetChargePackageCard';

const meta: Meta<typeof ZetChargePackageCard> = {
  title: 'Charge/ZetChargePackageCard',
  component: ZetChargePackageCard,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    onBuyClick: { action: 'buy clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof ZetChargePackageCard>;

export const PackageA: Story = {
  args: {
    id: 'A',
    zet: 150,
    price: 1500,
  },
  render: (args) => (
    <div className="h-full flex flex-col bg-gray-900">
      <div className="px-4 pt-4">
        {/* 헤더 - Title 컴포넌트 대신 직접 구현 */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
              <Icon name="ChevronLeft" className="w-5 h-5 text-white" />
            </button>
            <h1 className="text-white text-lg font-bold">ZET 코인 충전소</h1>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <p className="body-16-medium text-white m-0">외계 전파 코인을 구매하세요!</p>
        </div>

        <div className="flex flex-col gap-3 mb-6">
          <ZetChargePackageCard {...args} />
        </div>
      </div>
    </div>
  ),
};

export const PackageB: Story = {
  args: {
    id: 'B',
    zet: 350,
    price: 3500,
  },
  render: (args) => (
    <div className="h-full flex flex-col bg-gray-900">
      <div className="px-4 pt-4">
        {/* 헤더 - Title 컴포넌트 대신 직접 구현 */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
              <Icon name="ChevronLeft" className="w-5 h-5 text-white" />
            </button>
            <h1 className="text-white text-lg font-bold">ZET 코인 충전소</h1>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <p className="body-16-medium text-white m-0">외계 전파 코인을 구매하세요!</p>
        </div>

        <div className="flex flex-col gap-3 mb-6">
          <ZetChargePackageCard {...args} />
        </div>
      </div>
    </div>
  ),
};

export const PackageC: Story = {
  args: {
    id: 'C',
    zet: 500,
    price: 5000,
  },
  render: (args) => (
    <div className="h-full flex flex-col bg-gray-900">
      <div className="px-4 pt-4">
        {/* 헤더 - Title 컴포넌트 대신 직접 구현 */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
              <Icon name="ChevronLeft" className="w-5 h-5 text-white" />
            </button>
            <h1 className="text-white text-lg font-bold">ZET 코인 충전소</h1>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <p className="body-16-medium text-white m-0">외계 전파 코인을 구매하세요!</p>
        </div>

        <div className="flex flex-col gap-3 mb-6">
          <ZetChargePackageCard {...args} />
        </div>
      </div>
    </div>
  ),
};

export const PackageD: Story = {
  args: {
    id: 'D',
    zet: 1000,
    price: 10000,
  },
  render: (args) => (
    <div className="h-full flex flex-col bg-gray-900">
      <div className="px-4 pt-4">
        {/* 헤더 - Title 컴포넌트 대신 직접 구현 */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
              <Icon name="ChevronLeft" className="w-5 h-5 text-white" />
            </button>
            <h1 className="text-white text-lg font-bold">ZET 코인 충전소</h1>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <p className="body-16-medium text-white m-0">외계 전파 코인을 구매하세요!</p>
        </div>

        <div className="flex flex-col gap-3 mb-6">
          <ZetChargePackageCard {...args} />
        </div>
      </div>
    </div>
  ),
};

export const PackageE: Story = {
  args: {
    id: 'E',
    zet: 3000,
    price: 30000,
  },
  render: (args) => (
    <div className="h-full flex flex-col bg-gray-900">
      <div className="px-4 pt-4">
        {/* 헤더 - Title 컴포넌트 대신 직접 구현 */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
              <Icon name="ChevronLeft" className="w-5 h-5 text-white" />
            </button>
            <h1 className="text-white text-lg font-bold">ZET 코인 충전소</h1>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <p className="body-16-medium text-white m-0">외계 전파 코인을 구매하세요!</p>
        </div>

        <div className="flex flex-col gap-3 mb-6">
          <ZetChargePackageCard {...args} />
        </div>
      </div>
    </div>
  ),
};

export const AllPackages: Story = {
  render: () => (
    <div className="h-full flex flex-col bg-gray-900">
      <div className="px-4 pt-4">
        {/* 헤더 - Title 컴포넌트 대신 직접 구현 */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
              <Icon name="ChevronLeft" className="w-5 h-5 text-white" />
            </button>
            <h1 className="text-white text-lg font-bold">ZET 코인 충전소</h1>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <p className="body-16-medium text-white m-0">외계 전파 코인을 구매하세요!</p>
        </div>

        <div className="flex flex-col gap-3 mb-6">
          {PACKAGES.map((pkg) => (
            <ZetChargePackageCard
              key={pkg.id}
              id={pkg.id}
              zet={pkg.zet}
              price={pkg.price}
              onBuyClick={() => {}}
            />
          ))}
        </div>
      </div>
    </div>
  ),
};

export const Desktop: Story = {
  render: () => (
    <div className="h-full flex flex-col bg-gray-900">
      <div className="px-4 pt-4 max-w-md mx-auto w-full">
        {/* 헤더 - Title 컴포넌트 대신 직접 구현 */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
              <Icon name="ChevronLeft" className="w-5 h-5 text-white" />
            </button>
            <h1 className="text-white text-lg font-bold">ZET 코인 충전소</h1>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <p className="body-16-medium text-white m-0">외계 전파 코인을 구매하세요!</p>
        </div>

        <div className="flex flex-col gap-3 mb-6">
          {PACKAGES.map((pkg) => (
            <ZetChargePackageCard
              key={pkg.id}
              id={pkg.id}
              zet={pkg.zet}
              price={pkg.price}
              onBuyClick={() => {}}
            />
          ))}
        </div>
      </div>
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};
