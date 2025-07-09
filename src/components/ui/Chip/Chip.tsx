import React, { useState } from 'react';

import { Icon } from '../Icons';

export interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
  dropdown?: React.ReactNode;
}

/**
 * 재사용 가능한 Chip 컴포넌트
 * - 태그, 상태 표시, 선택/해제, 드롭다운 등 다양한 UI에 사용
 */
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
    const [open, setOpen] = useState(false);
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (dropdown) setOpen((prev) => !prev);
      if (props.onClick) props.onClick(e);
    };
    // 드롭다운이 있을 때 rightIcon이 명시적으로 안 들어오면 자동으로 ChevronDown/Up 처리
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
            ${selected ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-800 text-gray-200 border-gray-700'}
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-blue-400 hover:text-blue-400'}
            ${className}
          `}
          onClick={handleClick}
          {...props}
        >
          {leftIcon && <span className="mr-1 flex items-center">{leftIcon}</span>}
          {children}
          {(rightIcon ?? autoRightIcon) && (
            <span className="ml-1 flex items-center">{rightIcon ?? autoRightIcon}</span>
          )}
        </button>
        {dropdown && open && (
          <div className="absolute z-10 mt-2 min-w-[120px] bg-white rounded shadow-lg text-black">
            {dropdown}
          </div>
        )}
      </div>
    );
  },
);
Chip.displayName = 'Chip';
