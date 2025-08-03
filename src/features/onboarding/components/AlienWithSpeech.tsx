'use client';
import React from 'react';

import { SpeechBubble } from '@/shared';

import { AlienCharacter } from './AlienCharacter';

export const AlienWithSpeech = ({ message }: { message: string }) => (
  <div className="w-full h-full flex justify-between items-start gap-6 z-40 relative px-4">
    <div className="flex-1 flex justify-end">
      <SpeechBubble tailDirection="right" size="md" className="max-w-xs text-sm">
        {message}
      </SpeechBubble>
    </div>
    <div className="flex-1">
      <AlienCharacter />
    </div>
  </div>
);
