import type { Meta, StoryObj } from '@storybook/react';
import Image from 'next/image';

// Mock ExchangeHeader for Storybook (실제 ExchangeHeader와 동일한 구조)
const MockExchangeHeader = () => {
  return (
    <div className="w-full">
      {/* 데스크톱/태블릿 레이아웃 */}
      <div className="hidden md:flex relative w-full gap-4 items-start shadow-lg p-4">
        {/* 캐릭터 섹션 */}
        <div className="flex flex-col gap-2 items-center flex-shrink-0">
          {/* SpeechBubble - 실제 SpeechBubble과 동일한 구조 */}
          <div className="relative bg-blue-500 text-white p-3 rounded-lg text-sm">
            조건에 맞는 상품을 원하시면 필터링 기능을 이용해보세요!
            {/* bottom tail */}
            <div className="absolute left-1/2 top-full -translate-x-1/2">
              <div className="size-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-blue-500"></div>
            </div>
          </div>
          <Image src="/images/exchange/exchange_alien.svg" alt="캐릭터" width={200} height={200} />
        </div>

        {/* 메인 컨텐츠 */}
        <div className="flex-1 min-w-0">
          {/* 알림 설정 카드 */}
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl border border-blue-500/30 mb-4 backdrop-blur-sm">
            <p className="text-white caption-12-regular">원하는 상품이 올라오면 알려드려요.</p>
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer hover:bg-accent hover:text-accent-foreground h-9 w-[100px] rounded-md px-3 text-sm">
              {/* Bell Icon */}
              <svg
                className="size-5 pr-1 text-primary-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-5 5v-5zM9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
              <span className="caption-12-bold text-white">알림설정</span>
            </button>
          </div>

          {/* 일괄구매/잔액/충전 */}
          <div className="flex items-center justify-between gap-4 mb-4">
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer exploration-button font-semibold text-[16px] leading-[24px] h-9 w-[100px] rounded-md px-3 text-sm">
              {/* BoxIcon */}
              <svg
                width="12"
                height="12"
                viewBox="0 0 19 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="size-3 pr-1"
              >
                <path
                  d="M12.4474 12.8995H17.5M14.9737 10.3493V15.4498M16.6579 7.79892V6.09875C16.6576 5.80061 16.5796 5.50779 16.4318 5.24966C16.284 4.99153 16.0716 4.77718 15.8158 4.62811L9.92105 1.22778C9.66502 1.07856 9.37459 1 9.07895 1C8.78331 1 8.49287 1.07856 8.23684 1.22778L2.34211 4.62811C2.08633 4.77718 1.87388 4.99153 1.72607 5.24966C1.57827 5.50779 1.5003 5.80061 1.5 6.09875V12.8994C1.5003 13.1976 1.57827 13.4904 1.72607 13.7485C1.87388 14.0066 2.08633 14.221 2.34211 14.3701L8.23684 17.7704C8.49287 17.9196 8.78331 17.9982 9.07895 17.9982C9.37459 17.9982 9.66502 17.9196 9.92105 17.7704L11.6053 16.8013M5.28947 2.92804L12.8684 7.30597M1.74424 5.24875L9.07898 9.49917M9.07898 9.49917L16.4137 5.24875M9.07898 9.49917L9.07895 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="caption-14-bold">일괄구매</span>
            </button>
            <div className="flex items-center gap-2">
              <Image src="/images/zet-1.svg" alt="ZET" width={32} height={32} className="size-8" />
              <span className="text-lg font-bold text-cyan-400">1,500 ZET</span>
              <button className="w-auto rounded-md text-white text-sm bg-purple-400 px-4 hover:bg-purple-500 h-9 w-[100px] rounded-md px-3 text-sm">
                충전
              </button>
            </div>
          </div>

          {/* 이번 달 판매 가능 용량 */}
          <div className="flex items-center text-md text-white mb-2">
            <span>이번 달 판매 가능 용량: 5GB / 10GB</span>
          </div>

          {/* Progress 컴포넌트 */}
          <div className="space-y-2 mb-4">
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div className="bg-blue-500 h-4 rounded-full" style={{ width: '50%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* 모바일 레이아웃 */}
      <div className="md:hidden w-full space-y-4">
        {/* 알림 설정 카드 */}
        <div className="flex items-center justify-between px-3 py-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl border border-blue-500/30 backdrop-blur-sm">
          <p className="text-white text-xs">원하는 상품이 올라오면 알려드려요.</p>
          <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer hover:bg-accent hover:text-accent-foreground h-9 w-[100px] rounded-md px-3 text-sm">
            {/* Bell Icon */}
            <svg
              className="size-4 text-primary-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-5 5v-5zM9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
            <span className="caption-12-bold text-white pl-2">알림설정</span>
          </button>
        </div>

        {/* 캐릭터와 말풍선 */}
        <div className="flex justify-center items-center gap-3">
          <Image
            src="/images/exchange/exchange_alien.svg"
            alt="캐릭터"
            width={120}
            height={120}
            className="flex-shrink-0"
          />
          {/* SpeechBubble - left tail */}
          <div className="relative bg-blue-500 text-white p-2 rounded-lg text-sm">
            조건에 맞는 상품을 원하시면 필터링 기능을 이용해보세요!
            {/* left tail */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-full">
              <div className="size-0 border-t-[8px] border-b-[8px] border-r-[8px] border-t-transparent border-b-transparent border-r-blue-500"></div>
            </div>
          </div>
        </div>

        {/* 일괄구매/잔액/충전 */}
        <div className="flex items-center justify-between gap-2">
          <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer exploration-button font-semibold text-[16px] leading-[24px] h-9 w-[100px] rounded-md px-3 text-sm flex-shrink-0">
            {/* BoxIcon */}
            <svg
              width="12"
              height="12"
              viewBox="0 0 19 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="size-3 pr-1"
            >
              <path
                d="M12.4474 12.8995H17.5M14.9737 10.3493V15.4498M16.6579 7.79892V6.09875C16.6576 5.80061 16.5796 5.50779 16.4318 5.24966C16.284 4.99153 16.0716 4.77718 15.8158 4.62811L9.92105 1.22778C9.66502 1.07856 9.37459 1 9.07895 1C8.78331 1 8.49287 1.07856 8.23684 1.22778L2.34211 4.62811C2.08633 4.77718 1.87388 4.99153 1.72607 5.24966C1.57827 5.50779 1.5003 5.80061 1.5 6.09875V12.8994C1.5003 13.1976 1.57827 13.4904 1.72607 13.7485C1.87388 14.0066 2.08633 14.221 2.34211 14.3701L8.23684 17.7704C8.49287 17.9196 8.78331 17.9982 9.07895 17.9982C9.37459 17.9982 9.66502 17.9196 9.92105 17.7704L11.6053 16.8013M5.28947 2.92804L12.8684 7.30597M1.74424 5.24875L9.07898 9.49917M9.07898 9.49917L16.4137 5.24875M9.07898 9.49917L9.07895 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-xs font-bold">일괄구매</span>
          </button>
          <div className="flex items-center gap-2 min-w-0">
            <Image src="/images/zet-1.svg" alt="ZET" width={24} height={24} className="size-6" />
            <span className="text-sm font-bold text-cyan-400 truncate">1,500 ZET</span>
            <button className="rounded-md text-white text-xs bg-purple-400 px-3 py-1 flex-shrink-0 hover:bg-purple-500">
              충전
            </button>
          </div>
        </div>

        {/* 판매 가능 용량 */}
        <div className="space-y-2">
          <div className="text-white text-sm">판매 가능 용량: 5GB / 10GB</div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-500 h-2 rounded-full" style={{ width: '50%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const meta: Meta<typeof MockExchangeHeader> = {
  title: 'Exchange/ExchangeHeader',
  component: MockExchangeHeader,
  parameters: {
    layout: 'padded',
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MockExchangeHeader>;

export const Default: Story = {
  args: {},
  decorators: [
    (Story) => (
      <div className="h-full flex flex-col bg-gray-900">
        <div className="px-4 pt-4">
          <Story />
        </div>
      </div>
    ),
  ],
};

export const Desktop: Story = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
  decorators: [
    (Story) => (
      <div className="h-full flex flex-col bg-gray-900">
        <div className="px-4 pt-4">
          <Story />
        </div>
      </div>
    ),
  ],
};
