import type { VariantProps } from 'class-variance-authority';
import type * as React from 'react';

import type { badgeVariants } from './badgeVariants';
import { IconType } from '../Icons';

export interface BadgeProps
  extends React.ComponentProps<'span'>,
    VariantProps<typeof badgeVariants> {
  asChild?: boolean;
  showIcon?: boolean;
  icon?: IconType;
  children?: React.ReactNode;
  state?: BadgeState;
}

export type BadgeState = keyof typeof stateInfo;

export const stateInfo = {
  selling: {
    label: '판매중',
    icon: null,
    showDot: true,
  },
  sold: {
    label: '판매완료',
    icon: 'CircleCheck',
    showDot: false,
  },
  timeout: {
    label: '기간만료',
    icon: 'Hourglass',
    showDot: false,
  },
  reported: {
    label: '블라인드',
    icon: 'EyeOff',
    showDot: false,
  },
} as const;
