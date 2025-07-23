import type { Meta, StoryObj } from '@storybook/react';

import { Carrier } from '@/api/types/carrier';
import type { ProfileUser } from '@/api/types/profile';

// Mock 데이터
const mockProfile: ProfileUser = {
  userId: 308,
  nickname: '신나는 지구인 #308',
  profileImageUrl:
    'https://ufo-fi-service-bucket.s3.ap-northeast-2.amazonaws.com/profile-image/profile-8.png',
  followerCount: 21,
  followingCount: 6,
  tradePostsRes: [
    {
      postId: 1,
      mobileDataType: '_5G',
      carrier: Carrier.LGU,
      sellMobileDataAmountGB: 5,
      title: '5GX 프리미엄 팝니다',
      createdAt: '2025-07-16T08:28:37',
    },
    {
      postId: 2,
      mobileDataType: '_5G',
      carrier: Carrier.KT,
      sellMobileDataAmountGB: 3,
      title: '요고 다이렉트 요고 38',
      createdAt: '2025-07-15T14:20:00',
    },
    {
      postId: 3,
      mobileDataType: 'LTE',
      carrier: Carrier.SKT,
      sellMobileDataAmountGB: 7,
      title: '데이터 쉐어링 플랜',
      createdAt: '2025-07-14T10:15:30',
    },
  ],
};

const myProfile: ProfileUser = {
  ...mockProfile,
  userId: 1,
  nickname: '내 프로필',
};

const followingProfile: ProfileUser = {
  ...mockProfile,
  userId: 999,
  nickname: '팔로우중인 지구인',
};

const emptyProfile: ProfileUser = {
  ...mockProfile,
  userId: 500,
  nickname: '데이터없는 지구인',
  tradePostsRes: [],
};

const MockProfileView = ({ userId }: { userId: number }) => {
  let profile: ProfileUser;

  switch (userId) {
    case 1:
      profile = myProfile;
      break;
    case 999:
      profile = followingProfile;
      break;
    case 500:
      profile = emptyProfile;
      break;
    default:
      profile = mockProfile;
  }

  return (
    <div className="flex flex-col min-h-full w-full pb-6">
      {/* Title 대신 간단한 헤더 */}
      <div className="flex items-center p-4 border-b border-white/10">
        <button className="text-white mr-4">←</button>
        <h1 className="text-white text-lg font-bold">{profile.nickname}의 프로필</h1>
      </div>

      {/* ProfileView의 내용을 직접 렌더링 */}
      <div className="space-y-6 px-4">
        {/* ProfileHeader Mock */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-purple-200 rounded-full flex items-center justify-center">
              {profile.profileImageUrl ? (
                <img
                  src={profile.profileImageUrl}
                  alt={profile.nickname}
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <span>👽</span>
              )}
            </div>

            <div className="flex flex-col">
              <h1 className="text-white text-xl font-bold">{profile.nickname}</h1>
              <span className="text-gray-400 text-sm">지구인 #{profile.userId}</span>
            </div>
          </div>
        </div>

        {/* ProfileStats Mock */}
        <div className="flex justify-center gap-8">
          <div className="text-center">
            <div className="text-white text-lg font-bold">팔로워 {profile.followerCount}명</div>
          </div>
          <div className="text-center">
            <div className="text-white text-lg font-bold">팔로잉 {profile.followingCount}명</div>
          </div>
        </div>

        {/* ProfileContentSections Mock */}
        <div className="space-y-6">
          {/* 거래 현황 */}
          <div className="space-y-3">
            <h3 className="text-white font-semibold text-lg">거래 현황</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-300 text-sm">7일 평균 거래량</span>
                <span className="text-white text-sm font-medium">2건</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300 text-sm">7일 평균 거래 시간</span>
                <div className="flex items-center gap-1">
                  <span className="text-white text-sm font-medium">낮</span>
                  <span className="text-lg">☀️</span>
                </div>
              </div>
            </div>
          </div>

          {/* 구분선 */}
          <div className="w-full h-px bg-white opacity-20"></div>

          {/* 보유 업적 */}
          <div className="space-y-3">
            <h3 className="text-white font-semibold text-lg">보유 업적</h3>
            <div className="text-center text-gray-400 py-4">보유한 업적이 없습니다.</div>
          </div>

          {/* 구분선 */}
          <div className="w-full h-px bg-white opacity-20"></div>

          {/* 판매중인 데이터 */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="text-white font-semibold text-lg">판매중인 데이터</h3>
              {profile.tradePostsRes.length > 0 && (
                <button className="text-cyan-400 text-sm hover:text-cyan-300 transition-colors">
                  자세히 보기
                </button>
              )}
            </div>

            {profile.tradePostsRes.length > 0 ? (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {profile.tradePostsRes.map((post) => (
                  <div
                    key={post.postId}
                    className="bg-gray-800 rounded-lg p-4 w-24 h-24 flex flex-col items-center justify-center space-y-2 flex-shrink-0"
                  >
                    <div className="w-6 h-6 bg-red-500 rounded"></div>
                    <div className="text-cyan-400 text-xs font-bold text-center">
                      {post.sellMobileDataAmountGB}GB
                    </div>
                    <div className="text-gray-400 text-xs">250ZET</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-400 py-4">판매중인 데이터가 없습니다.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const meta: Meta<typeof MockProfileView> = {
  title: 'Components/Profile/ProfileView',
  component: MockProfileView,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '사용자 프로필 전체 뷰 컴포넌트입니다.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-gray-800">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    userId: {
      control: 'number',
      description: '조회할 사용자 ID',
    },
  },
};

export default meta;
type Story = StoryObj<typeof MockProfileView>;

export const Default: Story = {
  args: {
    userId: 308,
  },
};

export const MyProfile: Story = {
  args: {
    userId: 1,
  },
  parameters: {
    docs: {
      description: {
        story: '내 프로필을 표시할 때는 공유 버튼이 나타납니다.',
      },
    },
  },
};

export const FollowingUser: Story = {
  args: {
    userId: 999,
  },
  parameters: {
    docs: {
      description: {
        story: '이미 팔로우한 사용자의 프로필입니다.',
      },
    },
  },
};

export const EmptyData: Story = {
  args: {
    userId: 500,
  },
  parameters: {
    docs: {
      description: {
        story: '판매 데이터가 없는 사용자의 프로필입니다.',
      },
    },
  },
};
