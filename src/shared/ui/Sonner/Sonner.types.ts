import type { VariantProps } from 'class-variance-authority';

import {
  toasterVariants,
  toasterStyleVariants,
  toastVariants,
  toastActionVariants,
  toastCloseVariants,
  toastIconVariants,
} from './SonnerVariants';

// Toaster Props
export interface ToasterProps {
  className?: string;
  theme?: VariantProps<typeof toasterVariants>['theme'];
  position?: VariantProps<typeof toasterVariants>['position'];
  expand?: VariantProps<typeof toasterVariants>['expand'];
  richColors?: VariantProps<typeof toasterVariants>['richColors'];
  closeButton?: VariantProps<typeof toasterVariants>['closeButton'];
  styleVariant?: VariantProps<typeof toasterStyleVariants>['theme'];
  styleType?: VariantProps<typeof toasterStyleVariants>['variant'];
  customStyle?: React.CSSProperties;
  // Sonner의 기본 props들
  duration?: number;
  maxToasts?: number;
  offset?: string | number;
  hotkey?: string[];
  invert?: boolean;
  visibleToasts?: number;
}

// Toast Props
export interface ToastProps {
  message: string;
  className?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
  dismissible?: boolean;
  type?: VariantProps<typeof toastVariants>['type'];
  size?: VariantProps<typeof toastVariants>['size'];
}

// Toast Action Props
export interface ToastActionProps extends VariantProps<typeof toastActionVariants> {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

// Toast Close Props
export interface ToastCloseProps extends VariantProps<typeof toastCloseVariants> {
  onClick?: () => void;
  className?: string;
  'aria-label'?: string;
}

// Toast Icon Props
export interface ToastIconProps extends VariantProps<typeof toastIconVariants> {
  icon?: React.ReactNode;
  className?: string;
}

// Toast Configuration
export interface ToastConfig {
  position:
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right';
  expand: boolean;
  richColors: boolean;
  closeButton: boolean;
  theme: 'default' | 'light' | 'dark' | 'auto';
  duration: number;
  maxToasts: number;
}

// Toast Message Types
export type ToastType = 'default' | 'success' | 'error' | 'warning' | 'info' | 'loading';

// Toast Position Types
export type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

// Toast Theme Types
export type ToastTheme = 'default' | 'light' | 'dark' | 'auto' | 'custom';
