import type { Meta, StoryObj } from '@storybook/react';

// Mock router for Storybook
const MockExchangeFilters = () => {
  return (
    <section
      aria-labelledby="exchange-filters"
      className="mb-4 flex flex-wrap items-center justify-between gap-2 sm:relative"
    >
      <h2 id="exchange-filters" className="sr-only">
        거래소 필터 및 정렬 옵션
      </h2>

      {/* 일괄구매 버튼 */}
      <div className="ml-auto sm:absolute sm:right-0 sm:top-0">
        <button
          type="button"
          className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
        >
          📦 일괄구매
        </button>
      </div>
    </section>
  );
};

const meta: Meta<typeof MockExchangeFilters> = {
  title: 'Exchange/ExchangeFilters',
  component: MockExchangeFilters,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'bulk purchase clicked' },
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
        story: '배경이 있는 환경에서 필터 컴포넌트가 어떻게 보이는지 확인할 수 있습니다.',
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
