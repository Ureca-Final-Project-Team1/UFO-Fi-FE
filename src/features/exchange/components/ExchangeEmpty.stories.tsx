import type { Meta, StoryObj } from '@storybook/react';

// Mock router for Storybook
const MockExchangeEmpty = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="text-gray-400 text-center">
        <div className="mx-auto mb-4 opacity-50 w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center">
          📦
        </div>
        <p className="text-lg mb-2">등록된 판매글이 없습니다</p>
        <p className="text-sm mb-6">첫 번째 거래글을 등록해보세요!</p>
        <button className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          판매글 등록하기
        </button>
      </div>
    </div>
  );
};

const meta: Meta<typeof MockExchangeEmpty> = {
  title: 'Exchange/ExchangeEmpty',
  component: MockExchangeEmpty,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'sell button clicked' },
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
