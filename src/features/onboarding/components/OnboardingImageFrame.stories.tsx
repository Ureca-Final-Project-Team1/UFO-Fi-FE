import type { Meta, StoryObj } from '@storybook/react';

// Mock OnboardingImageFrame for Storybook
const MockOnboardingImageFrame = () => {
  return (
    <div className="relative w-full h-auto max-w-sm mx-auto">
      {/* 창문 테두리 이미지 */}
      <div className="w-full h-auto z-0 border-4 border-gray-300 rounded-lg bg-gray-100 p-2">
        <div className="w-full h-64 bg-gray-200 rounded flex items-center justify-center text-gray-500">
          🪟 창문 테두리
        </div>
      </div>

      {/* 마스킹된 콘텐츠 영역 */}
      <div className="absolute inset-2 z-10 scale-[0.83] origin-center">
        <div className="w-full h-64 rounded overflow-hidden">
          {/* 우주 배경 */}
          <div className="w-full h-full bg-gradient-to-b from-blue-900 via-purple-900 to-black flex items-center justify-center">
            <div className="text-white text-2xl">🌌</div>
          </div>

          {/* 온보딩 콘텐츠 이미지 */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl">
              🚀
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const meta: Meta<typeof MockOnboardingImageFrame> = {
  title: 'Onboarding/OnboardingImageFrame',
  component: MockOnboardingImageFrame,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
