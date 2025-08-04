import type { Meta, StoryObj } from '@storybook/react';

// Mock PlanetProgressBar for Storybook
const MockPlanetProgressBar = ({ completed = 2 }: { completed?: number }) => {
  const planets = [
    { id: 1, active: completed >= 1, color: '#b39645' },
    { id: 2, active: completed >= 2, color: '#45b3b0' },
    { id: 3, active: completed >= 3, color: '#4564b3' },
    { id: 4, active: completed >= 4, color: '#8745b3' },
    { id: 5, active: completed >= 5, color: '#b3459b' },
  ];

  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  return (
    <div className="flex flex-col items-center w-full gap-10 px-4">
      {/* 진행 텍스트 */}
      <p className="text-white text-sm">{completed}번째 은하까지 탐사 완료...</p>

      {/* 행성 + 점선 궤도 */}
      <div className="relative flex items-center justify-center w-full">
        {/* 점선 궤도 */}
        <div className="absolute inset-x-4 top-1/2 rounded-full border border-dashed border-gray-400 -translate-y-1/2" />

        {/* 행성들 */}
        <div className="flex gap-3 relative z-10">
          {planets.map((p) => (
            <div
              key={p.id}
              className="relative size-10 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: p.active ? p.color : 'transparent',
                boxShadow: p.active
                  ? `
                    0 0 0 6px ${hexToRgba(p.color, 0.6)},
                    0 0 0 12px ${hexToRgba(p.color, 0.4)},
                    0 0 0 18px ${hexToRgba(p.color, 0.2)}
                  `
                  : 'none',
              }}
            >
              <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                🌍
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center size-12 rounded-full bg-[#222] text-white text-sm ml-3 relative z-10 flex-shrink-0">
          {completed}/{planets.length}
        </div>
      </div>
    </div>
  );
};

const meta: Meta<typeof MockPlanetProgressBar> = {
  title: 'Main/PlanetProgressBar',
  component: MockPlanetProgressBar,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    completed: {
      control: { type: 'range', min: 0, max: 5, step: 1 },
      description: '완료된 행성 수',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    completed: 2,
  },
};

export const NoProgress: Story = {
  args: {
    completed: 0,
  },
};

export const HalfProgress: Story = {
  args: {
    completed: 3,
  },
};

export const AlmostComplete: Story = {
  args: {
    completed: 4,
  },
};

export const Complete: Story = {
  args: {
    completed: 5,
  },
};

export const WithBackground: Story = {
  args: {
    completed: 2,
  },
  parameters: {
    docs: {
      description: {
        story: '배경이 있는 환경에서 진행률 바가 어떻게 보이는지 확인할 수 있습니다.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="bg-gray-900 p-4 min-h-screen">
        <Story />
      </div>
    ),
  ],
};
