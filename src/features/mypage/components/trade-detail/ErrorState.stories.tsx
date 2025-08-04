import type { Meta, StoryObj } from '@storybook/react';

// Mock ErrorState for Storybook
const MockErrorState = ({ error = '구매 내역을 불러올 수 없습니다.' }: { error?: string }) => {
  return (
    <div className="overflow-y-hidden w-full min-h-screen flex flex-col items-center justify-center">
      <div className="relative w-full flex items-center py-4">
        <button className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center size-8 rounded-full hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50 transition-colors">
          <span className="text-white text-2xl">←</span>
        </button>
        <h1 className="text-xl font-bold text-white w-full text-center">주문 상세</h1>
      </div>
      <div className="flex items-center justify-center mt-8">
        <div className="text-red-500 text-center">
          <div className="text-4xl mb-4">❌</div>
          <div className="text-lg">{error}</div>
        </div>
      </div>
    </div>
  );
};

const meta: Meta<typeof MockErrorState> = {
  title: 'Mypage/TradeDetail/ErrorState',
  component: MockErrorState,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    error: {
      control: { type: 'text' },
      description: '에러 메시지',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    error: '구매 내역을 불러올 수 없습니다.',
  },
};

export const NetworkError: Story = {
  args: {
    error: '네트워크 연결을 확인해주세요.',
  },
};

export const NotFoundError: Story = {
  args: {
    error: '해당 구매 내역을 찾을 수 없습니다.',
  },
};

export const LongError: Story = {
  args: {
    error:
      '매우 긴 에러 메시지입니다. 이 메시지는 여러 줄에 걸쳐 표시될 수 있으며, 사용자에게 자세한 오류 정보를 제공합니다.',
  },
};
