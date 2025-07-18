import { VariantProps } from 'class-variance-authority';
import React from 'react';

import { buttonVariants } from './buttonVariants';

// buttonVariants에서 자동으로 타입 추론
export type ButtonVariant = VariantProps<typeof buttonVariants>['variant'];
export type ButtonSize = VariantProps<typeof buttonVariants>['size'];

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}
