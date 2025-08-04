import type { Meta, StoryObj } from '@storybook/react';

// Mock header for Storybook
const MockExchangeHeader = () => {
  return (
    <div className="w-full">
      <div className="hidden md:flex relative w-full gap-4 items-start shadow-lg p-4">
        {/* 캐릭터 섹션 */}
        <div className="flex flex-col gap-2 items-center flex-shrink-0">
          <div className="bg-blue-500 text-white p-2 rounded-lg text-sm">
            조건에 맞는 상품을 원하시면 필터링 기능을 이용해보세요!
          </div>
          <div className="w-32 h-32 bg-gray-600 rounded-full flex items-center justify-center">
            👾
          </div>
        </div>

        {/* 메인 컨텐츠 */}
        <div className="flex-1 min-w-0">
          {/* 알림 설정 카드 */}
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl border border-blue-500/30 mb-4">
            <p className="text-white text-sm">원하는 상품이 올라오면 알려드려요.</p>
            <button className="px-3 py-1 bg-transparent text-white text-sm border border-white rounded">
              🔔 알림설정
            </button>
          </div>

          {/* 일괄구매/잔액/충전 */}
          <div className="flex items-center justify-between gap-4 mb-4">
            <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm">
              📦 일괄구매
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-yellow-500 rounded-full"></div>
              <span className="text-lg font-bold text-cyan-400">1,500 ZET</span>
              <button className="px-4 py-1 bg-purple-400 text-white rounded text-sm">충전</button>
            </div>
          </div>

          {/* 이번 달 판매 가능 용량 */}
          <div className="flex items-center text-md text-white mb-2">
            <span>이번 달 판매 가능 용량: 5GB / 10GB</span>
          </div>

          {/* 프로그래스 바 */}
          <div className="w-full bg-gray-700 rounded-full h-2">
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
  },
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'button clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithBackground: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: '배경이 있는 환경에서 헤더가 어떻게 보이는지 확인할 수 있습니다.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="bg-gray-900 p-4">
        <Story />
      </div>
    ),
  ],
};
