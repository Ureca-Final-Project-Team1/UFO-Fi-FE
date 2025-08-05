import type { Meta, StoryObj } from '@storybook/react';
import Image from 'next/image';

import { Icon } from '@/shared';

interface MockExchangeHeaderProps {
  balance?: number;
  availableData?: number;
  maxData?: number;
  onNotificationClick?: () => void;
  onBulkPurchaseClick?: () => void;
  onChargeClick?: () => void;
}

// Mock ExchangeHeader for Storybook (실제 ExchangeHeader와 동일한 구조)
const MockExchangeHeader = ({
  balance = 1500,
  availableData = 5,
  maxData = 10,
  onNotificationClick,
  onBulkPurchaseClick,
  onChargeClick,
}: MockExchangeHeaderProps) => {
  const progressPercentage = (availableData / maxData) * 100;
  const formattedBalance = balance.toLocaleString();

  return (
    <div className="w-full">
      {/* 데스크톱/태블릿 레이아웃 */}
      <div className="hidden md:flex relative w-full gap-4 items-start shadow-lg p-4">
        {/* 캐릭터 섹션 */}
        <div className="flex flex-col gap-2 items-center flex-shrink-0">
          {/* SpeechBubble */}
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
            <button
              onClick={onNotificationClick}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer hover:bg-accent hover:text-accent-foreground h-9 w-[100px] rounded-md px-3 text-sm"
            >
              <Icon name="Bell" className="size-5 pr-1 text-primary-400" />
              <span className="caption-12-bold text-white">알림설정</span>
            </button>
          </div>

          {/* 일괄구매/잔액/충전 */}
          <div className="flex items-center justify-between gap-4 mb-4">
            <button
              onClick={onBulkPurchaseClick}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer exploration-button font-semibold text-[16px] leading-[24px] h-9 w-[100px] rounded-md px-3 text-sm"
            >
              <Icon name="Package" className="size-3 pr-1" />
              <span className="caption-14-bold">일괄구매</span>
            </button>
            <div className="flex items-center gap-2">
              <Image src="/images/zet-1.svg" alt="ZET" width={32} height={32} className="size-8" />
              <span className="text-lg font-bold text-cyan-400">{formattedBalance} ZET</span>
              <button
                onClick={onChargeClick}
                className="w-auto rounded-md text-white text-sm bg-purple-400 px-4 hover:bg-purple-500 h-9 w-[100px] rounded-md px-3 text-sm"
              >
                충전
              </button>
            </div>
          </div>

          {/* 이번 달 판매 가능 용량 */}
          <div className="flex items-center text-md text-white mb-2">
            <span>
              이번 달 판매 가능 용량: {availableData}GB / {maxData}GB
            </span>
          </div>

          {/* Progress 컴포넌트 */}
          <div className="space-y-2 mb-4">
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-blue-500 h-4 rounded-full"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* 모바일 레이아웃 */}
      <div className="md:hidden w-full space-y-4">
        {/* 알림 설정 카드 */}
        <div className="flex items-center justify-between px-3 py-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl border border-blue-500/30 backdrop-blur-sm">
          <p className="text-white text-xs">원하는 상품이 올라오면 알려드려요.</p>
          <button
            onClick={onNotificationClick}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer hover:bg-accent hover:text-accent-foreground h-9 w-[100px] rounded-md px-3 text-sm"
          >
            <Icon name="Bell" className="size-4 text-primary-400" />
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
          <button
            onClick={onBulkPurchaseClick}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer exploration-button font-semibold text-[16px] leading-[24px] h-9 w-[100px] rounded-md px-3 text-sm flex-shrink-0"
          >
            <Icon name="Package" className="size-3 pr-1" />
            <span className="text-xs font-bold">일괄구매</span>
          </button>
          <div className="flex items-center gap-2 min-w-0">
            <Image src="/images/zet-1.svg" alt="ZET" width={24} height={24} className="size-6" />
            <span className="text-sm font-bold text-cyan-400 truncate">{formattedBalance} ZET</span>
            <button
              onClick={onChargeClick}
              className="rounded-md text-white text-xs bg-purple-400 px-3 py-1 flex-shrink-0 hover:bg-purple-500"
            >
              충전
            </button>
          </div>
        </div>

        {/* 판매 가능 용량 */}
        <div className="space-y-2">
          <div className="text-white text-sm">
            판매 가능 용량: {availableData}GB / {maxData}GB
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full"
              style={{ width: `${progressPercentage}%` }}
            ></div>
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
  argTypes: {
    onNotificationClick: { action: 'notification clicked' },
    onBulkPurchaseClick: { action: 'bulk purchase clicked' },
    onChargeClick: { action: 'charge clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof MockExchangeHeader>;

const ExchangeHeaderDecorator = (Story: React.ComponentType) => (
  <div className="h-full flex flex-col bg-gray-900">
    <div className="px-4 pt-4">
      <Story />
    </div>
  </div>
);

export const Default: Story = {
  args: {},
  decorators: [ExchangeHeaderDecorator],
};

export const WithLowBalance: Story = {
  args: {
    balance: 500,
    availableData: 2,
    maxData: 10,
  },
  decorators: [ExchangeHeaderDecorator],
};

export const WithHighUsage: Story = {
  args: {
    balance: 3000,
    availableData: 8,
    maxData: 10,
  },
  decorators: [ExchangeHeaderDecorator],
};

export const Desktop: Story = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
  decorators: [ExchangeHeaderDecorator],
};
