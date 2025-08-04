import type { Meta, StoryObj } from '@storybook/react';

// Mock PlanetWithSatellite for Storybook
const MockPlanetWithSatellite = ({
  planetSize = 60,
  isArrived = true,
  className = '',
}: {
  planetSize?: number;
  isArrived?: boolean;
  className?: string;
}) => {
  const SATELLITE_SIZE = 30;
  const SATELLITE_OFFSET_TOP = -35;

  return (
    <div
      className={`relative flex flex-col items-center z-10 ${className}`}
      style={{ minWidth: planetSize, height: planetSize }}
    >
      {/* 도착한 경우에만 위성 표시 */}
      {isArrived && (
        <div
          className="absolute w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-sm"
          style={{
            width: SATELLITE_SIZE,
            height: SATELLITE_SIZE,
            top: `${SATELLITE_OFFSET_TOP}px`,
          }}
        >
          📡
        </div>
      )}

      <div
        className={`w-full h-full rounded-full flex items-center justify-center text-3xl ${
          isArrived ? 'bg-blue-500' : 'bg-gray-600 grayscale'
        }`}
        style={{ width: planetSize, height: planetSize }}
      >
        {isArrived ? '🪐' : '🌑'}
      </div>
    </div>
  );
};

const meta: Meta<typeof MockPlanetWithSatellite> = {
  title: 'Signal/PlanetWithSatellite',
  component: MockPlanetWithSatellite,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    planetSize: {
      control: { type: 'number', min: 40, max: 120 },
      description: '행성 크기',
    },
    isArrived: {
      control: { type: 'boolean' },
      description: '도달 상태',
    },
    className: {
      control: { type: 'text' },
      description: '추가 CSS 클래스',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Arrived: Story = {
  args: {
    planetSize: 60,
    isArrived: true,
  },
};

export const NotArrived: Story = {
  args: {
    planetSize: 60,
    isArrived: false,
  },
};

export const LargePlanet: Story = {
  args: {
    planetSize: 100,
    isArrived: true,
  },
};

export const SmallPlanet: Story = {
  args: {
    planetSize: 40,
    isArrived: true,
  },
};

export const LargeNotArrived: Story = {
  args: {
    planetSize: 100,
    isArrived: false,
  },
};

export const SmallNotArrived: Story = {
  args: {
    planetSize: 40,
    isArrived: false,
  },
};
