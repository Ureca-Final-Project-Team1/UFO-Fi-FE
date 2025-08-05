import type { Meta, StoryObj } from '@storybook/react';

import { IMAGE_PATHS } from '@/constants';

import PlanetWithSatellite from './PlanetWithSatellite';

// Mock SignalProgressBar for Storybook
const MockSignalProgressBar = ({
  completedPlanets = 2,
  planetStatus = [true, true, false, false, false],
}: {
  completedPlanets?: number;
  planetStatus?: boolean[];
}) => {
  const PLANET_SIZE = 60;

  const PLANETS = [
    IMAGE_PATHS.PLANET_1,
    IMAGE_PATHS.PLANET_2,
    IMAGE_PATHS.PLANET_3,
    IMAGE_PATHS.PLANET_4,
    IMAGE_PATHS.PLANET_5,
  ];

  const SATELLITES = [
    IMAGE_PATHS.SATELLITE_1,
    IMAGE_PATHS.SATELLITE_2,
    IMAGE_PATHS.SATELLITE_3,
    IMAGE_PATHS.SATELLITE_4,
    IMAGE_PATHS.SATELLITE_5,
  ];

  return (
    <div className="w-full bg-gray-900 p-4">
      <div className="max-w-md mx-auto">
        <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
          <h2 className="text-white text-base font-semibold mb-4">탐사 진행 현황</h2>

          <section
            aria-label="탐사 진행 현황"
            className="flex flex-col items-center w-full gap-4 px-4"
          >
            {/* 진행 텍스트 */}
            <p className="text-white text-md pyeongchangpeace-title-2 mb-5" aria-live="polite">
              {completedPlanets}번째 은하까지 탐사 완료...
            </p>

            {/* 선 + 행성 아이콘 */}
            <div className="relative flex items-center justify-center w-full">
              {/* 가운데 점선 선 */}
              <div className="absolute inset-x-4 top-1/2 rounded-full border border-dashed border-gray-400 -translate-y-1/2" />

              {/* 행성들 */}
              <div className="flex gap-3 relative z-10">
                {PLANETS.map((planet, index) => (
                  <PlanetWithSatellite
                    key={index}
                    planetSrc={planet}
                    satelliteSrc={SATELLITES[index]}
                    planetSize={PLANET_SIZE}
                    isArrived={planetStatus[index]}
                  />
                ))}
              </div>

              {/* 진행 상태 카운터 */}
              <div
                className="flex items-center justify-center size-12 rounded-full text-white text-sm ml-3 relative z-10 flex-shrink-0"
                style={{ backgroundColor: '#222' }}
              >
                {completedPlanets}/{PLANETS.length}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

const meta: Meta<typeof MockSignalProgressBar> = {
  title: 'Signal/SignalProgressBar',
  component: MockSignalProgressBar,
  parameters: {
    layout: 'padded',
    viewport: {
      defaultViewport: 'mobile1',
    },
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
type Story = StoryObj<typeof MockSignalProgressBar>;

export const Default: Story = {
  args: {
    completedPlanets: 2,
    planetStatus: [true, true, false, false, false],
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
    completedPlanets: 3,
    planetStatus: [true, true, true, false, false],
  },
};

export const Desktop: Story = {
  args: {
    completedPlanets: 2,
    planetStatus: [true, true, false, false, false],
  },
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};
