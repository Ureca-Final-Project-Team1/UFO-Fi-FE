import type { Meta, StoryObj } from '@storybook/react';

// Mock TradeData for Storybook
const MockTradeData = ({
  tradePosts = [],
}: {
  tradePosts?: Array<{
    postId: string;
    title: string;
    carrier: string;
    sellMobileDataAmountGB: number;
    createdAt: string;
  }>;
}) => {
  const getCarrierIcon = (carrier: string) => {
    switch (carrier) {
      case 'SKT':
        return '🔴';
      case 'KT':
        return '🟠';
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

  return (
    <div className="space-y-4 bg-gray-900 p-6 rounded-lg">
      {/* 판매중인 데이터 */}
      <div className="text-center space-y-2">
        <h3 className="text-white font-semibold">판매중인 데이터</h3>
        {tradePosts.length > 0 ? (
          <div className="grid grid-cols-1 gap-2">
            {tradePosts.map((post) => (
              <div key={post.postId} className="bg-gray-800 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{getCarrierIcon(post.carrier)}</span>
                    <span className="text-white text-sm font-medium">{post.title}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-cyan-400 text-sm font-bold">
                      {post.sellMobileDataAmountGB}GB
                    </div>
                    <div className="text-gray-400 text-xs">{formatTimeAgo(post.createdAt)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-400 text-sm py-4">판매중인 데이터가 없습니다.</div>
        )}
      </div>
    </div>
  );
};

const meta: Meta<typeof MockTradeData> = {
  title: 'Profile/TradeData',
  component: MockTradeData,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    tradePosts: {
      control: { type: 'object' },
      description: '판매중인 데이터 목록',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tradePosts: [],
  },
};

export const WithTradePosts: Story = {
  args: {
    tradePosts: [
      {
        postId: '1',
        title: 'SKT 데이터 판매',
        carrier: 'SKT',
        sellMobileDataAmountGB: 10,
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2시간 전
      },
      {
        postId: '2',
        title: 'KT 데이터 판매',
        carrier: 'KT',
        sellMobileDataAmountGB: 5,
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1일 전
      },
    ],
  },
};

export const SingleTradePost: Story = {
  args: {
    tradePosts: [
      {
        postId: '1',
        title: 'LGU 데이터 판매',
        carrier: 'LGU',
        sellMobileDataAmountGB: 20,
        createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30분 전
      },
    ],
  },
};

export const MultipleTradePosts: Story = {
  args: {
    tradePosts: [
      {
        postId: '1',
        title: 'SKT 데이터 판매',
        carrier: 'SKT',
        sellMobileDataAmountGB: 10,
        createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1시간 전
      },
      {
        postId: '2',
        title: 'KT 데이터 판매',
        carrier: 'KT',
        sellMobileDataAmountGB: 5,
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2일 전
      },
      {
        postId: '3',
        title: 'LGU 데이터 판매',
        carrier: 'LGU',
        sellMobileDataAmountGB: 15,
        createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // 5분 전
      },
    ],
  },
};
