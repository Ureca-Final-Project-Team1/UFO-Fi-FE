import type { Meta, StoryObj } from '@storybook/react';

// Mock LetterTabContent for Storybook
const MockLetterTabContent = () => {
  return (
    <section
      aria-label="전파거리 관련 탭 콘텐츠"
      className="w-full h-full flex flex-col justify-center items-center space-y-4"
    >
      <div className="z-30 scale-90">
        {/* Mock SignalProgressBar */}
        <div className="flex flex-col items-center w-full gap-4 px-4">
          <p className="text-white text-lg mb-5">3번째 은하까지 탐사 완료...</p>
          <div className="relative flex items-center justify-center w-full">
            <div className="absolute inset-x-4 top-1/2 rounded-full border border-dashed border-gray-400 -translate-y-1/2" />
            <div className="flex gap-3 relative z-10">
              {[true, true, true, false, false].map((isArrived, index) => (
                <div key={index} className="relative">
                  <div
                    className={`w-15 h-15 rounded-full flex items-center justify-center text-2xl ${
                      isArrived ? 'bg-blue-500' : 'bg-gray-600'
                    }`}
                    style={{ width: 60, height: 60 }}
                  >
                    {isArrived ? '🪐' : '🌑'}
                  </div>
                  <div className="absolute -top-4 -right-4 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-xs">
                    📡
                  </div>
                </div>
              ))}
            </div>
            <div
              className="flex items-center justify-center size-12 rounded-full text-white text-sm ml-3 relative z-10 flex-shrink-0"
              style={{ backgroundColor: '#222' }}
            >
              3/5
            </div>
          </div>
        </div>
      </div>
      <article>
        {/* Mock LetterComponent */}
        <div className="bg-white rounded-lg p-4 max-w-md">
          <h3 className="text-lg font-semibold mb-2">📨 편지 목록</h3>
          <div className="space-y-2">
            <div className="p-3 bg-gray-100 rounded">
              <p className="text-sm text-gray-700">첫 번째 편지 내용...</p>
            </div>
            <div className="p-3 bg-gray-100 rounded">
              <p className="text-sm text-gray-700">두 번째 편지 내용...</p>
            </div>
            <div className="p-3 bg-gray-100 rounded">
              <p className="text-sm text-gray-700">세 번째 편지 내용...</p>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
};

const meta: Meta<typeof MockLetterTabContent> = {
  title: 'Signal/LetterTabContent',
  component: MockLetterTabContent,
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
