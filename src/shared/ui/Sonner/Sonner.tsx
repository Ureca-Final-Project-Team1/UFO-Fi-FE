'use client';

import { Toaster as Sonner, ToasterProps } from 'sonner';

import { TOAST_CONFIG } from '@/constants';

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
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
