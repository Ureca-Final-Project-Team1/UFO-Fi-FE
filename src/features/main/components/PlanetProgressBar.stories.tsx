import type { Meta, StoryObj } from '@storybook/react';
import Image from 'next/image';

import { IMAGE_PATHS } from '@/constants/images';

// Mock PlanetProgressBar for Storybook (useLetters 훅 의존성 제거)
const MockPlanetProgressBar = ({ completed = 2 }: { completed?: number }) => {
  const planets = [
    { id: 1, src: IMAGE_PATHS.PLANET_1, active: completed >= 1, color: '#b39645' },
    { id: 2, src: IMAGE_PATHS.PLANET_2, active: completed >= 2, color: '#45b3b0' },
    { id: 3, src: IMAGE_PATHS.PLANET_3, active: completed >= 3, color: '#4564b3' },
    { id: 4, src: IMAGE_PATHS.PLANET_4, active: completed >= 4, color: '#8745b3' },
    { id: 5, src: IMAGE_PATHS.PLANET_5, active: completed >= 5, color: '#b3459b' },
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
      <p className="text-white text-sm pyeongchangpeace-title-2">
        {completed}번째 은하까지 탐사 완료...
      </p>

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
              <Image src={p.src} alt="planet" width={42} height={42} />
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
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile1',
    },
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
type Story = StoryObj<typeof MockPlanetProgressBar>;

export const Default: Story = {
  args: {
    completed: 2,
  },
  render: (args) => (
    <div className="w-full h-full flex flex-col bg-gray-900">
      <div className="flex-1 flex items-center justify-center">
        {/* 중앙 콘텐츠 영역 */}
        <div className="text-center">
          <h1 className="text-white text-2xl font-bold mb-4">메인 페이지</h1>
          <p className="text-gray-300">진행률 바가 하단에 표시됩니다</p>
        </div>
      </div>

      {/* 진행률 바 - 실제 메인 페이지와 동일한 위치 */}
      <div className="fixed bottom-32 left-1/2 transform -translate-x-1/2 z-30">
        <MockPlanetProgressBar {...args} />
      </div>
    </div>
  ),
};

export const Desktop: Story = {
  args: {
    completed: 4,
  },
  render: (args) => (
    <div className="w-full h-full flex flex-col bg-gray-900">
      <div className="flex-1 flex items-center justify-center">
        {/* 중앙 콘텐츠 영역 */}
        <div className="text-center">
          <h1 className="text-white text-2xl font-bold mb-4">데스크톱 메인 페이지</h1>
          <p className="text-gray-300">진행률 바가 하단에 표시됩니다</p>
        </div>
      </div>

      {/* 진행률 바 - 실제 메인 페이지와 동일한 위치 */}
      <div className="fixed bottom-32 left-1/2 transform -translate-x-1/2 z-30">
        <MockPlanetProgressBar {...args} />
      </div>
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};
