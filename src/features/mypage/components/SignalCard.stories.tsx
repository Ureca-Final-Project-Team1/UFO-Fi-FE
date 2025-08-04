import type { Meta, StoryObj } from '@storybook/react';
import Image from 'next/image';

import { Icon } from '@/shared';

import { Honorific } from '../types/Achievement';

// Mock SignalCard for Storybook (Next.js 의존성 제거)
const MockSignalCard = ({
  userId,
  profileImageUrl,
  zetAmount,
  availableData,
  maxData,
  honorifics,
}: {
  userId: string;
  profileImageUrl: string | undefined;
  zetAmount: number;
  availableData: number;
  maxData: number;
  honorifics: Honorific[];
}) => {
  const formatZetAmount = (amount: number): string => {
    if (amount >= 99999) {
      return '99,999+';
    }
    return amount.toLocaleString();
  };

  const formattedZet = formatZetAmount(zetAmount);
  const activeHonorific = honorifics.find((h) => h.isActive);

  return (
    <section
      className="rounded-xl shadow-lg border-[4px] w-full max-w-[620px] mx-auto"
      style={{
        borderColor: 'var(--chart-4)',
        backgroundColor: 'var(--color-background-card)',
      }}
      role="region"
      aria-labelledby="signal-card-title"
    >
      {/* 헤더 */}
      <header className="text-center py-2 px-2">
        <h2 id="signal-card-title" className="text-lg font-black text-gray-800">
          UPHONIAN SIGNAL CARD
        </h2>
        <p className="text-xs text-gray-600 opacity-60">EARTH-BASED FIELD IDENTIFICATION</p>
        <hr className="my-1 border-black/30" />
      </header>

      {/* 메인 컨텐츠 */}
      <div className="flex justify-between items-start px-2 sm:px-4 md:px-6 pb-3 gap-2 sm:gap-3 md:gap-4">
        {/* 왼쪽 프로필 */}
        <div className="flex flex-col items-center shrink-0">
          <div className="border w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-md overflow-hidden">
            {profileImageUrl ? (
              <Image
                src={profileImageUrl}
                alt="Profile"
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-300 flex items-center justify-center">👤</div>
            )}
          </div>

          {/* 칭호 */}
          <div className="mt-1 sm:mt-2">
            {activeHonorific ? (
              <div className="w-[4.5rem] sm:w-[5rem] px-2 py-0.5 rounded-md text-[10px] sm:text-xs text-white font-medium bg-purple-600 text-center">
                {activeHonorific.name}
              </div>
            ) : (
              <div className="w-[4.5rem] sm:w-[5rem] px-2 py-0.5 rounded-md text-[10px] sm:text-xs text-gray-500 bg-gray-100 font-medium border border-gray-200 text-center">
                신분 미확인
              </div>
            )}
          </div>
        </div>

        {/* 가운데 사용자 정보 */}
        <div className="flex-1 space-y-1 min-w-0 max-w-[180px] sm:max-w-none">
          <div className="flex justify-between items-start gap-2">
            <h3 className="text-base sm:text-lg font-bold text-black truncate flex-1">{userId}</h3>
          </div>

          <div className="text-xs font-bold text-gray-800">
            <span className="truncate">이번 달 판매 가능 용량</span>
          </div>

          {/* 프로그레스 바 */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full"
              style={{ width: `${(availableData / maxData) * 100}%` }}
            ></div>
          </div>
          <div className="text-xs text-gray-600">
            {availableData}/{maxData}GB
          </div>

          <hr className="border-black/30" />

          <div className="text-xs font-bold flex flex-col text-gray-800">
            <span>보유중인 ZET</span>
            <div className="flex justify-between items-center gap-1">
              <span className="text-base font-bold text-purple-600 truncate">
                {formattedZet} ZET
              </span>
              <button className="whitespace-nowrap text-xs rounded-md px-2 py-1 flex items-center justify-center bg-blue-500 text-white flex-shrink-0">
                충전
              </button>
            </div>
          </div>
        </div>

        {/* 오른쪽 QR & 액션 */}
        <div className="flex flex-col items-end gap-1 sm:gap-2 shrink-0">
          <button className="text-gray-800 text-xs h-6 px-1 py-1 whitespace-nowrap border border-gray-300 rounded">
            ✏️&nbsp;프로필 수정
          </button>

          {/* QR코드 */}
          <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-white border border-gray-300 rounded-lg flex items-center justify-center">
            <div className="text-xs text-gray-500">QR</div>
          </div>

          <div className="mt-1 sm:mt-2 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gray-300 rounded flex items-center justify-center">
            <div className="text-xs">💳</div>
          </div>
        </div>
      </div>
    </section>
  );
};

const meta: Meta<typeof MockSignalCard> = {
  title: 'Mypage/SignalCard',
  component: MockSignalCard,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MockSignalCard>;

export const Default: Story = {
  args: {
    userId: '지구인123',
    profileImageUrl: '/images/main/alien.svg',
    zetAmount: 1500,
    availableData: 5,
    maxData: 10,
    honorifics: [
      { name: '초보 탐험가', isActive: true },
      { name: '중급 탐험가', isActive: false },
      { name: '고급 탐험가', isActive: false },
    ] as Honorific[],
  },
  render: (args) => (
    <div className="w-full h-full flex flex-col bg-gray-900">
      <div className="px-4 pt-4">
        {/* 헤더 - Title 컴포넌트 대신 직접 구현 */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
              <Icon name="ChevronLeft" className="w-5 h-5 text-white" />
            </button>
            <h1 className="text-white text-lg font-bold">마이페이지</h1>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <MockSignalCard {...args} />
        </div>
      </div>
    </div>
  ),
};

export const WithHighZet: Story = {
  args: {
    userId: '부자지구인',
    profileImageUrl: '/images/main/alien.svg',
    zetAmount: 50000,
    availableData: 8,
    maxData: 10,
    honorifics: [
      { name: '고급 탐험가', isActive: true },
      { name: '전설의 탐험가', isActive: false },
    ] as Honorific[],
  },
  render: (args) => (
    <div className="w-full h-full flex flex-col bg-gray-900">
      <div className="px-4 pt-4">
        {/* 헤더 - Title 컴포넌트 대신 직접 구현 */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
              <Icon name="ChevronLeft" className="w-5 h-5 text-white" />
            </button>
            <h1 className="text-white text-lg font-bold">마이페이지</h1>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <MockSignalCard {...args} />
        </div>
      </div>
    </div>
  ),
};

export const Desktop: Story = {
  args: {
    userId: '데스크톱지구인',
    profileImageUrl: '/images/main/alien.svg',
    zetAmount: 2500,
    availableData: 7,
    maxData: 10,
    honorifics: [
      { name: '중급 탐험가', isActive: true },
      { name: '고급 탐험가', isActive: false },
    ] as Honorific[],
  },
  render: (args) => (
    <div className="w-full h-full flex flex-col bg-gray-900">
      <div className="px-4 pt-4 max-w-2xl mx-auto w-full">
        {/* 헤더 - Title 컴포넌트 대신 직접 구현 */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
              <Icon name="ChevronLeft" className="w-5 h-5 text-white" />
            </button>
            <h1 className="text-white text-lg font-bold">데스크톱 마이페이지</h1>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <MockSignalCard {...args} />
        </div>
      </div>
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};
