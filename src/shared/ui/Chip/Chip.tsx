'use client';

import React, { useState } from 'react';

import { cn } from '@/lib/utils';

import { Icon } from '../Icons';
import type { ChipProps } from './Chip.types';
import { chipVariants } from './chipVariants';

export const Chip = React.forwardRef<HTMLButtonElement, ChipProps>(
  (
    {
      selected = false,
      disabled = false,
      variant = 'default',
      size = 'md',
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

    // 상태에 따른 state prop 결정
    const chipState = disabled ? 'disabled' : selected ? 'selected' : 'default';

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
      <div>
        <button
          ref={ref}
          type="button"
          disabled={disabled}
          className={cn(chipVariants({ variant, size, state: chipState }), className)}
          style={{
            fontSize: 'clamp(10px, 1.4vw, 14px)',
            ...rest.style,
          }}
          onClick={handleDropdownOpenClick}
          {...rest}
        >
          {leftIcon && (
            <span className="flex items-center" style={{ marginRight: 'clamp(2px, 0.5vw, 8px)' }}>
              {leftIcon}
            </span>
          )}
          {children}
          {(rightIcon ?? autoRightIcon) && (
            <span className="flex items-center" style={{ marginLeft: 'clamp(2px, 0.5vw, 8px)' }}>
              {rightIcon ?? autoRightIcon}
            </span>
          )}
        </button>
        {dropdown && open && (
          <div
            className="absolute z-10 bg-white rounded-sm shadow-lg text-black"
            style={{
              marginTop: 'clamp(4px, 1vw, 8px)',
              minWidth: 'clamp(100px, 15vw, 120px)',
            }}
          >
            {typeof dropdown === 'function' ? dropdown({ closeDropdown }) : dropdown}
          </div>
        )}
      </div>
    );
  },
);

Chip.displayName = 'Chip';
