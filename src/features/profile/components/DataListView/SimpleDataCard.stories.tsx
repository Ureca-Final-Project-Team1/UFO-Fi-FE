import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Carrier } from '@/backend/types/carrier';
import { MobileDataType } from '@/backend/types/mobileData';
import type { TradePost } from '@/backend/types/profile';
import { ICON_PATHS } from '@/constants/icons';
import { Icon } from '@/shared';
import { formatTimeAgo } from '@/shared/utils';
import { getMobileDataTypeDisplay } from '@/shared/utils';

const createMockTradePost = (overrides?: Partial<TradePost>): TradePost => ({
  postId: 1,
  title: 'SKT 5G 데이터 판매',
  carrier: Carrier.SKT,
  mobileDataType: '_5G' as MobileDataType,
  sellMobileDataAmountGB: 10,
  totalZet: 5000,
  createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  ...overrides,
});

// Mock SimpleDataCard for Storybook
const MockSimpleDataCard = ({
  post = createMockTradePost(),
  sellerNickname = '우주탐험가',
}: {
  post?: TradePost;
  sellerNickname?: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const getCarrierIcon = (carrier: string) => {
    switch (carrier.toUpperCase()) {
      case 'SKT':
        return ICON_PATHS.SKT;
      case 'KT':
        return ICON_PATHS.KT;
      case 'LG U+':
      case 'LGU+':
      case 'LGU':
        return ICON_PATHS.LGU;
      default:
        return null;
    }
  };

  const handlePurchase = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // 구매 페이지로 이동
    }, 1000);
  };

  const carrierIcon = getCarrierIcon(post.carrier);
  const timeAgo = formatTimeAgo(post.createdAt);
  const networkType = getMobileDataTypeDisplay(post.mobileDataType);

  return (
    <div className="w-full bg-gray-900 p-4">
      <div className="max-w-md mx-auto">
        <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
          <h2 className="text-white text-base font-semibold mb-4">데이터 카드</h2>

          <div className="relative p-4 rounded-2xl border border-white/10 bg-gradient-to-br from-gray-800 to-gray-900">
            <div className="flex gap-4 items-center">
              {/* 아바타 */}
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                <Icon name="astronaut" className="w-8 h-8 text-purple-200" />
              </div>

              <div className="flex-1 flex flex-col gap-1">
                {/* 뱃지 */}
                <div className="flex items-center justify-between">
                  <div className="bg-gray-700 text-white text-xs px-2 py-1 rounded-full">
                    <div className="flex items-center gap-1">
                      {carrierIcon && (
                        <Icon src={carrierIcon} alt={post.carrier} className="size-4" />
                      )}
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
                  <span className="text-white text-xl font-bold">
                    {post.sellMobileDataAmountGB}GB
                  </span>
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
    viewport: {
      defaultViewport: 'mobile1',
    },
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
type Story = StoryObj<typeof MockSimpleDataCard>;

export const Default: Story = {
  args: {
    post: createMockTradePost(),
    sellerNickname: '우주탐험가',
  },
};

export const KTData: Story = {
  args: {
    post: createMockTradePost({
      postId: 2,
      title: 'KT LTE 데이터 판매',
      carrier: Carrier.KT,
      mobileDataType: 'LTE' as MobileDataType,
      sellMobileDataAmountGB: 5,
      totalZet: 2500,
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    }),
    sellerNickname: '데이터셀러',
  },
};

export const LGUData: Story = {
  args: {
    post: createMockTradePost({
      postId: 3,
      title: 'LGU 5G 데이터 판매',
      carrier: Carrier.LGU,
      mobileDataType: '_5G' as MobileDataType,
      sellMobileDataAmountGB: 20,
      totalZet: 10000,
      createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    }),
    sellerNickname: '프리미엄셀러',
  },
};

export const LargeData: Story = {
  args: {
    post: createMockTradePost({
      postId: 4,
      title: 'SKT 대용량 데이터 판매',
      carrier: Carrier.SKT,
      mobileDataType: '_5G' as MobileDataType,
      sellMobileDataAmountGB: 100,
      totalZet: 50000,
      createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    }),
    sellerNickname: '대용량전문가',
  },
};

export const Desktop: Story = {
  args: {
    post: createMockTradePost(),
    sellerNickname: '우주탐험가',
  },
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};
