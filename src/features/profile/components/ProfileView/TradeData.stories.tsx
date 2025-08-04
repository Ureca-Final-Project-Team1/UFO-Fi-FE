import type { Meta, StoryObj } from '@storybook/react';

import { Carrier } from '@/backend/types/carrier';
import { MobileDataType } from '@/backend/types/mobileData';
import type { ProfileUser } from '@/backend/types/profile';
import { ICON_PATHS } from '@/constants/icons';
import { Icon } from '@/shared';
import { formatTimeAgo } from '@/shared/utils/formatTimeAgo';

const createMockProfile = (overrides?: Partial<ProfileUser>): ProfileUser => ({
  userId: 308,
  nickname: '신나는 지구인 #308',
  profileImageUrl: '',
  followerCount: 21,
  followingCount: 6,
  tradePostsRes: [
    {
      postId: 1,
      mobileDataType: '_5G' as MobileDataType,
      carrier: Carrier.LGU,
      sellMobileDataAmountGB: 5,
      totalZet: 250,
      title: '5GX 프리미엄 팝니다',
      createdAt: '2025-07-16T08:28:37',
    },
    {
      postId: 2,
      mobileDataType: '_5G' as MobileDataType,
      carrier: Carrier.KT,
      sellMobileDataAmountGB: 3,
      totalZet: 150,
      title: '요고 다이렉트 요고 38',
      createdAt: '2025-07-15T14:20:00',
    },
    {
      postId: 3,
      mobileDataType: 'LTE' as MobileDataType,
      carrier: Carrier.SKT,
      sellMobileDataAmountGB: 7,
      totalZet: 350,
      title: '데이터 쉐어링 플랜',
      createdAt: '2025-07-14T10:15:30',
    },
  ],
  ...overrides,
});

// Mock TradeData for Storybook
const MockTradeData = ({ profile = createMockProfile() }: { profile?: ProfileUser }) => {
  return (
    <div className="w-full bg-gray-900 p-4">
      <div className="max-w-md mx-auto">
        <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
          <h2 className="text-white text-base font-semibold mb-4">거래 데이터</h2>

          <div className="space-y-4">
            {/* 판매중인 데이터 */}
            <div className="text-center space-y-2">
              <h3 className="text-white font-semibold">판매중인 데이터</h3>
              {profile.tradePostsRes.length > 0 ? (
                <div className="grid grid-cols-1 gap-2">
                  {profile.tradePostsRes.map((post) => (
                    <div key={post.postId} className="bg-gray-800 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Icon src={ICON_PATHS[post.carrier]} className="size-4" />
                          <span className="text-white text-sm font-medium">{post.title}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-cyan-400 text-sm font-bold">
                            {post.sellMobileDataAmountGB}GB
                          </div>
                          <div className="text-gray-400 text-xs">
                            {formatTimeAgo(post.createdAt)}
                          </div>
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
        </div>
      </div>
    </div>
  );
};

const meta: Meta<typeof MockTradeData> = {
  title: 'Profile/TradeData',
  component: MockTradeData,
  parameters: {
    layout: 'padded',
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    profile: {
      control: { type: 'object' },
      description: '프로필 정보',
    },
  },
};

export default meta;
type Story = StoryObj<typeof MockTradeData>;

export const Default: Story = {
  args: {
    profile: createMockProfile(),
  },
};

export const EmptyTradePosts: Story = {
  args: {
    profile: createMockProfile({ tradePostsRes: [] }),
  },
};

export const SingleTradePost: Story = {
  args: {
    profile: createMockProfile({
      tradePostsRes: [
        {
          postId: 1,
          mobileDataType: 'LTE' as MobileDataType,
          carrier: Carrier.LGU,
          sellMobileDataAmountGB: 20,
          totalZet: 1000,
          title: 'LGU 데이터 판매',
          createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30분 전
        },
      ],
    }),
  },
};

export const MultipleTradePosts: Story = {
  args: {
    profile: createMockProfile({
      tradePostsRes: [
        {
          postId: 1,
          mobileDataType: '_5G' as MobileDataType,
          carrier: Carrier.SKT,
          sellMobileDataAmountGB: 10,
          totalZet: 500,
          title: 'SKT 데이터 판매',
          createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1시간 전
        },
        {
          postId: 2,
          mobileDataType: '_5G' as MobileDataType,
          carrier: Carrier.KT,
          sellMobileDataAmountGB: 5,
          totalZet: 250,
          title: 'KT 데이터 판매',
          createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2일 전
        },
        {
          postId: 3,
          mobileDataType: 'LTE' as MobileDataType,
          carrier: Carrier.LGU,
          sellMobileDataAmountGB: 15,
          totalZet: 750,
          title: 'LGU 데이터 판매',
          createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // 5분 전
        },
      ],
    }),
  },
};

export const Desktop: Story = {
  args: {
    profile: createMockProfile(),
  },
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};
