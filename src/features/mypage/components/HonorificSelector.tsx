'use client';

import React from 'react';

import { Chip } from '@/shared';
import { Achievement } from '@/types/Achievement';

interface HonorificSelectorProps {
  achievements: Achievement[];
  selectedId: number | null;
  onSelect: (id: number) => void;
}

export function HonorificSelector({ achievements, selectedId, onSelect }: HonorificSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {achievements.map((title) => (
        <Chip
          key={title.id}
          selected={title.id === selectedId}
          onClick={() => onSelect(title.id)}
          dropdown={<p className="p-2 text-sm">{title.description}</p>}
        >
          {title.name}
        </Chip>
      ))}
    </div>
  );
}
