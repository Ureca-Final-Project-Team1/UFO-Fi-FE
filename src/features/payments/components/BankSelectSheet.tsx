import Image from 'next/image';
import React, { ComponentProps } from 'react';

import { BANK_OPTIONS, BankOption } from '@/features/payments/constants/BankOptions';

type BankSelectSheetProps = ComponentProps<'div'> & {
  isVisible?: boolean;
  isOpen?: boolean;
  dragTranslateY?: number;
  onClose?: () => void;
  onDragStart?: (e: React.PointerEvent<HTMLDivElement>) => void;
  onDragMove?: (e: React.PointerEvent<HTMLDivElement>) => void;
  onDragEnd?: () => void;
  handleBankSelect?: (bank: BankOption) => void;
};

// 조건부 스타일링을 위한 객체들
const overlayStyleMap = {
  base: 'fixed inset-0 bg-black/30 z-10 transition-opacity duration-300',
  open: 'opacity-100',
  closed: 'opacity-0 pointer-events-none',
};

const sheetStyleMap = {
  base: 'fixed left-0 right-0 bottom-14 z-20 bg-white/90 rounded-t-2xl p-6 flex flex-col items-center min-h-[320px] transition-transform duration-300',
  open: 'translate-y-0',
  closed: 'translate-y-full',
};

const dragHandleStyleMap = {
  base: 'w-12 h-1.5 bg-gray-300 rounded-full mb-6 cursor-pointer',
};

const bankGridStyleMap = {
  base: 'grid grid-cols-3 gap-4 w-full max-w-[375px]',
};

const bankButtonStyleMap = {
  base: 'flex flex-col items-center justify-center h-20 rounded-xl bg-gray-100 hover:bg-gray-200 transition',
};

const bankImageStyleMap = {
  base: 'size-10 rounded-full mb-2 object-contain bg-white',
};

const bankLabelStyleMap = {
  base: 'text-gray-800 text-sm font-semibold',
};

export const BankSelectSheet: React.FC<BankSelectSheetProps> = (props) => {
  const {
    isVisible = false,
    isOpen = false,
    dragTranslateY = 0,
    onClose = () => {},
    onDragStart = () => {},
    onDragMove = () => {},
    onDragEnd = () => {},
    handleBankSelect = () => {},
    ...rest
  } = props;

  if (!isVisible) return null;
  return (
    <>
      <div
        className={`${overlayStyleMap.base} ${isOpen ? overlayStyleMap.open : overlayStyleMap.closed}`}
        onClick={onClose}
      />
      <div
        className={`${sheetStyleMap.base} ${isOpen ? sheetStyleMap.open : sheetStyleMap.closed}`}
        style={{ transform: `translateY(${isOpen ? dragTranslateY : 0}px)` }}
        {...rest}
      >
        <div
          className={dragHandleStyleMap.base}
          onPointerDown={onDragStart}
          onPointerMove={onDragMove}
          onPointerUp={onDragEnd}
          onPointerLeave={onDragEnd}
          aria-label="시트 닫기"
        />
        <div className={bankGridStyleMap.base}>
          {BANK_OPTIONS.map((bank) => (
            <button
              key={bank.value}
              className={bankButtonStyleMap.base}
              onClick={() => handleBankSelect(bank)}
            >
              <Image
                src={bank.image}
                alt={bank.label}
                width={40}
                height={40}
                className={bankImageStyleMap.base}
              />
              <span className={bankLabelStyleMap.base}>{bank.label}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};
