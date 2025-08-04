import type { Meta, StoryObj } from '@storybook/react';

// Mock CompletionImage for Storybook
const MockCompletionImage = () => {
  return (
    <div className="relative flex justify-center mt-auto">
      <div className="absolute -top-11 w-36 h-36 bg-blue-500 rounded-full flex items-center justify-center text-white text-4xl">
        👾
      </div>
      <div className="w-72 h-72 bg-green-500 rounded-full flex items-center justify-center text-white text-6xl">
        🌍
      </div>
    </div>
  );
};

const meta: Meta<typeof MockCompletionImage> = {
  title: 'Mypage/TradeDetail/CompletionImage',
  component: MockCompletionImage,
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
        story: '배경이 있는 환경에서 완료 이미지가 어떻게 보이는지 확인할 수 있습니다.',
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
