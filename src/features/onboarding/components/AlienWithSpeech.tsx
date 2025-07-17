'use client';
import React from 'react';

import { SpeechBubble } from '@/features/main/components/SpeechBubble';

import { AlienCharacter } from './AlienCharacter';

export const AlienWithSpeech = ({ message }: { message: string }) => (
  <div className="flex justify-between items-end gap-6 z-40 relative min-w-full px-4">
    <div className="flex-1 flex justify-end">
      <SpeechBubble>{message}</SpeechBubble>
    </div>
    <div className="w-[100px]">
      <AlienCharacter />
    </div>
  </div>
);
