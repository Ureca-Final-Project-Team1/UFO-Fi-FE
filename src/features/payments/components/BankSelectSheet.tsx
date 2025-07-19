import Image from 'next/image';
import React from 'react';

import { BANK_OPTIONS, BankOption } from '@/features/payments/constants/BankOptions';

interface BankSelectSheetProps {
  isVisible: boolean;
  isOpen: boolean;
  dragTranslateY: number;
  onClose: () => void;
  onDragStart: (e: React.PointerEvent<HTMLDivElement>) => void;
  onDragMove: (e: React.PointerEvent<HTMLDivElement>) => void;
  onDragEnd: () => void;
  handleBankSelect: (bank: BankOption) => void;
}

export const BankSelectSheet: React.FC<BankSelectSheetProps> = ({
  isVisible,
  isOpen,
  dragTranslateY,
  onClose,
  onDragStart,
  onDragMove,
  onDragEnd,
  handleBankSelect,
}) => {
  if (!isVisible) return null;
  return (
    <>
      <div
        className={`fixed inset-0 bg-black/30 z-10 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <div
        className={`fixed left-0 right-0 bottom-14 z-20 bg-white/90 rounded-t-2xl p-6 flex flex-col items-center min-h-[320px] transition-transform duration-300 ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}
        style={{ transform: `translateY(${isOpen ? dragTranslateY : 0}px)` }}
      >
        <div
          className="w-12 h-1.5 bg-gray-300 rounded-full mb-6 cursor-pointer"
          onPointerDown={onDragStart}
          onPointerMove={onDragMove}
          onPointerUp={onDragEnd}
          onPointerLeave={onDragEnd}
          aria-label="시트 닫기"
        />
        <div className="grid grid-cols-3 gap-4 w-full max-w-[375px]">
          {BANK_OPTIONS.map((bank) => (
            <button
              key={bank.value}
              className="flex flex-col items-center justify-center h-20 rounded-xl bg-gray-100 hover:bg-gray-200 transition"
              onClick={() => handleBankSelect(bank)}
            >
              <Image
                src={bank.image}
                alt={bank.label}
                width={40}
                height={40}
                className="w-10 h-10 rounded-full mb-2 object-contain bg-white"
              />
              <span className="text-gray-800 text-sm font-semibold">{bank.label}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};
