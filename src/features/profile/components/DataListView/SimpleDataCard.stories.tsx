import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

// Mock SimpleDataCard for Storybook
const MockSimpleDataCard = ({
  post = {
    postId: 1,
    title: 'SKT 5G 데이터 판매',
    carrier: 'SKT',
    mobileDataType: '5G',
    sellMobileDataAmountGB: 10,
    totalZet: 5000,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  sellerNickname = '우주탐험가',
}: {
  post?: {
    postId: number;
    title: string;
    carrier: string;
    mobileDataType: string;
    sellMobileDataAmountGB: number;
    totalZet: number;
    createdAt: string;
  };
  sellerNickname?: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const getCarrierIcon = (carrier: string) => {
    switch (carrier.toUpperCase()) {
      case 'SKT':
        return '🔴';
      case 'KT':
        return '🟠';
      case 'LG U+':
      case 'LGU+':
      case 'LGU':
        return '🔵';
      default:
        return '📱';
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) return '방금 전';
    if (diffInHours < 24) return `${diffInHours}시간 전`;
    return `${Math.floor(diffInHours / 24)}일 전`;
  };

  const getMobileDataTypeDisplay = (type: string) => {
    switch (type) {
      case 'LTE':
        return 'LTE';
      case '5G':
        return '5G';
      default:
        return '4G';
    }
  };

  const handlePurchase = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log('구매 페이지로 이동');
    }, 1000);
  };

  const carrierIcon = getCarrierIcon(post.carrier);
  const timeAgo = formatTimeAgo(post.createdAt);
  const networkType = getMobileDataTypeDisplay(post.mobileDataType);

  return (
    <div className="relative p-4 rounded-2xl border border-white/10 bg-gradient-to-br from-gray-800 to-gray-900">
      <div className="flex gap-4 items-center">
        {/* 아바타 */}
        <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
          <span className="text-2xl">👨‍🚀</span>
        </div>

        <div className="flex-1 flex flex-col gap-1">
          {/* 뱃지 */}
          <div className="flex items-center justify-between">
            <div className="bg-gray-700 text-white text-xs px-2 py-1 rounded-full">
              <div className="flex items-center gap-1">
                <span>{carrierIcon}</span>
                <span>{`${post.carrier} ${networkType}`}</span>
              </div>
            </div>
          </div>

          {/* 제목 */}
          <span className="text-white text-xl font-bold truncate" title={post.title}>
            {post.title}
          </span>

          {/* 용량 + 가격 */}
          <div className="flex gap-2 items-baseline">
            <span className="text-white text-xl font-bold">{post.sellMobileDataAmountGB}GB</span>
            <span className="text-yellow-400 text-sm font-bold">
              {post.totalZet.toLocaleString()}ZET
            </span>
          </div>

          {/* 판매자 닉네임 */}
          <span className="text-gray-300 text-xs">by {sellerNickname}</span>

          {/* 시간 + 구매 버튼 */}
          <div className="flex justify-between items-center">
            <span className="text-gray-300 text-sm">{timeAgo}</span>
            <button
              onClick={handlePurchase}
              disabled={isLoading}
              className="bg-blue-500 text-white text-sm px-4 py-2 rounded shadow-lg disabled:opacity-50"
            >
              {isLoading ? '이동 중...' : '구매하기'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const meta: Meta<typeof MockSimpleDataCard> = {
  title: 'Profile/SimpleDataCard',
  component: MockSimpleDataCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    post: {
      control: { type: 'object' },
      description: '판매 게시물 정보',
    },
    sellerNickname: {
      control: { type: 'text' },
      description: '판매자 닉네임',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    post: {
      postId: 1,
      title: 'SKT 5G 데이터 판매',
      carrier: 'SKT',
      mobileDataType: '5G',
      sellMobileDataAmountGB: 10,
      totalZet: 5000,
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    },
    sellerNickname: '우주탐험가',
  },
};

export const KTData: Story = {
  args: {
    post: {
      postId: 2,
      title: 'KT LTE 데이터 판매',
      carrier: 'KT',
      mobileDataType: 'LTE',
      sellMobileDataAmountGB: 5,
      totalZet: 2500,
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    },
    sellerNickname: '데이터셀러',
  },
};

export const LGUData: Story = {
  args: {
    post: {
      postId: 3,
      title: 'LGU 5G 데이터 판매',
      carrier: 'LGU',
      mobileDataType: '5G',
      sellMobileDataAmountGB: 20,
      totalZet: 10000,
      createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    },
    sellerNickname: '프리미엄셀러',
  },
};

export const LargeData: Story = {
  args: {
    post: {
      postId: 4,
      title: 'SKT 대용량 데이터 판매',
      carrier: 'SKT',
      mobileDataType: '5G',
      sellMobileDataAmountGB: 100,
      totalZet: 50000,
      createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    },
    sellerNickname: '대용량전문가',
  },
};
