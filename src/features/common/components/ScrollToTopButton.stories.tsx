import type { Meta, StoryObj } from '@storybook/react';

import { IMAGE_PATHS } from '@/constants/images';

import { ScrollToTopButton } from './ScrollToTopButton';

const meta: Meta<typeof ScrollToTopButton> = {
  title: 'Common/ScrollToTopButton',
  component: ScrollToTopButton,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ScrollToTopButton>;

const ScrollTestContainer = ({
  title,
  contentCount,
  longContent = false,
  customContent,
}: {
  title: string;
  contentCount?: number;
  longContent?: boolean;
  customContent?: React.ReactNode;
}) => (
  <div className="fixed inset-0 w-full h-full flex justify-center overflow-hidden bg-background">
    <div className="relative w-full h-full min-w-[375px] max-w-[620px] flex flex-col">
      {/* 배경 이미지 */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${IMAGE_PATHS.BG_BASIC})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* 메인 콘텐츠 */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden hide-scrollbar px-6 text-white relative z-10">
        <div className="pt-4">
          <h1 className="text-white text-lg font-bold mb-4">{title}</h1>
          <div className="space-y-4">
            {customContent ||
              Array.from({ length: contentCount || 0 }, (_, i) => (
                <div
                  key={i}
                  className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700"
                >
                  <h2 className="text-white text-base font-semibold">
                    {longContent ? '긴 섹션' : '섹션'} {i + 1}
                  </h2>
                  <p className="text-gray-300 text-sm mt-2">
                    {longContent
                      ? `이것은 매우 긴 콘텐츠입니다. 스크롤을 많이 내려야 버튼이 나타납니다. ${Array.from(
                          { length: 5 },
                          () =>
                            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                        ).join(' ')}`
                      : '이것은 스크롤 테스트를 위한 콘텐츠입니다. 스크롤을 내려보세요.'}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </main>

      {/* ScrollToTopButton - 실제 위치 */}
      <div className="absolute bottom-24 right-4 z-50">
        <ScrollToTopButton />
      </div>
    </div>
  </div>
);

export const Default: Story = {
  args: {},
  render: () => <ScrollTestContainer title="스크롤 테스트 페이지" contentCount={20} />,
};

export const WithLongContent: Story = {
  args: {},
  render: () => <ScrollTestContainer title="긴 콘텐츠 페이지" contentCount={50} longContent />,
};

export const Hidden: Story = {
  args: {},
  render: () => (
    <ScrollTestContainer
      title="짧은 콘텐츠 페이지"
      customContent={
        <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
          <h2 className="text-white text-base font-semibold">짧은 섹션</h2>
          <p className="text-gray-300 text-sm mt-2">
            이것은 짧은 콘텐츠입니다. 스크롤이 필요하지 않아 버튼이 보이지 않습니다.
          </p>
        </div>
      }
    />
  ),
};

export const Desktop: Story = {
  args: {},
  render: () => (
    <ScrollTestContainer
      title="데스크톱 스크롤 테스트"
      contentCount={30}
      customContent={Array.from({ length: 30 }, (_, i) => (
        <div
          key={i}
          className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700"
        >
          <h2 className="text-white text-base font-semibold">데스크톱 섹션 {i + 1}</h2>
          <p className="text-gray-300 text-sm mt-2">
            이것은 데스크톱에서의 스크롤 테스트입니다. 스크롤을 내려보세요.
          </p>
        </div>
      ))}
    />
  ),
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};
