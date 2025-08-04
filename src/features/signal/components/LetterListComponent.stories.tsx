import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

// Mock LetterListComponent for Storybook
const MockLetterListComponent = ({
  isLoading = false,
  hasError = false,
  letters = [],
}: {
  isLoading?: boolean;
  hasError?: boolean;
  letters?: Array<{ step: number; content: string }>;
}) => {
  const [retryCount, setRetryCount] = useState(0);

  const handleRetry = () => {
    setRetryCount((prev) => prev + 1);
    // 다시 시도 버튼 클릭됨
  };

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-2"></div>
          <p className="text-white">항해 편지를 불러오고 있어요...</p>
        </div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="p-4 text-center">
        <p className="text-red-400 mb-2">편지를 불러오지 못했습니다. 다시 시도해주세요.</p>
        <button
          onClick={handleRetry}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600"
        >
          다시 시도 (클릭 수: {retryCount})
        </button>
      </div>
    );
  }

  if (letters.length === 0) {
    return (
      <div className="p-4">
        <p className="text-gray-400 text-center">아직 항해 편지가 없어요.</p>
      </div>
    );
  }

  return (
    <section aria-label="탐사 편지 목록" className="space-y-4 p-4">
      {letters.map((letter) => (
        <article
          key={letter.step}
          className="bg-black border-l-4 border-indigo-400 p-4 rounded shadow cursor-pointer hover:bg-gray-800"
        >
          <p className="text-sm text-gray-500">행성 {letter.step}단계</p>
          <p className="text-white">{letter.content}</p>
        </article>
      ))}
    </section>
  );
};

const meta: Meta<typeof MockLetterListComponent> = {
  title: 'Signal/LetterListComponent',
  component: MockLetterListComponent,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    isLoading: {
      control: { type: 'boolean' },
      description: '로딩 상태',
    },
    hasError: {
      control: { type: 'boolean' },
      description: '에러 상태',
    },
    letters: {
      control: { type: 'object' },
      description: '편지 목록',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isLoading: false,
    hasError: false,
    letters: [
      { step: 1, content: '첫 번째 행성에 도착했습니다. 새로운 세계가 기다리고 있어요!' },
      { step: 2, content: '두 번째 행성에서 신비로운 신호를 발견했습니다.' },
      { step: 3, content: '세 번째 행성의 비밀을 풀어가는 중입니다.' },
    ],
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
    hasError: false,
    letters: [],
  },
};

export const Error: Story = {
  args: {
    isLoading: false,
    hasError: true,
    letters: [],
  },
};

export const Empty: Story = {
  args: {
    isLoading: false,
    hasError: false,
    letters: [],
  },
};

export const SingleLetter: Story = {
  args: {
    isLoading: false,
    hasError: false,
    letters: [{ step: 1, content: '첫 번째 행성에 도착했습니다. 새로운 세계가 기다리고 있어요!' }],
  },
};

export const ManyLetters: Story = {
  args: {
    isLoading: false,
    hasError: false,
    letters: [
      { step: 1, content: '첫 번째 행성에 도착했습니다. 새로운 세계가 기다리고 있어요!' },
      { step: 2, content: '두 번째 행성에서 신비로운 신호를 발견했습니다.' },
      { step: 3, content: '세 번째 행성의 비밀을 풀어가는 중입니다.' },
      { step: 4, content: '네 번째 행성에서 놀라운 발견을 했습니다.' },
      { step: 5, content: '마지막 행성에 도착했습니다. 모든 비밀이 밝혀질 때입니다!' },
    ],
  },
};
