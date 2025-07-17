'use client';

import React from 'react';

export type SpeechBubbleProps = {
  children: React.ReactNode;
  tailDirection?: 'left' | 'right' | 'top' | 'bottom';
};

export const SpeechBubble = ({ children, tailDirection = 'left' }: SpeechBubbleProps) => {
  return (
    <div className="relative bg-white text-black p-5 rounded-2xl max-w-[280px] shadow-2xl border-2 border-gray-100">
      <p className="text-sm font-medium leading-relaxed whitespace-pre-line">{children}</p>
      {tailDirection === 'left' && (
        <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2">
          {/* 바깥 테두리 (얇게) */}
          <div className="w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-l-[14px] border-l-gray-100 absolute left-[2px] top-0 z-0" />
          {/* 안쪽 꼬리 (더 크게) */}
          <div className="w-0 h-0 border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent border-l-[16px] border-l-white relative z-10 -ml-[2px]" />
        </div>
      )}
      {tailDirection === 'right' && (
        <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2">
          <div className="w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-r-[14px] border-r-gray-100 absolute right-[2px] top-0 z-0" />
          <div className="w-0 h-0 border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent border-r-[16px] border-r-white relative z-10 -mr-[2px]" />
        </div>
      )}
      {tailDirection === 'top' && (
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
          <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[14px] border-b-gray-100 absolute top-[2px] left-0 z-0" />
          <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[16px] border-b-white relative z-10 -mt-[2px]" />
        </div>
      )}
      {tailDirection === 'bottom' && (
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2">
          <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[14px] absolute bottom-[2px] left-0 z-0" />
          <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[16px] border-t-white relative z-10 -mb-[2px]" />
        </div>
      )}
    </div>
  );
};
