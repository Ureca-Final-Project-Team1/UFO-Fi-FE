import type { Meta, StoryObj } from '@storybook/react';

// Mock AlienCharacter for Storybook
const MockAlienCharacter = () => {
  return (
    <div className="relative z-50 w-full h-full flex justify-center items-center">
      <div className="w-full h-full max-w-full max-h-full object-contain drop-shadow-2xl transition-all duration-300 animate-bounce aspect-square flex items-center justify-center">
        <div className="w-64 h-64 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-6xl shadow-2xl">
          👽
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
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
