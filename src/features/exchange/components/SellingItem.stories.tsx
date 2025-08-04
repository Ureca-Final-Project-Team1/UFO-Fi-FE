import type { Meta, StoryObj } from '@storybook/react';

import SellingItem from './SellingItem';

const meta: Meta<typeof SellingItem> = {
  title: 'Exchange/SellingItem',
  component: SellingItem,
  parameters: { layout: 'padded' },
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
    carrier: 'SKT',
    networkType: '5G',
    capacity: '10GB',
    price: '1,500ZET',
    timeLeft: '2시간 전',
    sellerNickname: '데이터셀러',
    sellerId: 1,
    sellerProfileUrl: '/images/avatar.svg',
    isOwner: false,
  },
};

export const KT: Story = {
  args: {
    title: 'KT 4G 데이터 판매',
    carrier: 'KT',
    networkType: '4G',
    capacity: '5GB',
    price: '800ZET',
    timeLeft: '1시간 전',
    sellerNickname: 'KT유저',
    sellerId: 2,
    sellerProfileUrl: '/images/avatar.svg',
    isOwner: false,
  },
};

export const LGU: Story = {
  args: {
    title: 'LG U+ 5G 데이터 판매',
    carrier: 'LG U+',
    networkType: '5G',
    capacity: '20GB',
    price: '2,500ZET',
    timeLeft: '30분 전',
    sellerNickname: 'LG유저',
    sellerId: 3,
    sellerProfileUrl: '/images/avatar.svg',
    isOwner: false,
  },
};

export const Owner: Story = {
  args: {
    title: '내가 올린 데이터',
    carrier: 'SKT',
    networkType: '5G',
    capacity: '15GB',
    price: '2,000ZET',
    timeLeft: '5분 전',
    sellerNickname: '내닉네임',
    sellerId: 4,
    sellerProfileUrl: '/images/avatar.svg',
    isOwner: true,
  },
};

export const LongTitle: Story = {
  args: {
    title: '매우 긴 제목의 데이터 판매 게시글입니다. 이렇게 길어질 수 있습니다.',
    carrier: 'KT',
    networkType: '4G',
    capacity: '8GB',
    price: '1,200ZET',
    timeLeft: '10분 전',
    sellerNickname: '긴닉네임사용자',
    sellerId: 5,
    sellerProfileUrl: '/images/avatar.svg',
    isOwner: false,
  },
};
