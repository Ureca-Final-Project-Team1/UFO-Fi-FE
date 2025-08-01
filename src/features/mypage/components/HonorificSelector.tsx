'use client';

import React from 'react';

import { Chip } from '@/shared';
import { Honorific } from '@/types/Achievement';

interface HonorificSelectorProps {
  honorific: Honorific[];
  selectedId: number | null;
  onSelect: (id: number) => void;
}

export function HonorificSelector({ honorific, selectedId, onSelect }: HonorificSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {honorific.map((title) => (
        <Chip
          key={title.id}
          selected={title.id === selectedId}
          onClick={() => onSelect(title.id)}
          dropdown={<p className="p-2 text-sm">{title.name}</p>}
        >
          {title.name}
        </Chip>
      ))}
    </div>
  );
}
