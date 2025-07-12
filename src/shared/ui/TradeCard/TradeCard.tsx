'use client';

import Image from 'next/image';
import React from 'react';
import '@/styles/globals.css';

import { TradeCardProps } from './TradeCard.types';
import { Badge } from '../Badge';

export const TradeCard = ({ carrier, message, state, dataAmount, price }: TradeCardProps) => {
  return (
    <div
      className="relative w-full rounded-xl px-4 py-3 text-white shadow-md"
      style={{ background: 'var(--bg-trade-card)' }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Image src={`/images/${carrier}.png`} alt="통신사" width={16} height={13} />
          <span className="text-sm">{message}</span>
        </div>
        <Badge showIcon={true} state={state} />
      </div>

      <div className="mt-2 flex justify-between items-end">
        <div className="text-lg font-bold">{dataAmount} GB</div>
        <div className="text-(--color-badge-text-cyan) text-base font-semibold">{price} ZET</div>
      </div>
    </div>
  );
};
