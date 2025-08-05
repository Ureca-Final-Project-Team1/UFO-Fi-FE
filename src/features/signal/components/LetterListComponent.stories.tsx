import type { Meta, StoryObj } from '@storybook/react';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

import { LetterDisplay } from '@/backend/types/letters';
import { Button, Loading } from '@/shared';

// Mock LetterDisplay data
const createMockLetters = (): LetterDisplay[] => [
  {
    step: 1,
    content:
      '첫 번째 은하에 도착했습니다. 이곳에서는 새로운 데이터를 발견할 수 있을 것 같습니다. 탐사를 계속 진행해보겠습니다.',
  },
  {
    step: 2,
    content:
      '두 번째 은하 탐사 완료! 이번에는 희귀한 데이터를 수집했습니다. 다음 목적지로 이동하겠습니다.',
  },
  {
    step: 3,
    content: '세 번째 은하에서 놀라운 발견을 했습니다. 이 데이터는 정말 특별한 것 같습니다.',
  },
];

// Mock LetterListComponent for Storybook
const MockLetterListComponent = ({
  isLoading = false,
  hasError = false,
  isEmpty = false,
}: {
  isLoading?: boolean;
  hasError?: boolean;
  isEmpty?: boolean;
}) => {
  const [letters, setLetters] = useState<LetterDisplay[]>([]);
  const [loading, setLoading] = useState(isLoading);
  const [error, setError] = useState<string | null>(
    hasError ? '편지를 불러오지 못했습니다. 다시 시도해주세요.' : null,
  );

  // 메시지 상수
  const MESSAGE = {
    LOADING: '항해 편지를 불러오고 있어요...',
    ERROR: '편지를 불러오지 못했습니다. 다시 시도해주세요.',
    EMPTY: '아직 항해 편지가 없어요.',
  };

  const loadLetters = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (isEmpty) {
        setLetters([]);
      } else {
        setLetters(createMockLetters());
      }
    } catch {
      setError(MESSAGE.ERROR);
      toast.error(MESSAGE.ERROR);
    } finally {
      setLoading(false);
    }
  }, [MESSAGE.ERROR, isEmpty]);

  useEffect(() => {
    loadLetters();
  }, [loadLetters]);

  if (loading) {
    return (
      <div className="w-full bg-gray-900 p-4">
        <div className="max-w-md mx-auto">
          <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
            <h2 className="text-white text-base font-semibold mb-4">탐사 편지 목록</h2>

            <div className="h-full flex items-center justify-center">
              <Loading variant="signal" message={MESSAGE.LOADING} className="p-8" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full bg-gray-900 p-4">
        <div className="max-w-md mx-auto">
          <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
            <h2 className="text-white text-base font-semibold mb-4">탐사 편지 목록</h2>

            <div className="p-4 text-center">
              <p className="text-red-400 mb-2">{error}</p>
              <Button
                size="default"
                variant="primary"
                onClick={loadLetters}
                className="mt-auto my-8"
              >
                다시 시도
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (letters.length === 0) {
    return (
      <div className="w-full bg-gray-900 p-4">
        <div className="max-w-md mx-auto">
          <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
            <h2 className="text-white text-base font-semibold mb-4">탐사 편지 목록</h2>

            <p className="p-4 text-gray-400">{MESSAGE.EMPTY}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-900 p-4">
      <div className="max-w-md mx-auto">
        <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
          <h2 className="text-white text-base font-semibold mb-4">탐사 편지 목록</h2>

          <section aria-label="탐사 편지 목록" className="space-y-4">
            {letters.map((letter) => (
              <article
                key={letter.step}
                className="bg-black border-l-4 border-indigo-400 p-4 rounded shadow cursor-pointer hover:bg-gray-900 transition-colors"
              >
                <p className="text-sm text-gray-500 mb-2">행성 {letter.step}단계</p>
                <p className="text-white leading-relaxed">{letter.content}</p>
              </article>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
};

const meta: Meta<typeof MockLetterListComponent> = {
  title: 'Signal/LetterListComponent',
  component: MockLetterListComponent,
  parameters: {
    layout: 'padded',
    viewport: {
      defaultViewport: 'mobile1',
    },
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
    isEmpty: {
      control: { type: 'boolean' },
      description: '빈 목록 상태',
    },
  },
};

export default meta;
type Story = StoryObj<typeof MockLetterListComponent>;

export const Default: Story = {
  args: {
    isLoading: false,
    hasError: false,
    isEmpty: false,
  },
};

export const LetterLoading: Story = {
  args: {
    isLoading: true,
    hasError: false,
    isEmpty: false,
  },
};

export const Error: Story = {
  args: {
    isLoading: false,
    hasError: true,
    isEmpty: false,
  },
};

export const Empty: Story = {
  args: {
    isLoading: false,
    hasError: false,
    isEmpty: true,
  },
};

export const Desktop: Story = {
  args: {
    isLoading: false,
    hasError: false,
    isEmpty: false,
  },
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};
