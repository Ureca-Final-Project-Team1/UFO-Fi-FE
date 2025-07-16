import React from 'react';

interface NumberButtonProps {
  number: number;
  onClick: (number: number) => void;
  disabled?: boolean;
}

export default function NumberButton({ number, onClick, disabled = false }: NumberButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onClick(number)}
      className={`w-16 h-16 rounded-full text-white text-2xl font-bold flex items-center justify-center
        bg-transparent hover:bg-gray-700 transition-colors border border-gray-600
        ${disabled ? 'opacity-40 cursor-not-allowed' : ''}`}
    >
      {number}
    </button>
  );
}
