import React from 'react';

interface SpeechBubbleProps {
  children: React.ReactNode;
  tailDirection?: 'top' | 'bottom' | 'left' | 'right';
  tailColor?: string;
  className?: string;
}

export const SpeechBubble = ({
  children,
  tailDirection = 'bottom',
  tailColor = '#fff',
  className = '',
}: SpeechBubbleProps) => {
  // 꼬리 방향별 스타일
  const tail = {
    bottom: (
      <div
        className="absolute left-1/2 top-full -translate-x-1/2 mt-[-2px] z-10"
        style={{ pointerEvents: 'none' }}
      >
        <div
          className="w-0 h-0"
          style={{
            borderLeft: '12px solid transparent',
            borderRight: '12px solid transparent',
            borderTop: `16px solid ${tailColor}`,
          }}
        />
      </div>
    ),
    top: (
      <div
        className="absolute left-1/2 bottom-full -translate-x-1/2 mb-[-2px] z-10"
        style={{ pointerEvents: 'none' }}
      >
        <div
          className="w-0 h-0"
          style={{
            borderLeft: '12px solid transparent',
            borderRight: '12px solid transparent',
            borderBottom: `16px solid ${tailColor}`,
          }}
        />
      </div>
    ),
    left: (
      <div
        className="absolute top-1/2 right-full -translate-y-1/2 mr-[-2px] z-10"
        style={{ pointerEvents: 'none' }}
      >
        <div
          className="w-0 h-0"
          style={{
            borderTop: '12px solid transparent',
            borderBottom: '12px solid transparent',
            borderRight: `16px solid ${tailColor}`,
          }}
        />
      </div>
    ),
    right: (
      <div
        className="absolute top-1/2 left-full -translate-y-1/2 ml-[-2px] z-10"
        style={{ pointerEvents: 'none' }}
      >
        <div
          className="w-0 h-0"
          style={{
            borderTop: '12px solid transparent',
            borderBottom: '12px solid transparent',
            borderLeft: `16px solid ${tailColor}`,
          }}
        />
      </div>
    ),
  };

  return (
    <div
      className={`relative bg-white text-black p-5 rounded-2xl max-w-[280px] shadow-2xl border-2 border-gray-100 ${className}`}
    >
      <p className="text-sm font-medium leading-relaxed whitespace-pre-line m-0">{children}</p>
      {tail[tailDirection]}
    </div>
  );
};
