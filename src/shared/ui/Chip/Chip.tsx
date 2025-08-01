'use client';

import React, { useState } from 'react';

import { Icon } from '../Icons';
import type { ChipProps } from './Chip.types';

export const Chip = React.forwardRef<HTMLButtonElement, ChipProps>(
  (
    {
      selected = false,
      disabled = false,
      leftIcon,
      rightIcon,
      children,
      className = '',
      dropdown,
      ...props
    },
    ref,
  ) => {
    const { onClick, ...rest } = props;
    const [open, setOpen] = useState(false);
    const handleDropdownOpenClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (dropdown) {
        setOpen((prev) => !prev);
      }
      onClick?.(e);
    };

    const closeDropdown = () => {
      setOpen(false);
    };

    const autoRightIcon = dropdown ? (
      open ? (
        <Icon name="ChevronUp" />
      ) : (
        <Icon name="ChevronDown" />
      )
    ) : undefined;

    return (
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <button
          ref={ref}
          type="button"
          disabled={disabled}
          className={`
            px-3 py-1 rounded-full text-sm font-medium
            border transition-colors flex items-center gap-1
            ${selected ? 'bg-primary-600 text-white border-primary-600' : 'bg-gray-800 text-gray-200 border-gray-700'}
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-primary-400 hover:text-primary-400'}
            ${className}
          `}
          onClick={handleDropdownOpenClick}
          {...rest}
        >
          {leftIcon && <span className="mr-1 flex items-center">{leftIcon}</span>}
          {children}
          {(rightIcon ?? autoRightIcon) && (
            <span className="ml-1 flex items-center">{rightIcon ?? autoRightIcon}</span>
          )}
        </button>
        {dropdown && open && (
          <div className="absolute z-10 mt-2 min-w-[120px] bg-white rounded-sm shadow-lg text-black">
            {typeof dropdown === 'function' ? dropdown({ closeDropdown }) : dropdown}
          </div>
        )}
      </div>
    );
  },
);
Chip.displayName = 'Chip';
