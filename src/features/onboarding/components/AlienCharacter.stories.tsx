import type { Meta, StoryObj } from '@storybook/react';
import Image from 'next/image';

import { IMAGE_PATHS } from '@/constants/images';

// Mock AlienCharacter for Storybook
const MockAlienCharacter = () => {
  return (
    <div className="w-full bg-gray-900 p-4">
      <div className="max-w-md mx-auto">
        <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
          <h2 className="text-white text-base font-semibold mb-4">외계인 캐릭터</h2>

          <div className="relative z-50 w-full h-full flex justify-center items-center">
            <Image
              src={IMAGE_PATHS['AL_ONBOARDING']}
              alt="UFO-Fi 외계인"
              width={500}
              height={500}
              className="w-full h-full max-w-full max-h-full object-contain drop-shadow-2xl transition-all duration-300 animate-bounce aspect-square"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const meta: Meta<typeof MockAlienCharacter> = {
  title: 'Onboarding/AlienCharacter',
  component: MockAlienCharacter,
  parameters: {
    layout: 'padded',
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MockAlienCharacter>;

export const Default: Story = {
  args: {},
};

export const Desktop: Story = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};
