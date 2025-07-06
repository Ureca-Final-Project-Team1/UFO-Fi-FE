import type { Meta, StoryObj } from '@storybook/nextjs';

import { ICON_SIZES, ICON_COLORS } from '@/constants/icons';

import {
  Icon,
  LucideIcon,
  UFOIcon,
  PurchaseIcon,
  PlanetIcon,
  TrendingIcon,
  AstronautIcon,
} from './index';

const meta: Meta<typeof Icon> = {
  title: 'UI/Icons',
  component: Icon,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'UFO-Fi 프로젝트의 통합 아이콘 시스템입니다. Lucide React 아이콘, 커스텀 SVG 아이콘, 이미지 아이콘을 지원합니다.',
      },
    },
  },
  argTypes: {
    name: {
      control: 'select',
      options: ['Plus', 'Bell', 'User', 'ufo', 'astronaut', 'planet', 'trending', 'purchase'],
      description: '아이콘 이름',
    },
    size: {
      control: 'select',
      options: Object.keys(ICON_SIZES),
      description: '아이콘 크기',
    },
    color: {
      control: 'select',
      options: Object.keys(ICON_COLORS),
      description: '아이콘 색상',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Playground: Story = {
  args: {
    name: 'ufo',
    size: 'lg',
    color: 'primary',
  },
  render: (args) => (
    <div className="flex items-center justify-center min-h-[200px] p-4">
      <Icon {...args} />
    </div>
  ),
};

export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => (
    <div className="flex items-center justify-center min-h-[200px] p-4">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-md">
        {Object.entries(ICON_SIZES).map(([sizeName]) => (
          <div
            key={sizeName}
            className="flex items-center justify-center gap-2 p-2 bg-gray-50 rounded"
          >
            <Icon name="ufo" size={sizeName as keyof typeof ICON_SIZES} color="primary" />
            <span className="text-xs text-gray-600">{sizeName}</span>
          </div>
        ))}
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '모든 아이콘 크기를 보여줍니다.',
      },
    },
  },
};

export const AllColors: Story = {
  name: 'All Colors',
  render: () => (
    <div className="flex items-center justify-center min-h-[200px] p-4">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-md">
        {Object.keys(ICON_COLORS).map((colorName) => (
          <div
            key={colorName}
            className="flex items-center justify-center gap-2 p-2 bg-gray-50 rounded"
          >
            <Icon name="ufo" size="lg" color={colorName as keyof typeof ICON_COLORS} />
            <span className="text-xs text-gray-600">{colorName}</span>
          </div>
        ))}
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '모든 아이콘 색상을 보여줍니다.',
      },
    },
  },
};

// Lucide 아이콘들
export const LucideIcons: Story = {
  name: 'Lucide Icons',
  render: () => (
    <div className="flex items-center justify-center min-h-[250px] p-4">
      <div className="grid grid-cols-3 md:grid-cols-5 gap-3 max-w-2xl">
        {(
          [
            'Plus',
            'Bell',
            'User',
            'Home',
            'Search',
            'Settings',
            'Menu',
            'X',
            'Heart',
            'Star',
          ] as const
        ).map((iconName) => (
          <div key={iconName} className="flex flex-col items-center gap-1 p-2 bg-gray-50 rounded">
            <LucideIcon name={iconName} size="md" color="primary" />
            <span className="text-xs text-gray-600">{iconName}</span>
          </div>
        ))}
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Lucide React 아이콘들을 보여줍니다.',
      },
    },
  },
};

// 커스텀 아이콘들
export const CustomIcons: Story = {
  name: 'Custom Icons',
  render: () => (
    <div className="flex items-center justify-center min-h-[200px] p-4">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-md">
        <div className="flex flex-col items-center gap-1 p-3 bg-gray-50 rounded">
          <UFOIcon size="lg" color="primaryLight" />
          <span className="text-xs text-gray-600">UFO</span>
        </div>
        <div className="flex flex-col items-center gap-1 p-3 bg-gray-50 rounded">
          <PurchaseIcon size="lg" color="primary" />
          <span className="text-xs text-gray-600">Purchase</span>
        </div>
        <div className="flex flex-col items-center gap-1 p-3 bg-gray-50 rounded">
          <PlanetIcon size="lg" color="secondaryCyan" />
          <span className="text-xs text-gray-600">Planet</span>
        </div>
        <div className="flex flex-col items-center gap-1 p-3 bg-gray-50 rounded">
          <TrendingIcon size="lg" color="positive" />
          <span className="text-xs text-gray-600">Trending</span>
        </div>
        <div className="flex flex-col items-center gap-1 p-3 bg-gray-50 rounded">
          <AstronautIcon size="lg" color="primary" />
          <span className="text-xs text-gray-600">Astronaut</span>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'UFO-Fi 전용 커스텀 아이콘들을 보여줍니다.',
      },
    },
  },
};
