import * as React from 'react';

import { cn } from '@/lib/utils';

import { CustomInputProps } from './Input.types';
import { inputVariants } from './inputVariants';

const Input = React.forwardRef<HTMLInputElement, CustomInputProps>(
  ({ className, type = 'text', variant = 'default', label, error, ...props }, ref) => {
    const isBlueFill = variant === 'blueFill';
    const baseClass = inputVariants({ variant });
    const defaultClass =
      'file:text-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-base text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive';
    const whiteBorderClass =
      variant === 'whiteBorder' ? 'bg-white text-black placeholder:text-gray-400' : '';
    return (
      <div className="w-full space-y-1">
        {label && <label className="text-sm font-medium text-white">{label}</label>}
        <input
          ref={ref}
          type={type}
          data-slot="input"
          className={cn(baseClass, isBlueFill ? null : defaultClass, whiteBorderClass, className)}
          {...props}
        />
        {error && <p className="text-xs text-destructive">{error}</p>}
      </div>
    );
  },
);

Input.displayName = 'Input';

export { Input };
