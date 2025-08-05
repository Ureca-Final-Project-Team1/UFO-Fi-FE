import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { IMAGE_PATHS } from '@/constants';

import PlanetWithSatellite from './PlanetWithSatellite';

// Mock PlanetWithSatellite for Storybook
const MockPlanetWithSatellite = ({
  planetSrc = IMAGE_PATHS.PLANET_1,
  satelliteSrc = IMAGE_PATHS.SATELLITE_1,
  planetSize = 60,
  isArrived = true,
}: {
  planetSrc?: string;
  satelliteSrc?: string;
  planetSize?: number;
  isArrived?: boolean;
}) => {
  return (
    <div className="w-full bg-gray-900 p-4">
      <div className="max-w-md mx-auto">
        <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
          <h2 className="text-white text-base font-semibold mb-4">행성과 위성</h2>

          <div className="flex justify-center">
            <PlanetWithSatellite
              planetSrc={planetSrc}
              satelliteSrc={satelliteSrc}
              planetSize={planetSize}
              isArrived={isArrived}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const meta: Meta<typeof MockPlanetWithSatellite> = {
  title: 'Signal/PlanetWithSatellite',
  component: MockPlanetWithSatellite,
  parameters: {
    layout: 'padded',
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    planetSrc: {
      control: { type: 'select' },
      options: [
        IMAGE_PATHS.PLANET_1,
        IMAGE_PATHS.PLANET_2,
        IMAGE_PATHS.PLANET_3,
        IMAGE_PATHS.PLANET_4,
        IMAGE_PATHS.PLANET_5,
      ],
      description: '행성 이미지 경로',
    },
    satelliteSrc: {
      control: { type: 'select' },
      options: [
        IMAGE_PATHS.SATELLITE_1,
        IMAGE_PATHS.SATELLITE_2,
        IMAGE_PATHS.SATELLITE_3,
        IMAGE_PATHS.SATELLITE_4,
        IMAGE_PATHS.SATELLITE_5,
      ],
      description: '위성 이미지 경로',
    },
    planetSize: {
      control: { type: 'number', min: 40, max: 120 },
      description: '행성 크기 (픽셀)',
    },
    isArrived: {
      control: { type: 'boolean' },
      description: '도착 여부 (위성 표시 여부)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof MockPlanetWithSatellite>;

export const Default: Story = {
  args: {
    planetSrc: IMAGE_PATHS.PLANET_1,
    satelliteSrc: IMAGE_PATHS.SATELLITE_1,
    planetSize: 60,
    isArrived: true,
  },
};

export const NotArrived: Story = {
  args: {
    planetSrc: IMAGE_PATHS.PLANET_2,
    satelliteSrc: IMAGE_PATHS.SATELLITE_2,
    planetSize: 60,
    isArrived: false,
  },
};

export const LargePlanet: Story = {
  args: {
    planetSrc: IMAGE_PATHS.PLANET_3,
    satelliteSrc: IMAGE_PATHS.SATELLITE_3,
    planetSize: 80,
    isArrived: true,
  },
};

export const SmallPlanet: Story = {
  args: {
    planetSrc: IMAGE_PATHS.PLANET_4,
    satelliteSrc: IMAGE_PATHS.SATELLITE_4,
    planetSize: 40,
    isArrived: false,
  },
};

export const Desktop: Story = {
  args: {
    planetSrc: IMAGE_PATHS.PLANET_5,
    satelliteSrc: IMAGE_PATHS.SATELLITE_5,
    planetSize: 60,
    isArrived: true,
  },
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};
