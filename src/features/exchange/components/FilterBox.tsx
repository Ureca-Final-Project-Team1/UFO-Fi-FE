'use client';
import React from 'react';

import { cn } from '@/lib/utils';

import '@/styles/globals.css';
import { FilterBoxProps } from '../types/FilterBoxProps';

interface FilterBoxWithChildren extends FilterBoxProps {
  children?: React.ReactNode;
  className?: string;
}

export const FilterBox = ({
  name,
  isMultipleSelection = false,
  className,
  children,
}: FilterBoxWithChildren) => {
  return (
    <div
      className={cn(
        'relative min-w-full min-h-fit rounded-2xl px-4 py-3 text-white shadow-md overflow-hidden',
        className,
      )}
    >
      <div className="relative z-10 flex flex-col items-start justify-start w-full gap-3">
        <div className="body-18-bold">{name}</div>
      </div>

      <div
        className="absolute inset-0 w-full min-h-full rounded-2xl"
        style={{
          background: 'var(--bg-trade-card)',
          opacity: 0.65,
        }}
      />
      <div className="relative z-10 flex flex-col items-start justify-start w-full gap-3">
        {isMultipleSelection && <div className="caption-11-regular">중복 선택 가능</div>}
        {children}
      </div>
    </div>
  );
};
