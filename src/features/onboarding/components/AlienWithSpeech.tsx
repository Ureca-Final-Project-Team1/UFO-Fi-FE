'use client';
import React from 'react';

import { SpeechBubble } from '@/shared';

import { AlienCharacter } from './AlienCharacter';

export const AlienWithSpeech = ({ message }: { message: string }) => (
  <div className="w-full h-full flex justify-between items-center gap-6 z-40 relative px-4">
    <div className="flex-6 flex justify-end">
      <SpeechBubble tailDirection="right" size="md" className="max-w-xs">
        {message}
      </SpeechBubble>
    </div>
    <div className="flex-4">
      <AlienCharacter />
    </div>
  </div>
);
