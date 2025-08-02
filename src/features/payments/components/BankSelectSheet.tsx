import Image from 'next/image';
import React, { ComponentProps, memo } from 'react';

import { BANK_OPTIONS, BankOption } from '@/features/payments/constants/BankOptions';

import {
  overlayStyleMap,
  sheetStyleMap,
  dragHandleStyleMap,
  bankGridStyleMap,
  bankButtonStyleMap,
  bankImageStyleMap,
  bankLabelStyleMap,
} from './BankSelectSheet.styles';

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

export const BankSelectSheet = memo<BankSelectSheetProps>((props) => {
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
});

BankSelectSheet.displayName = 'BankSelectSheet';
