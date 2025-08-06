'use client';
import React from 'react';

import { SpeechBubble } from '@/shared';

import { AlienCharacter } from './AlienCharacter';

interface AlienWithSpeechProps {
  title: string;
  message: string;
  tailDirection?: 'left' | 'right';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const DEFAULT_BUBBLE_STYLE = 'max-w-xs text-sm';

export const AlienWithSpeech = ({
  title,
  message,
  tailDirection = 'right',
  size = 'md',
  className = '',
}: AlienWithSpeechProps) => {
  return (
    <div
      className={`w-full h-full flex justify-between items-center gap-6 relative px-4 z-40 ${className}`}
    >
      {/* 말풍선 */}
      <div className="flex-1 flex justify-end">
        <SpeechBubble tailDirection={tailDirection} size={size} className={DEFAULT_BUBBLE_STYLE}>
          <div className="flex flex-col gap-3">
            <p className="font-bold text-[15px]">{title}</p>
            <p className="text-sm">{message}</p>
          </div>
        </SpeechBubble>
      </div>

      {/* 외계인 캐릭터 */}
      <div className="flex-1">
        <AlienCharacter />
      </div>
    </div>
  );
};
