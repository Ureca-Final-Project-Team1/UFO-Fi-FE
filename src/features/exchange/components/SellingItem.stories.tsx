import type { Meta, StoryObj } from '@storybook/react';

import { Carrier } from '@/backend/types/carrier';

import SellingItem from './SellingItem';

const meta: Meta<typeof SellingItem> = {
  title: 'Exchange/SellingItem',
  component: SellingItem,
  parameters: {
    layout: 'padded',
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    onEdit: { action: 'edit clicked' },
    onDelete: { action: 'delete clicked' },
    onReport: { action: 'report clicked' },
    onPurchase: { action: 'purchase clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof SellingItem>;

export const Default: Story = {
  args: {
    title: 'SKT 5G 데이터 판매',
    carrier: Carrier.SKT,
    networkType: '5G',
    capacity: '10GB',
    price: '1,500ZET',
    timeLeft: '2시간 전',
    sellerNickname: '데이터셀러',
    sellerId: 1,
    sellerProfileUrl: '/images/main/alien.svg',
    isOwner: false,
  },
  decorators: [
    (Story) => (
      <div className="h-full flex flex-col bg-gray-900">
        <div className="px-4 pt-4">
          <div className="grid grid-cols-2 gap-4 justify-center">
            <div className="flex justify-center">
              <Story />
            </div>
          </div>
        </div>
      </div>
    ),
  ],
};

export const KT: Story = {
  args: {
    title: 'KT 4G 데이터 판매',
    carrier: Carrier.KT,
    networkType: '4G',
    capacity: '5GB',
    price: '800ZET',
    timeLeft: '1시간 전',
    sellerNickname: 'KT유저',
    sellerId: 2,
    sellerProfileUrl: '/images/main/alien.svg',
    isOwner: false,
  },
  decorators: [
    (Story) => (
      <div className="h-full flex flex-col bg-gray-900">
        <div className="px-4 pt-4">
          <div className="grid grid-cols-2 gap-4 justify-center">
            <div className="flex justify-center">
              <Story />
            </div>
          </div>
        </div>
      </div>
    ),
  ],
};

export const LGU: Story = {
  args: {
    title: 'LG U+ 5G 데이터 판매',
    carrier: Carrier.LGU,
    networkType: '5G',
    capacity: '20GB',
    price: '2,500ZET',
    timeLeft: '30분 전',
    sellerNickname: 'LG유저',
    sellerId: 3,
    sellerProfileUrl: '/images/main/alien.svg',
    isOwner: false,
  },
  decorators: [
    (Story) => (
      <div className="h-full flex flex-col bg-gray-900">
        <div className="px-4 pt-4">
          <div className="grid grid-cols-2 gap-4 justify-center">
            <div className="flex justify-center">
              <Story />
            </div>
          </div>
        </div>
      </div>
    ),
  ],
};

export const Owner: Story = {
  args: {
    title: '내가 올린 데이터',
    carrier: Carrier.SKT,
    networkType: '5G',
    capacity: '15GB',
    price: '2,000ZET',
    timeLeft: '5분 전',
    sellerNickname: '내닉네임',
    sellerId: 4,
    sellerProfileUrl: '/images/main/alien.svg',
    isOwner: true,
  },
  decorators: [
    (Story) => (
      <div className="h-full flex flex-col bg-gray-900">
        <div className="px-4 pt-4">
          <div className="grid grid-cols-2 gap-4 justify-center">
            <div className="flex justify-center">
              <Story />
            </div>
          </div>
        </div>
      </div>
    ),
  ],
};

export const LongTitle: Story = {
  args: {
    title: '매우 긴 제목의 데이터 판매 게시글입니다. 이렇게 길어질 수 있습니다.',
    carrier: Carrier.KT,
    networkType: '4G',
    capacity: '8GB',
    price: '1,200ZET',
    timeLeft: '10분 전',
    sellerNickname: '긴닉네임사용자',
    sellerId: 5,
    sellerProfileUrl: '/images/main/alien.svg',
    isOwner: false,
  },
  decorators: [
    (Story) => (
      <div className="h-full flex flex-col bg-gray-900">
        <div className="px-4 pt-4">
          <div className="grid grid-cols-2 gap-4 justify-center">
            <div className="flex justify-center">
              <Story />
            </div>
          </div>
        </div>
      </div>
    ),
  ],
};
