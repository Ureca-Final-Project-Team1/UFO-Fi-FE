import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

// Mock HonorificChip for Storybook
const MockHonorificChip = ({
  honorifics = [
    { id: 1, name: '초보 탐험가', level: 0, isActive: true },
    { id: 2, name: '중급 탐험가', level: 1, isActive: false },
    { id: 3, name: '고급 탐험가', level: 2, isActive: false },
    { id: 4, name: '마스터 탐험가', level: 3, isActive: false },
  ],
  onSelectHonorific,
}: {
  honorifics?: Array<{ id: number; name: string; level: number; isActive: boolean }>;
  onSelectHonorific?: (name: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [localHonorifics, setLocalHonorifics] = useState(honorifics);

  const getHonorificEmoji = (level: number) => {
    const levelIcons = ['🌱', '🪐', '🚀', '👑'];
    return levelIcons[level] ?? '✨';
  };

  const selected = localHonorifics.find((h) => h.isActive);

  const handleSelect = (name: string) => {
    setLocalHonorifics((prev) =>
      prev.map((h) => ({
        ...h,
        isActive: h.name === name,
      })),
    );
    onSelectHonorific?.(name);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-[90px] h-[70px] rounded-2xl px-2 py-1 flex flex-col items-center justify-center text-white text-center leading-tight bg-purple-600 shadow-lg border border-purple-500 hover:brightness-110 transition-all font-semibold"
      >
        {selected ? (
          <>
            <span className="text-xl mb-1">{getHonorificEmoji(selected.level)}</span>
            <span className="text-[11px] leading-tight break-keep">{selected.name}</span>
          </>
        ) : (
          <span className="text-xs">칭호 없음</span>
        )}
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 left-0 z-50 flex flex-col py-2 px-1 bg-[#1d1b3a]/90 rounded-xl shadow-[0_0_10px_#8e5eff] backdrop-blur-sm border border-[#8e5eff]/30 min-w-[180px]">
          {localHonorifics.map((h) => (
            <button
              key={h.id}
              onClick={() => handleSelect(h.name)}
              className={`flex gap-2 items-center justify-between w-full px-4 py-2 text-sm rounded-md text-white tracking-wide hover:bg-[#3c2f71]/60 transition-all ${
                h.isActive ? 'text-purple-400 font-semibold' : ''
              }`}
            >
              <div className="flex items-center">
                <span className="mr-2">{getHonorificEmoji(h.level)}</span>
                <span className="truncate max-w-[140px]" title={h.name}>
                  {h.name}
                </span>
              </div>
              {h.isActive && <span className="text-purple-400">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const meta: Meta<typeof MockHonorificChip> = {
  title: 'Mypage/HonorificChip',
  component: MockHonorificChip,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    onSelectHonorific: { action: 'honorific selected' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    honorifics: [
      { id: 1, name: '초보 탐험가', level: 0, isActive: true },
      { id: 2, name: '중급 탐험가', level: 1, isActive: false },
      { id: 3, name: '고급 탐험가', level: 2, isActive: false },
      { id: 4, name: '마스터 탐험가', level: 3, isActive: false },
    ],
  },
};

export const NoHonorifics: Story = {
  args: {
    honorifics: [],
  },
};

export const SingleHonorific: Story = {
  args: {
    honorifics: [{ id: 1, name: '초보 탐험가', level: 0, isActive: true }],
  },
};

export const LongHonorificName: Story = {
  args: {
    honorifics: [
      { id: 1, name: '매우 긴 칭호 이름을 가진 탐험가', level: 0, isActive: true },
      { id: 2, name: '중급 탐험가', level: 1, isActive: false },
      { id: 3, name: '고급 탐험가', level: 2, isActive: false },
    ],
  },
};

export const HighLevel: Story = {
  args: {
    honorifics: [
      { id: 1, name: '초보 탐험가', level: 0, isActive: false },
      { id: 2, name: '중급 탐험가', level: 1, isActive: false },
      { id: 3, name: '고급 탐험가', level: 2, isActive: false },
      { id: 4, name: '마스터 탐험가', level: 3, isActive: true },
    ],
  },
};
