import type { Meta, StoryObj } from '@storybook/react';

import SellingItem from './SellingItem';

const meta: Meta<typeof SellingItem> = {
  title: 'Exchange/SellingItem',
  component: SellingItem,
  parameters: {
    layout: 'padded',
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
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    carrier: 'SKT',
    networkType: '5G',
    capacity: '10GB',
    price: '1,500ZET',
    timeLeft: '2시간 전',
    title: 'SKT 5G 데이터 판매',
    sellerNickname: '데이터셀러',
    sellerId: 1,
    sellerProfileUrl: '/images/avatar.png',
  },
};

export const KT: Story = {
  args: {
    carrier: 'KT',
    networkType: '4G',
    capacity: '5GB',
    price: '800ZET',
    timeLeft: '1시간 전',
    title: 'KT 4G 데이터 판매',
    sellerNickname: 'KT유저',
    sellerId: 2,
    sellerProfileUrl: '/images/avatar.png',
  },
};

export const LGU: Story = {
  args: {
    carrier: 'LG U+',
    networkType: '5G',
    capacity: '20GB',
    price: '2,500ZET',
    timeLeft: '30분 전',
    title: 'LG U+ 5G 데이터 판매',
    sellerNickname: 'LG유저',
    sellerId: 3,
    sellerProfileUrl: '/images/avatar.png',
  },
};

export const Owner: Story = {
  args: {
    carrier: 'SKT',
    networkType: '5G',
    capacity: '15GB',
    price: '2,000ZET',
    timeLeft: '1시간 전',
    title: '내가 올린 게시물',
    sellerNickname: '내닉네임',
    sellerId: 1,
    sellerProfileUrl: '/images/avatar.png',
    isOwner: true,
  },
};

export const LargeCapacity: Story = {
  args: {
    carrier: 'SKT',
    networkType: '5G',
    capacity: '100GB',
    price: '10,000ZET',
    timeLeft: '5분 전',
    title: '대용량 데이터 판매',
    sellerNickname: '대용량셀러',
    sellerId: 4,
    sellerProfileUrl: '/images/avatar.png',
  },
};

export const LongTitle: Story = {
  args: {
    carrier: 'KT',
    networkType: '4G',
    capacity: '3GB',
    price: '500ZET',
    timeLeft: '10분 전',
    title: '매우 긴 제목의 데이터 판매 게시물입니다',
    sellerNickname: '긴제목셀러',
    sellerId: 5,
    sellerProfileUrl: '/images/avatar.png',
  },
};
