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

      case 'signal':
        return (
          <div className="flex flex-col items-center mb-6">
            {/* 위성 + 파동 + 점 */}
            <div className="relative">
              <div className="flex flex-col items-center justify-center">
                {/* 메인 위성 이미지 */}
                <Image
                  src={IMAGE_PATHS.AVATAR}
                  alt="신호 수신 중..."
                  width={size === 'sm' ? 40 : size === 'md' ? 80 : 120}
                  height={size === 'sm' ? 40 : size === 'md' ? 80 : 120}
                  className="mx-auto animate-pulse"
                  priority
                />

                {/* 신호 파동 효과 */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className={cn(
                      'border-2 border-cyan-400 rounded-full animate-ping opacity-60',
                      size === 'sm'
                        ? 'w-10 h-10'
                        : size === 'md'
                          ? 'w-20 h-20'
                          : 'w-[120px] h-[120px]',
                    )}
                  />
                  <div
                    className={cn(
                      'absolute border-2 border-purple-400 rounded-full animate-ping opacity-40',
                      size === 'sm' ? 'w-8 h-8' : size === 'md' ? 'w-16 h-16' : 'w-[96px] h-[96px]',
                    )}
                    style={{ animationDelay: '0.5s' }}
                  />
                  <div
                    className={cn(
                      'absolute border-2 border-indigo-400 rounded-full animate-ping opacity-30',
                      size === 'sm' ? 'w-6 h-6' : size === 'md' ? 'w-12 h-12' : 'w-[72px] h-[72px]',
                    )}
                    style={{ animationDelay: '1s' }}
                  />
                </div>

                {/* 신호 점들 */}
                <div className="absolute -top-2 -right-2">
                  <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce" />
                </div>
                <div className="absolute -bottom-2 -left-2">
                  <div
                    className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                    style={{ animationDelay: '0.3s' }}
                  />
                </div>
                <div className="absolute top-0 left-0">
                  <div
                    className="w-[6px] h-[6px] bg-indigo-400 rounded-full animate-bounce"
                    style={{ animationDelay: '0.6s' }}
                  />
                </div>
              </div>
            </div>

            {/* 신호 바 효과 */}
            <div className="flex items-end space-x-1 mt-4 justify-center">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-2 bg-gradient-to-t from-cyan-500 to-purple-500 rounded-sm animate-pulse"
                  style={{
                    height: `${8 + i * 4}px`,
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div className="relative">
            <Image
              src={IMAGE_PATHS.AL_SUCCESS}
              alt="로딩 중..."
              width={size === 'sm' ? 36 : size === 'md' ? 64 : 128}
              height={size === 'sm' ? 36 : size === 'md' ? 64 : 128}
              className={cn('mx-auto animate-bounce')}
              priority
            />
            <div className="absolute -top-1 -right-1 size-3 bg-cyan-400 rounded-full animate-ping opacity-75" />
            <div
              className="absolute -bottom-1 -left-1 size-2 bg-purple-400 rounded-full animate-ping opacity-75"
              style={{ animationDelay: '0.5s' }}
            />
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
