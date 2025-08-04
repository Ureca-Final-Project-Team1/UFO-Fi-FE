import type { Meta, StoryObj } from '@storybook/react';

// Mock OrbitWithSatellite for Storybook
const MockOrbitWithSatellite = ({ activeOrbits = 3 }: { activeOrbits?: number }) => {
  const ORBIT_BASE_SIZE = 600;
  const SATELLITE_HEIGHT = 60;
  const ORBIT_COUNT = 5;

  const orbitConfigs = [
    { color: '#FFD230', speed: 'spin-slow', emoji: '🛰️' },
    { color: '#70C3BB', speed: 'spin-fast', emoji: '🛰️' },
    { color: '#67CBDC', speed: 'spin-reverse-slow', emoji: '🛰️' },
    { color: '#735AB1', speed: 'spin-mid', emoji: '🛰️' },
    { color: '#D24D9B', speed: 'spin-reverse-fast', emoji: '🛰️' },
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
      {orbitConfigs.map(({ color, speed, emoji }, i) => {
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
                  <div className="text-2xl">{emoji}</div>
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
          className="absolute left-1/2 -translate-x-1/2 text-6xl"
          style={{
            top: '-15px',
            zIndex: 1,
          }}
        >
          👽
        </div>

        {/* 행성 */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-8xl">🌍</div>
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
    layout: 'padded',
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
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    activeOrbits: 3,
  },
};

export const NoOrbits: Story = {
  args: {
    activeOrbits: 0,
  },
};

export const OneOrbit: Story = {
  args: {
    activeOrbits: 1,
  },
};

export const AllOrbits: Story = {
  args: {
    activeOrbits: 5,
  },
};

export const WithBackground: Story = {
  args: {
    activeOrbits: 3,
  },
  parameters: {
    docs: {
      description: {
        story: '배경이 있는 환경에서 궤도 애니메이션이 어떻게 보이는지 확인할 수 있습니다.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="bg-gray-900 p-4 min-h-screen relative">
        <Story />
      </div>
    ),
  ],
};
