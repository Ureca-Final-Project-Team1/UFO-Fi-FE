import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

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
  tradePosts?: Array<{
    postId: number;
    carrier: string;
    mobileDataType: string;
    sellMobileDataAmountGB: number;
    totalZet: number;
    createdAt: string;
  }>;
  nickname?: string;
}) => {
  const [reportModal, setReportModal] = useState({ isOpen: false, postId: 0, sellerId: 0 });

  const handleReport = (postId: number, sellerId: number) => {
    setReportModal({ isOpen: true, postId, sellerId });
  };

  const handleCancelReport = () => {
    setReportModal({ isOpen: false, postId: 0, sellerId: 0 });
  };

  const formatPrice = (price: string) => {
    return parseInt(price).toLocaleString();
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-900 p-8">
        <div className="text-white">판매 데이터를 불러오는 중...</div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 bg-gray-900 p-8">
        <div className="text-white">판매 데이터를 불러올 수 없습니다.</div>
        <button className="text-cyan-400 underline">돌아가기</button>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full pb-6 bg-gray-900">
      {/* Title */}
      <div className="flex items-center gap-2 p-4 border-b border-gray-700">
        <button className="text-white">←</button>
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
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
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
                    <div className="text-gray-400 text-xs">{formatTimeAgo(post.createdAt)}</div>
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
  );
};

const meta: Meta<typeof MockDataListView> = {
  title: 'Profile/DataListView',
  component: MockDataListView,
  parameters: {
    layout: 'fullscreen',
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
type Story = StoryObj<typeof meta>;

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
      {
        postId: 1,
        carrier: 'SKT',
        mobileDataType: '5G',
        sellMobileDataAmountGB: 10,
        totalZet: 5000,
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2시간 전
      },
      {
        postId: 2,
        carrier: 'KT',
        mobileDataType: 'LTE',
        sellMobileDataAmountGB: 5,
        totalZet: 2500,
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1일 전
      },
      {
        postId: 3,
        carrier: 'LGU',
        mobileDataType: '5G',
        sellMobileDataAmountGB: 20,
        totalZet: 10000,
        createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30분 전
      },
    ],
    nickname: '우주탐험가',
  },
};
