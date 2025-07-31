'use client';

import { useState } from 'react';

import { Chip } from '@/shared';
import { Honorific } from '@/types/Achievement';

interface HonorificChipProps extends Omit<React.ComponentProps<typeof Chip>, 'onChange'> {
  honorifics: Honorific[];
  onSelectHonorific?: (name: string) => void;
}

export const HonorificChip = ({
  honorifics,
  onSelectHonorific,
  children,
  ...props
}: HonorificChipProps) => {
  const selected = honorifics.find((h) => h.isActive);
  const unselected = honorifics.filter((h) => !h.isActive);
  const [renderKey, setRenderKey] = useState(0);

  const handleSelect = (name: string) => {
    onSelectHonorific?.(name);
    setRenderKey((prev) => prev + 1);
  };

  const dropdown =
    unselected.length > 0 ? (
      <div className="flex flex-col py-1 text-sm">
        {unselected.map((h) => (
          <button
            key={h.id}
            onClick={() => handleSelect(h.name)}
            className="text-left px-3 py-1 hover:bg-gray-100"
            role="menuitem"
            tabIndex={0}
          >
            {h.name}
          </button>
        ))}
      </div>
    ) : undefined;

  return (
    <Chip key={renderKey} dropdown={dropdown} {...props}>
      {children ?? selected?.name ?? '칭호 없음'}
    </Chip>
  );
};
