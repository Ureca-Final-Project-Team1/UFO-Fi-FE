'use client';
import React from 'react';

export const SpeechBubble = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative bg-white text-black p-5 rounded-2xl max-w-[280px] shadow-2xl border-2 border-gray-100">
      <p className="text-sm font-medium leading-relaxed whitespace-pre-line">{children}</p>
      <div className="absolute top-1/2 left-full -translate-y-1/2 ml-[-2px]">
        <div className="w-0 h-0 border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent border-l-[16px] border-l-white" />
      </div>
    </div>
  );
};
