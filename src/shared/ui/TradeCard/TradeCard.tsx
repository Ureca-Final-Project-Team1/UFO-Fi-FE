'use client';

import Image from 'next/image';
import React from 'react';

import { TradeCardProps } from './TradeCard.types';
import { Badge } from '../Badge';

export const TradeCard = ({ carrier, message, state, dataAmount, price }: TradeCardProps) => {
  return (
    <div className="relative w-full rounded-xl bg-gradient-to-br from-[#313564] to-[#2A2E56] px-4 py-3 text-white shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Image src={`/images/${carrier}.png`} alt="통신사" width={16} height={13} />
          <span className="text-sm">{message}</span>
        </div>
        <Badge state={state} />
      </div>

      <div className="mt-2 flex justify-between items-end">
        <div className="text-lg font-bold">{dataAmount} GB</div>
        <div className="text-(--color-badge-text-cyan) text-base font-semibold">{price} ZET</div>
      </div>
    </div>
  );
};
