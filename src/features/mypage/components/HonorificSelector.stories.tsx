import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

// Mock HonorificSelector for Storybook
const MockHonorificSelector = ({
  honorific = [
    { id: 1, name: '초보 탐험가', level: 0, isActive: false },
    { id: 2, name: '중급 탐험가', level: 1, isActive: false },
    { id: 3, name: '고급 탐험가', level: 2, isActive: false },
    { id: 4, name: '마스터 탐험가', level: 3, isActive: false },
  ],
  selectedId = null,
  onSelect,
}: {
  honorific?: Array<{ id: number; name: string; level: number; isActive: boolean }>;
  selectedId?: number | null;
  onSelect?: (id: number) => void;
}) => {
  const [localSelectedId, setLocalSelectedId] = useState(selectedId);

  const handleSelect = (id: number) => {
    setLocalSelectedId(id);
    onSelect?.(id);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {honorific.map((title) => (
        <button
          key={title.id}
          onClick={() => handleSelect(title.id)}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
            title.id === localSelectedId
              ? 'bg-purple-600 text-white shadow-lg'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {title.name}
        </button>
      ))}
    </div>
  );
};

const meta: Meta<typeof MockHonorificSelector> = {
  title: 'Mypage/HonorificSelector',
  component: MockHonorificSelector,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    onSelect: { action: 'honorific selected' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    honorific: [
      { id: 1, name: '초보 탐험가', level: 0, isActive: false },
      { id: 2, name: '중급 탐험가', level: 1, isActive: false },
      { id: 3, name: '고급 탐험가', level: 2, isActive: false },
      { id: 4, name: '마스터 탐험가', level: 3, isActive: false },
    ],
  },
};

export const WithSelection: Story = {
  args: {
    honorific: [
      { id: 1, name: '초보 탐험가', level: 0, isActive: false },
      { id: 2, name: '중급 탐험가', level: 1, isActive: false },
      { id: 3, name: '고급 탐험가', level: 2, isActive: false },
      { id: 4, name: '마스터 탐험가', level: 3, isActive: false },
    ],
    selectedId: 2,
  },
};

export const SingleHonorific: Story = {
  args: {
    honorific: [{ id: 1, name: '초보 탐험가', level: 0, isActive: false }],
  },
};

export const ManyHonorifics: Story = {
  args: {
    honorific: [
      { id: 1, name: '초보 탐험가', level: 0, isActive: false },
      { id: 2, name: '중급 탐험가', level: 1, isActive: false },
      { id: 3, name: '고급 탐험가', level: 2, isActive: false },
      { id: 4, name: '마스터 탐험가', level: 3, isActive: false },
      { id: 5, name: '전설의 탐험가', level: 4, isActive: false },
      { id: 6, name: '우주 탐험가', level: 5, isActive: false },
      { id: 7, name: '은하수 탐험가', level: 6, isActive: false },
      { id: 8, name: '우주 제왕', level: 7, isActive: false },
    ],
  },
};

export const LongHonorificNames: Story = {
  args: {
    honorific: [
      { id: 1, name: '매우 긴 칭호 이름을 가진 초보 탐험가', level: 0, isActive: false },
      { id: 2, name: '중급 탐험가', level: 1, isActive: false },
      { id: 3, name: '고급 탐험가', level: 2, isActive: false },
    ],
  },
};
