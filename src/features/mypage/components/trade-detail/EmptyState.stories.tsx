import type { Meta, StoryObj } from '@storybook/react';

// Mock EmptyState for Storybook
const MockEmptyState = () => {
  return (
    <div className="overflow-y-hidden w-full min-h-screen flex flex-col items-center justify-center">
      <div className="relative w-full flex items-center py-4">
        <button className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center size-8 rounded-full hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50 transition-colors">
          <span className="text-white text-2xl">←</span>
        </button>
        <h1 className="text-xl font-bold text-white w-full text-center">주문 상세</h1>
      </div>
      <div className="flex items-center justify-center mt-8">
        <div className="text-gray-500 text-center">
          <div className="text-4xl mb-4">📭</div>
          <div className="text-lg">구매 내역을 찾을 수 없습니다.</div>
        </div>
      </div>
    </div>
  );
};

const meta: Meta<typeof MockEmptyState> = {
  title: 'Mypage/TradeDetail/EmptyState',
  component: MockEmptyState,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
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
        story: '배경이 있는 환경에서 빈 상태가 어떻게 보이는지 확인할 수 있습니다.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="bg-gray-900 p-4 min-h-screen">
        <Story />
      </div>
    ),
  ],
};
