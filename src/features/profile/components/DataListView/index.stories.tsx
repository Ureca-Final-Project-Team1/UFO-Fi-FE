import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Carrier } from '@/backend/types/carrier';
import { MobileDataType } from '@/backend/types/mobileData';
import type { TradePost } from '@/backend/types/profile';
import { Icon } from '@/shared';
import { formatPrice, formatTimeAgo, getMobileDataTypeDisplay } from '@/shared/utils';

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

// Mock DataListView for Storybook
const MockDataListView = ({
  userId = 12345,
  isLoading = false,
  hasError = false,
  tradePosts = [],
  nickname = '우주탐험가',
}: {
  userId?: number;
  isLoading?: boolean;
  hasError?: boolean;
  tradePosts?: TradePost[];
  nickname?: string;
}) => {
  const [reportModal, setReportModal] = useState({ isOpen: false, postId: 0, sellerId: 0 });

  const handleReport = (postId: number, sellerId: number) => {
    setReportModal({ isOpen: true, postId, sellerId });
  };

  const handleCancelReport = () => {
    setReportModal({ isOpen: false, postId: 0, sellerId: 0 });
  };

  if (isLoading) {
    return (
      <div className="w-full bg-gray-900 p-4">
        <div className="max-w-md mx-auto">
          <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
            <h2 className="text-white text-base font-semibold mb-4">데이터 리스트 뷰</h2>
            <div className="flex items-center justify-center h-32">
              <div className="text-white">판매 데이터를 불러오는 중...</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="w-full bg-gray-900 p-4">
        <div className="max-w-md mx-auto">
          <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
            <h2 className="text-white text-base font-semibold mb-4">데이터 리스트 뷰</h2>
            <div className="flex flex-col items-center justify-center h-32 gap-4">
              <div className="text-white">판매 데이터를 불러올 수 없습니다.</div>
              <button className="text-cyan-400 underline">돌아가기</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-900 p-4">
      <div className="max-w-md mx-auto">
        <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
          <h2 className="text-white text-base font-semibold mb-4">데이터 리스트 뷰</h2>

          <div className="flex flex-col w-full pb-6">
            {/* Title */}
            <div className="flex items-center gap-2 p-4 border-b border-gray-700">
              <button className="text-white">
                <Icon name="ChevronLeft" className="w-5 h-5" />
              </button>
              <h1 className="text-white font-semibold">판매중인 데이터 목록</h1>
            </div>

            <div className="px-4 space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-white font-semibold text-lg">
                    판매중인 데이터 <span className="text-cyan-400">{tradePosts.length}</span>건
                  </h3>
                </div>

                {tradePosts.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 justify-center">
                    {tradePosts
                      .sort(
                        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
                      )
                      .map((post) => (
                        <div key={post.postId} className="bg-gray-800 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm text-gray-400">
                              {getMobileDataTypeDisplay(post.mobileDataType)}
                            </span>
                            <span className="text-cyan-400 text-sm font-bold">
                              {post.sellMobileDataAmountGB}GB
                            </span>
                          </div>
                          <div className="text-white text-sm mb-2">{nickname}</div>
                          <div className="text-yellow-400 text-sm font-bold mb-2">
                            {formatPrice(String(post.totalZet))}ZET
                          </div>
                          <div className="text-gray-400 text-xs">
                            {formatTimeAgo(post.createdAt)}
                          </div>
                          <div className="flex gap-2 mt-2">
                            <button className="flex-1 bg-blue-500 text-white text-xs py-1 rounded">
                              구매
                            </button>
                            <button
                              onClick={() => handleReport(post.postId, userId)}
                              className="flex-1 bg-red-500 text-white text-xs py-1 rounded"
                            >
                              신고
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="text-center text-gray-400 py-12">
                    <div className="text-lg mb-2">📱</div>
                    <div>판매중인 데이터가 없습니다.</div>
                  </div>
                )}
              </div>
            </div>

            {/* Report Modal */}
            {reportModal.isOpen && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-gray-800 rounded-lg p-6 max-w-sm w-full mx-4">
                  <h3 className="text-white font-semibold mb-4">신고하기</h3>
                  <p className="text-gray-300 mb-4">
                    게시물 ID: {reportModal.postId}를 신고하시겠습니까?
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={handleCancelReport}
                      className="flex-1 bg-gray-600 text-white py-2 rounded"
                    >
                      취소
                    </button>
                    <button
                      onClick={handleCancelReport}
                      className="flex-1 bg-red-500 text-white py-2 rounded"
                    >
                      신고
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const meta: Meta<typeof MockDataListView> = {
  title: 'Profile/DataListView',
  component: MockDataListView,
  parameters: {
    layout: 'padded',
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    userId: {
      control: { type: 'number' },
      description: '사용자 ID',
    },
    isLoading: {
      control: { type: 'boolean' },
      description: '로딩 상태',
    },
    hasError: {
      control: { type: 'boolean' },
      description: '에러 상태',
    },
    tradePosts: {
      control: { type: 'object' },
      description: '판매중인 데이터 목록',
    },
    nickname: {
      control: { type: 'text' },
      description: '사용자 닉네임',
    },
  },
};

export default meta;
type Story = StoryObj<typeof MockDataListView>;

export const Default: Story = {
  args: {
    userId: 12345,
    isLoading: false,
    hasError: false,
    tradePosts: [],
    nickname: '우주탐험가',
  },
};

export const Loading: Story = {
  args: {
    userId: 12345,
    isLoading: true,
    hasError: false,
    tradePosts: [],
    nickname: '우주탐험가',
  },
};

export const Error: Story = {
  args: {
    userId: 12345,
    isLoading: false,
    hasError: true,
    tradePosts: [],
    nickname: '우주탐험가',
  },
};

export const WithTradePosts: Story = {
  args: {
    userId: 12345,
    isLoading: false,
    hasError: false,
    tradePosts: [
      createMockTradePost({
        postId: 1,
        carrier: Carrier.SKT,
        mobileDataType: '_5G' as MobileDataType,
        sellMobileDataAmountGB: 10,
        totalZet: 5000,
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      }),
      createMockTradePost({
        postId: 2,
        carrier: Carrier.KT,
        mobileDataType: 'LTE' as MobileDataType,
        sellMobileDataAmountGB: 5,
        totalZet: 2500,
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      }),
      createMockTradePost({
        postId: 3,
        carrier: Carrier.LGU,
        mobileDataType: '_5G' as MobileDataType,
        sellMobileDataAmountGB: 20,
        totalZet: 10000,
        createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      }),
    ],
    nickname: '우주탐험가',
  },
};

export const Desktop: Story = {
  args: {
    userId: 12345,
    isLoading: false,
    hasError: false,
    tradePosts: [
      createMockTradePost(),
      createMockTradePost({
        postId: 2,
        carrier: Carrier.KT,
        mobileDataType: 'LTE' as MobileDataType,
        sellMobileDataAmountGB: 5,
        totalZet: 2500,
      }),
    ],
    nickname: '우주탐험가',
  },
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};
