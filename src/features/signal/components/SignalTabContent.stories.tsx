import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

// Mock SignalTabContent for Storybook
const MockSignalTabContent = ({
  maxHeight = 600,
  completedPlanets = 3,
  planetStatus = [true, true, true, false, false],
  isLoading = false,
}: {
  maxHeight?: number;
  completedPlanets?: number;
  planetStatus?: boolean[];
  isLoading?: boolean;
}) => {
  const [scale] = useState(1);
  const [canScrollLeft] = useState(false);
  const [canScrollRight] = useState(true);

  const PLANET_POSITIONS = [
    { left: 50, top: 200 },
    { left: 200, top: 100 },
    { left: 350, top: 200 },
    { left: 500, top: 100 },
    { left: 650, top: 200 },
  ];

  const PLANET_SIZES = [80, 80, 80, 80, 80];

  const getCurvePath = (
    from: { x: number; y: number },
    to: { x: number; y: number },
    index: number,
  ) => {
    if (index === 2) {
      const cp1 = { x: from.x + 100, y: from.y - 75 };
      const cp2 = { x: to.x - 100, y: to.y + 75 };
      return `M ${from.x},${from.y} C ${cp1.x},${cp1.y} ${cp2.x},${cp2.y} ${to.x},${to.y}`;
    }

    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const radius = (Math.sqrt(dx * dx + dy * dy) / 2) * 0.8;
    const sweepFlag = index === 1 ? 0 : 1;

    return `M ${from.x},${from.y} A ${radius},${radius} 0 0,${sweepFlag} ${to.x},${to.y}`;
  };

  const getConnectionColor = (fromIndex: number, toIndex: number) => {
    return planetStatus[fromIndex] && planetStatus[toIndex] ? '#7BD5FF' : '#666666';
  };

  const scrollLeft = () => {
    // 왼쪽으로 스크롤
  };

  const scrollRight = () => {
    // 오른쪽으로 스크롤
  };

  return (
    <section aria-label="탐사 경로 시각화" className="relative w-full overflow-hidden">
      {/* 로딩 오버레이 */}
      {isLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="text-white text-center">
            <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-2"></div>
            <p>탐사 기록을 불러오는 중...</p>
          </div>
        </div>
      )}

      <div className={isLoading ? 'opacity-0' : 'opacity-100'}>
        <p className="text-white text-lg mb-5" aria-live="polite">
          {completedPlanets}번째 은하까지 탐사 완료...
        </p>

        {canScrollLeft && (
          <aside className="absolute z-10 top-1/2 -translate-y-1/2 left-0">
            <button onClick={scrollLeft} className="bg-black/50 text-white px-3 py-2 rounded-r">
              ◀
            </button>
          </aside>
        )}

        {canScrollRight && (
          <aside className="absolute z-10 top-1/2 -translate-y-1/2 right-0">
            <button onClick={scrollRight} className="bg-black/50 text-white px-3 py-2 rounded-l">
              ▶
            </button>
          </aside>
        )}

        <div
          className="w-full overflow-x-auto scroll-smooth"
          style={{ height: `${maxHeight * scale}px` }}
        >
          <div
            className="relative origin-top-left"
            style={{
              transform: `scale(${scale})`,
              width: '800px',
              height: `${maxHeight}px`,
            }}
          >
            <svg
              className="absolute top-0 left-0 pointer-events-none"
              width="800"
              height={maxHeight}
            >
              {PLANET_POSITIONS.map((from, i) => {
                const to = PLANET_POSITIONS[i + 1];
                if (!to) return null;

                const fromPoint = {
                  x: from.left + PLANET_SIZES[i] / 2,
                  y: from.top + PLANET_SIZES[i] / 2,
                };
                const toPoint = {
                  x: to.left + PLANET_SIZES[i + 1] / 2,
                  y: to.top + PLANET_SIZES[i + 1] / 2,
                };

                return (
                  <path
                    key={i}
                    d={getCurvePath(fromPoint, toPoint, i)}
                    fill="none"
                    stroke={getConnectionColor(i, i + 1)}
                    strokeWidth="2"
                    strokeDasharray="8 6"
                  />
                );
              })}
            </svg>

            {PLANET_POSITIONS.map((planet, index) => (
              <div
                key={index}
                className="absolute"
                style={{
                  top: `${planet.top}px`,
                  left: `${planet.left}px`,
                }}
              >
                <div
                  className={`w-20 h-20 rounded-full flex items-center justify-center text-2xl ${
                    planetStatus[index] ? 'bg-blue-500' : 'bg-gray-600'
                  }`}
                >
                  {planetStatus[index] ? '🪐' : '🌑'}
                </div>
                <div className="absolute -top-8 -right-8 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-sm">
                  📡
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const meta: Meta<typeof MockSignalTabContent> = {
  title: 'Signal/SignalTabContent',
  component: MockSignalTabContent,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    maxHeight: {
      control: { type: 'number' },
      description: '최대 높이',
    },
    completedPlanets: {
      control: { type: 'number', min: 0, max: 5 },
      description: '완료된 행성 수',
    },
    planetStatus: {
      control: { type: 'object' },
      description: '행성 도달 상태 배열',
    },
    isLoading: {
      control: { type: 'boolean' },
      description: '로딩 상태',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    maxHeight: 600,
    completedPlanets: 3,
    planetStatus: [true, true, true, false, false],
    isLoading: false,
  },
};

export const Loading: Story = {
  args: {
    maxHeight: 600,
    completedPlanets: 0,
    planetStatus: [false, false, false, false, false],
    isLoading: true,
  },
};

export const AllCompleted: Story = {
  args: {
    maxHeight: 600,
    completedPlanets: 5,
    planetStatus: [true, true, true, true, true],
    isLoading: false,
  },
};

export const NoneCompleted: Story = {
  args: {
    maxHeight: 600,
    completedPlanets: 0,
    planetStatus: [false, false, false, false, false],
    isLoading: false,
  },
};

export const PartialProgress: Story = {
  args: {
    maxHeight: 600,
    completedPlanets: 2,
    planetStatus: [true, true, false, false, false],
    isLoading: false,
  },
};

export const SmallHeight: Story = {
  args: {
    maxHeight: 400,
    completedPlanets: 3,
    planetStatus: [true, true, true, false, false],
    isLoading: false,
  },
};
