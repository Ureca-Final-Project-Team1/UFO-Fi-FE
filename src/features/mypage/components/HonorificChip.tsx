'use client';

import { Honorific } from '@/features';
import { Chip, Icon } from '@/shared';

interface HonorificChipProps extends Omit<React.ComponentProps<typeof Chip>, 'onChange'> {
  honorifics: Honorific[];
  onSelectHonorific?: (name: string) => void;
}

// 이모지 추출 함수
const getHonorificEmoji = (level: number) => {
  const levelIcons = ['🌱', '🪐', '🚀', '👑'];
  return levelIcons[level] ?? '✨';
};

export const HonorificChip = ({ honorifics, onSelectHonorific, ...props }: HonorificChipProps) => {
  const selected = honorifics.find((h) => h.isActive);

  const handleSelect = (name: string, closeDropdown?: () => void) => {
    onSelectHonorific?.(name);
    closeDropdown?.();
  };

  const dropdown =
    honorifics.length > 0
      ? ({ closeDropdown }: { closeDropdown: () => void }) => (
          <div className="flex flex-col py-2 px-1 bg-[#1d1b3a]/90 rounded-xl shadow-[0_0_10px_#8e5eff] backdrop-blur-sm border border-[#8e5eff]/30 min-w-[180px]">
            {honorifics.map((h) => (
              <button
                key={h.id}
                onClick={() => handleSelect(h.name, closeDropdown)}
                className={`flex gap-2 items-center justify-between w-full px-4 py-2 text-sm rounded-md text-white tracking-wide hover:bg-[#3c2f71]/60 transition-all ${
                  h.isActive ? 'text-neon-purple font-semibold' : ''
                }`}
              >
                <div className="flex items-center">
                  <span className="mr-2">{getHonorificEmoji(h.level)}</span>
                  <span className="truncate max-w-[140px]" title={h.name}>
                    {h.name}
                  </span>
                </div>
                {h.isActive && <Icon name="Check" className="size-4 text-neon-purple" />}
              </button>
            ))}
          </div>
        )
      : undefined;

  return (
    <Chip
      dropdown={dropdown}
      {...props}
      rightIcon={false}
      className={`
    w-[90px] h-[70px] rounded-2xl px-2 py-1
    flex flex-col items-center justify-center
    text-[var(--color-primary-foreground)] text-center leading-tight
    bg-[var(--color-primary-500)] shadow-[0_2px_4px_rgba(0,0,0,0.15)]
    border border-[var(--color-primary-400)]
    hover:brightness-110 transition-all
    font-semibold
    ${props.className}
  `}
    >
      {selected ? (
        <>
          <span className="text-xl mb-1">{getHonorificEmoji(selected.level)}</span>
          <span className="text-[11px] leading-tight break-keep">{selected.name}</span>
        </>
      ) : (
        <span className="text-xs">칭호 없음</span>
      )}
    </Chip>
  );
};
