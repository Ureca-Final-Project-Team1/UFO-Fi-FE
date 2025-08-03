import React from 'react';

import { cn } from '@/lib/utils';

interface AvatarProps {
  size?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
  className?: string;
  variant?: 'default' | 'selling';
}

export const Avatar: React.FC<AvatarProps> = ({
  size = 'md',
  children,
  className = '',
  variant = 'default',
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'size-12',
    lg: 'w-16 h-16',
  };

  const variantClasses = {
    default: 'bg-gray-200',
    selling:
      'bg-gradient-to-br from-purple-400/30 to-indigo-500/30 border border-purple-300/30 backdrop-blur-sm',
  };

  return (
    <div
      className={cn(
        sizeClasses[size],
        variantClasses[variant],
        'rounded-full flex items-center justify-center',
        className,
      )}
    >
      {children}
    </div>
  );
};

Avatar.displayName = 'Avatar';
