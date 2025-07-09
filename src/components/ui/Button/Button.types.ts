import { VariantProps } from 'class-variance-authority';
import React from 'react';

import { buttonVariants } from './buttonVariants';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'destructive'
  | 'outline'
  | 'ghost'
  | 'link'
  | 'exploration-button'
  | 'cancel-button'
  | 'number-badge'
  | 'action-button'
  | 'next-button'
  | 'project-button';

export type ButtonSize = 'sm' | 'default' | 'lg' | 'icon' | 'full-width' | 'compact';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}
