import Image from 'next/image';

import { IMAGE_PATHS } from '@/constants';
import { cn } from '@/lib/utils';

import type { LoadingProps } from './Loading.types';
import {
  loadingContainerVariants,
  loadingSpinnerVariants,
  loadingDotsVariants,
  loadingMessageVariants,
} from './Loading.variants';

export function Loading({
  variant = 'default',
  size = 'md',
  message = '로딩 중...',
  className,
  fullScreen = false,
  showMessage = true,
}: LoadingProps) {
  const containerClasses = cn(loadingContainerVariants({ fullScreen, variant }), className);

  const renderLoadingIcon = () => {
    switch (variant) {
      case 'spinner':
        return <div className={loadingSpinnerVariants({ size })} />;

      case 'dots':
        return (
          <div className="flex space-x-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={loadingDotsVariants({ size })}
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        );

      case 'pulse':
        return (
          <div
            className={cn(
              'bg-cyan-400 rounded-full animate-pulse',
              loadingSpinnerVariants({ size }),
            )}
          />
        );

      default:
        return (
          <div className="text-center">
            <div className="relative mb-4">
              <Image
                src={IMAGE_PATHS.AL_SUCCESS}
                alt="로딩 중..."
                width={size === 'sm' ? 24 : size === 'md' ? 64 : 128}
                height={size === 'sm' ? 24 : size === 'md' ? 64 : 128}
                className={cn('mx-auto animate-bounce')}
                priority
              />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full animate-ping opacity-75" />
              <div
                className="absolute -bottom-1 -left-1 w-2 h-2 bg-purple-400 rounded-full animate-ping opacity-75"
                style={{ animationDelay: '0.5s' }}
              />
            </div>
          </div>
        );
    }
  };

  return (
    <div className={containerClasses}>
      {renderLoadingIcon()}
      {showMessage && <span className={loadingMessageVariants({ size })}>{message}</span>}
    </div>
  );
}
