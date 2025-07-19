import React from 'react';

interface PasswordInputProps {
  value: string;
  maxLength: number;
  showDots?: boolean;
}

export default function PasswordInput({ value, maxLength, showDots = true }: PasswordInputProps) {
  return (
    <div className="flex justify-center gap-4">
      {Array.from({ length: maxLength }).map((_, idx) => (
        <span
          key={idx}
          className={`w-5 h-5 rounded-full border-2 transition-colors ${
            idx < value.length ? 'bg-white border-white' : 'bg-transparent border-white/40'
          }`}
        >
          {!showDots && idx < value.length ? value[idx] : null}
        </span>
      ))}
    </div>
  );
}
