'use client';

import { Toaster as Sonner, ToasterProps } from 'sonner';

import { TOAST_CONFIG } from '@/constants/toast';
import { cn } from '@/lib/utils';

import { toasterVariants } from './SonnerVariants';

interface CustomToasterProps extends Omit<ToasterProps, 'theme'> {
  theme?: 'default' | 'light' | 'dark' | 'auto';
  className?: string;
}

const Toaster = ({ className, theme = 'default', ...props }: CustomToasterProps) => {
  return (
    <Sonner
      className={cn(toasterVariants({ theme }), className)}
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
        } as React.CSSProperties
      }
      position={TOAST_CONFIG.POSITION}
      expand={TOAST_CONFIG.EXPAND}
      richColors={TOAST_CONFIG.RICH_COLORS}
      closeButton={TOAST_CONFIG.CLOSE_BUTTON}
      {...props}
    />
  );
};

export { Toaster };
