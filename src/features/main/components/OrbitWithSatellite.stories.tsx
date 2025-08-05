import type { Meta, StoryObj } from '@storybook/react';
import Image from 'next/image';

import { IMAGE_PATHS } from '@/constants/images';

// Mock OrbitWithSatellite for Storybook (API 의존성 제거)
const MockOrbitWithSatellite = ({ activeOrbits = 3 }: { activeOrbits?: number }) => {
  const ORBIT_BASE_SIZE = 600;
  const SATELLITE_WIDTH = 30;
  const SATELLITE_HEIGHT = 60;
  const ORBIT_COUNT = 5;

  const orbitConfigs = [
    { color: '#FFD230', speed: 'spin-slow', image: IMAGE_PATHS.SATELLITE_1 },
    { color: '#70C3BB', speed: 'spin-fast', image: IMAGE_PATHS.SATELLITE_2 },
    { color: '#67CBDC', speed: 'spin-reverse-slow', image: IMAGE_PATHS.SATELLITE_3 },
    { color: '#735AB1', speed: 'spin-mid', image: IMAGE_PATHS.SATELLITE_4 },
    { color: '#D24D9B', speed: 'spin-reverse-fast', image: IMAGE_PATHS.SATELLITE_5 },
  ];

  return (
    <div
      className="absolute"
      style={{
        top: '50%',
        left: '50%',
        width: ORBIT_BASE_SIZE,
        height: ORBIT_BASE_SIZE,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {orbitConfigs.map(({ color, speed, image }, i) => {
        const orbitSize = ORBIT_BASE_SIZE - (ORBIT_COUNT - 1 - i) * 80;
        const offset = (ORBIT_BASE_SIZE - orbitSize) / 2;
        const satelliteTransform = `translate(-50%, -${orbitSize / 2 + SATELLITE_HEIGHT / 2}px)`;

        if (activeOrbits > i) {
          return (
            <div key={i}>
              <div
                className={`absolute rounded-full border-2 border-dashed ${speed}`}
                style={{
                  width: orbitSize,
                  height: orbitSize,
                  top: offset,
                  left: offset,
                  borderColor: `${color}50`,
                  zIndex: 5 - i,
                }}
              >
                <div
                  className="absolute"
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: satelliteTransform,
                  }}
                >
                  <Image
                    src={image}
                    alt={`Satellite ${i + 1}`}
                    width={SATELLITE_WIDTH}
                    height={SATELLITE_HEIGHT}
                  />
                </div>
              </div>
            </div>
          );
        }
      })}

      {/* 중앙 행성 + 외계인 */}
      <div className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 relative w-auto h-[220px]">
        {/* 말풍선 */}
        <div className="absolute top-[-90px] left-1/2 -translate-x-1/2 z-20">
          <div className="bg-blue-500 text-white p-3 rounded-lg relative">
            지구인님, 오늘 거래하실 건가요?
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-blue-500"></div>
          </div>
        </div>
        {/* 외계인 */}
        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            top: '-15px',
            zIndex: 1,
          }}
        >
          <Image src={IMAGE_PATHS.ALIEN} alt="Alien" width={60} height={60} />
        </div>

        {/* 행성 */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
          <Image src={IMAGE_PATHS.MY_PLANET} alt="Planet" width={80} height={80} />
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes spin-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }

        .spin-slow {
          animation: spin 20s linear infinite;
        }
        .spin-mid {
          animation: spin 15s linear infinite;
        }
        .spin-fast {
          animation: spin 10s linear infinite;
        }
        .spin-reverse-slow {
          animation: spin-reverse 18s linear infinite;
        }
        .spin-reverse-mid {
          animation: spin-reverse 14s linear infinite;
        }
        .spin-reverse-fast {
          animation: spin-reverse 10s linear infinite;
        }
      `}</style>
    </div>
  );
};

const meta: Meta<typeof MockOrbitWithSatellite> = {
  title: 'Main/OrbitWithSatellite',
  component: MockOrbitWithSatellite,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    activeOrbits: {
      control: { type: 'range', min: 0, max: 5, step: 1 },
      description: '활성화된 궤도 수',
    },
  },
};

export default meta;
type Story = StoryObj<typeof MockOrbitWithSatellite>;

export const Default: Story = {
  args: {
    activeOrbits: 3,
  },
  render: (args) => (
    <div className="w-full h-full flex flex-col bg-gray-900">
      <div className="flex-1 flex items-center justify-center">
        <MockOrbitWithSatellite {...args} />
      </div>
    </div>
  ),
};

export const WithProgressBar: Story = {
  args: {
    activeOrbits: 3,
  },
  render: (args) => (
    <div className="w-full h-full flex flex-col bg-gray-900">
      <div className="flex-1 flex items-center justify-center">
        <MockOrbitWithSatellite {...args} />
      </div>

      {/* 진행률 바 - 실제 메인 페이지와 동일한 위치 */}
      <div className="fixed bottom-32 left-1/2 transform -translate-x-1/2 z-30">
        <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-white text-sm">진행률: 75%</span>
          </div>
          <div className="w-48 h-2 bg-gray-700 rounded-full mt-2">
            <div className="w-3/4 h-full bg-blue-500 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const Desktop: Story = {
  args: {
    activeOrbits: 5,
  },
  render: (args) => (
    <div className="w-full h-full flex flex-col bg-gray-900">
      <div className="flex-1 flex items-center justify-center">
        <MockOrbitWithSatellite {...args} />
      </div>

      {/* 진행률 바 - 실제 메인 페이지와 동일한 위치 */}
      <div className="fixed bottom-32 left-1/2 transform -translate-x-1/2 z-30">
        <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-white text-sm">진행률: 100%</span>
          </div>
          <div className="w-48 h-2 bg-gray-700 rounded-full mt-2">
            <div className="w-full h-full bg-blue-500 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};
