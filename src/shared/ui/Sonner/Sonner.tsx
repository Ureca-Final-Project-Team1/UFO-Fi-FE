'use client';

import { Toaster as Sonner } from 'sonner';

import { cn } from '@/lib/utils';

import { SonnerProps } from './Sonner.types';
import { sonnerVariants, sonnerStyleVariants, sonnerConfigVariants } from './SonnerVariants';

const Toaster = ({
  variant = 'default',
  position = 'bottom-center',
  className,
  ...props
}: SonnerProps) => {
  const configVariant = variant as keyof typeof sonnerConfigVariants;
  const styleVariant = variant as keyof typeof sonnerStyleVariants;

  return (
    <Sonner
      className={cn(sonnerVariants({ variant, position }), className)}
      style={sonnerStyleVariants[styleVariant] as React.CSSProperties}
      position={position}
      expand={sonnerConfigVariants[configVariant].expand}
      richColors={sonnerConfigVariants[configVariant].richColors}
      closeButton={sonnerConfigVariants[configVariant].closeButton}
      {...props}
    />
  );
};

export { Toaster };
