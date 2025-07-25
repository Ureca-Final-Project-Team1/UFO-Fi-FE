import React from 'react';

import { cn } from '@/lib/utils';

import { TableCheckboxProps } from '../Table.types';

export function TableCheckbox({
  checked,
  onChange,
  disabled = false,
  indeterminate = false,
  label = '선택',
}: TableCheckboxProps) {
  return (
    <div className="relative">
      <input
        type="checkbox"
        checked={checked}
        onChange={() => {}}
        disabled={disabled}
        className="sr-only"
        aria-label={label}
      />
      <div
        onClick={() => !disabled && onChange()}
        onKeyDown={(e) => {
          if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onChange();
          }
        }}
        tabIndex={disabled ? -1 : 0}
        role="checkbox"
        aria-checked={indeterminate ? 'mixed' : checked}
        aria-label={label}
        className={cn(
          'w-5 h-5 border-2 rounded-sm cursor-pointer transition-all duration-200',
          'flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
          {
            'bg-blue-600 border-blue-600': checked && !indeterminate,
            'bg-blue-600 border-blue-700': indeterminate,
            'bg-white border-gray-400 hover:border-blue-400': !checked && !indeterminate,
            'opacity-50 cursor-not-allowed': disabled,
          },
        )}
      >
        {checked && !indeterminate && (
          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        )}
        {indeterminate && (
          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>
    </div>
  );
}
