import type { Meta, StoryObj } from '@storybook/react';

// Mock ExchangeEmpty for Storybook (실제 ExchangeEmpty와 동일한 구조)
const MockExchangeEmpty = ({ onClick }: { onClick?: () => void }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="text-gray-400 text-center">
        {/* BoxIcon (Package) - 실제 BoxIcon과 동일한 SVG */}
        <div className="mx-auto mb-4 opacity-50">
          <svg
            width="64"
            height="64"
            viewBox="0 0 19 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.4474 12.8995H17.5M14.9737 10.3493V15.4498M16.6579 7.79892V6.09875C16.6576 5.80061 16.5796 5.50779 16.4318 5.24966C16.284 4.99153 16.0716 4.77718 15.8158 4.62811L9.92105 1.22778C9.66502 1.07856 9.37459 1 9.07895 1C8.78331 1 8.49287 1.07856 8.23684 1.22778L2.34211 4.62811C2.08633 4.77718 1.87388 4.99153 1.72607 5.24966C1.57827 5.50779 1.5003 5.80061 1.5 6.09875V12.8994C1.5003 13.1976 1.57827 13.4904 1.72607 13.7485C1.87388 14.0066 2.08633 14.221 2.34211 14.3701L8.23684 17.7704C8.49287 17.9196 8.78331 17.9982 9.07895 17.9982C9.37459 17.9982 9.66502 17.9196 9.92105 17.7704L11.6053 16.8013M5.28947 2.92804L12.8684 7.30597M1.74424 5.24875L9.07898 9.49917M9.07898 9.49917L16.4137 5.24875M9.07898 9.49917L9.07895 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <p className="text-lg mb-2">등록된 판매글이 없습니다</p>
        <p className="text-sm mb-6">첫 번째 거래글을 등록해보세요!</p>
        {/* exploration-button variant와 동일한 스타일 */}
        <button
          onClick={onClick}
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer exploration-button font-semibold text-[16px] leading-[24px] px-6"
        >
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
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'sell button clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof MockExchangeEmpty>;

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
