import type { Meta, StoryObj } from '@storybook/react';

import LetterComponent from './LetterListComponent';
import SignalProgressBar from './SignalProgressBar';

// Mock LetterTabContent for Storybook
const MockLetterTabContent = () => {
  return (
    <div className="w-full bg-gray-900 p-4">
      <div className="max-w-md mx-auto">
        <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
          <h2 className="text-white text-base font-semibold mb-4">전파거리 관련 탭 콘텐츠</h2>

          <section
            aria-label="전파거리 관련 탭 콘텐츠"
            className="w-full h-full flex flex-col justify-center items-center space-y-4"
          >
            <div className="z-30 scale-90">
              <SignalProgressBar />
            </div>
            <article>
              <LetterComponent />
            </article>
          </section>
        </div>
      </div>
    </div>
  );
};

const meta: Meta<typeof MockLetterTabContent> = {
  title: 'Signal/LetterTabContent',
  component: MockLetterTabContent,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MockLetterTabContent>;

export const Default: Story = {
  render: () => <MockLetterTabContent />,
};

export const Desktop: Story = {
  render: () => <MockLetterTabContent />,
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};
