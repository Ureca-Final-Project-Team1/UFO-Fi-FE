'use client';

import Image from 'next/image';

import { IMAGE_PATHS } from '@/constants';
import { cn } from '@/lib/utils';

interface SignalLoadingProps {
  message?: string;
  className?: string;
}

export function SignalLoading({
  message = '우주 신호를 수신하고 있어요...',
  className,
}: SignalLoadingProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center p-8 text-center', className)}>
      <div className="relative mb-6">
        {/* 메인 위성 이미지 */}
        <Image
          src={IMAGE_PATHS.DATA_CUBE}
          alt="신호 수신 중..."
          width={80}
          height={80}
          className="mx-auto animate-pulse"
          priority
        />

        {/* 신호 파동 효과 */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 border-2 border-cyan-400 rounded-full animate-ping opacity-60" />
          <div
            className="absolute w-16 h-16 border-2 border-purple-400 rounded-full animate-ping opacity-40"
            style={{ animationDelay: '0.5s' }}
          />
          <div
            className="absolute w-12 h-12 border-2 border-indigo-400 rounded-full animate-ping opacity-30"
            style={{ animationDelay: '1s' }}
          />
        </div>

        {/* 신호 점들 */}
        <div className="absolute -top-2 -right-2">
          <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce" />
        </div>
        <div className="absolute -bottom-2 -left-2" style={{ animationDelay: '0.3s' }}>
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" />
        </div>
        <div className="absolute top-0 left-0" style={{ animationDelay: '0.6s' }}>
          <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" />
        </div>
      </div>

      {/* 로딩 메시지 */}
      <p className="text-gray-300 text-sm font-medium animate-pulse">{message}</p>

      {/* 신호 바 효과 */}
      <div className="flex items-end space-x-1 mt-4">
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
}
