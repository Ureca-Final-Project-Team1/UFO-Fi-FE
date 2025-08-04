import type { Meta, StoryObj } from '@storybook/react';

import { ScrollToTopButton } from './ScrollToTopButton';

const meta: Meta<typeof ScrollToTopButton> = {
  title: 'Common/ScrollToTopButton',
  component: ScrollToTopButton,
  parameters: {
    layout: 'padded',
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ScrollToTopButton>;

export const Default: Story = {
  args: {},
  decorators: [
    (Story) => (
      <div className="h-full flex flex-col bg-gray-900 relative">
        <div className="px-4 pt-4">
          <h1 className="text-white text-lg font-bold mb-4">스크롤 테스트 페이지</h1>
          <div className="space-y-4">
            {Array.from({ length: 20 }, (_, i) => (
              <div key={i} className="bg-gray-800 p-4 rounded-lg">
                <h2 className="text-white text-base font-semibold">섹션 {i + 1}</h2>
                <p className="text-gray-300 text-sm mt-2">
                  이것은 스크롤 테스트를 위한 콘텐츠입니다. 스크롤을 내려보세요.
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="fixed bottom-6 right-6 z-50">
          <Story />
        </div>
      </div>
    ),
  ],
};

export const WithLongContent: Story = {
  args: {},
  decorators: [
    (Story) => (
      <div className="h-full flex flex-col bg-gray-900 relative">
        <div className="px-4 pt-4">
          <h1 className="text-white text-lg font-bold mb-4">긴 콘텐츠 페이지</h1>
          <div className="space-y-4">
            {Array.from({ length: 50 }, (_, i) => (
              <div key={i} className="bg-gray-800 p-4 rounded-lg">
                <h2 className="text-white text-base font-semibold">긴 섹션 {i + 1}</h2>
                <p className="text-gray-300 text-sm mt-2">
                  이것은 매우 긴 콘텐츠입니다. 스크롤을 많이 내려야 버튼이 나타납니다.
                  {Array.from({ length: 5 }, (_, j) => (
                    <span key={j}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                      incididunt ut labore et dolore magna aliqua.
                    </span>
                  ))}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="fixed bottom-6 right-6 z-50">
          <Story />
        </div>
      </div>
    ),
  ],
};

export const Hidden: Story = {
  args: {},
  decorators: [
    (Story) => (
      <div className="h-full flex flex-col bg-gray-900 relative">
        <div className="px-4 pt-4">
          <h1 className="text-white text-lg font-bold mb-4">짧은 콘텐츠 페이지</h1>
          <div className="space-y-4">
            <div className="bg-gray-800 p-4 rounded-lg">
              <h2 className="text-white text-base font-semibold">짧은 섹션</h2>
              <p className="text-gray-300 text-sm mt-2">
                이것은 짧은 콘텐츠입니다. 스크롤이 필요하지 않아 버튼이 보이지 않습니다.
              </p>
            </div>
          </div>
        </div>
        <div className="fixed bottom-6 right-6 z-50">
          <Story />
        </div>
      </div>
    ),
  ],
};
