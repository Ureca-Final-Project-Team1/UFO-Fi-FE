import type { Meta, StoryObj } from '@storybook/react';

// Mock SignalProgressBar for Storybook
const MockSignalProgressBar = ({
  completedPlanets = 3,
  planetStatus = [true, true, true, false, false],
}: {
  completedPlanets?: number;
  planetStatus?: boolean[];
}) => {
  const PLANET_SIZE = 60;
  const TOTAL_PLANETS = 5;

  return (
    <section aria-label="탐사 진행 현황" className="flex flex-col items-center w-full gap-4 px-4">
      {/* 진행 텍스트 */}
      <p className="text-white text-lg mb-5" aria-live="polite">
        {completedPlanets}번째 은하까지 탐사 완료...
      </p>

      {/* 선 + 행성 아이콘 */}
      <div className="relative flex items-center justify-center w-full">
        {/* 가운데 점선 선 */}
        <div className="absolute inset-x-4 top-1/2 rounded-full border border-dashed border-gray-400 -translate-y-1/2" />

        {/* 행성들 */}
        <div className="flex gap-3 relative z-10">
          {planetStatus.map((isArrived, index) => (
            <div key={index} className="relative">
              <div
                className={`w-15 h-15 rounded-full flex items-center justify-center text-2xl ${
                  isArrived ? 'bg-blue-500' : 'bg-gray-600'
                }`}
                style={{ width: PLANET_SIZE, height: PLANET_SIZE }}
              >
                {isArrived ? '🪐' : '🌑'}
              </div>
              <div className="absolute -top-4 -right-4 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-xs">
                📡
              </div>
            </div>
          ))}
        </div>

        {/* 진행 상태 카운터 */}
        <div
          className="flex items-center justify-center size-12 rounded-full text-white text-sm ml-3 relative z-10 flex-shrink-0"
          style={{ backgroundColor: '#222' }}
        >
          {completedPlanets}/{TOTAL_PLANETS}
        </div>
      </div>
    </section>
  );
};

const meta: Meta<typeof MockSignalProgressBar> = {
  title: 'Signal/SignalProgressBar',
  component: MockSignalProgressBar,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    completedPlanets: {
      control: { type: 'number', min: 0, max: 5 },
      description: '완료된 행성 수',
    },
    planetStatus: {
      control: { type: 'object' },
      description: '행성 도달 상태 배열',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    completedPlanets: 3,
    planetStatus: [true, true, true, false, false],
  },
};

export const AllCompleted: Story = {
  args: {
    completedPlanets: 5,
    planetStatus: [true, true, true, true, true],
  },
};

export const NoneCompleted: Story = {
  args: {
    completedPlanets: 0,
    planetStatus: [false, false, false, false, false],
  },
};

export const PartialProgress: Story = {
  args: {
    completedPlanets: 2,
    planetStatus: [true, true, false, false, false],
  },
};

export const AlmostComplete: Story = {
  args: {
    completedPlanets: 4,
    planetStatus: [true, true, true, true, false],
  },
};

export const FirstOnly: Story = {
  args: {
    completedPlanets: 1,
    planetStatus: [true, false, false, false, false],
  },
};
