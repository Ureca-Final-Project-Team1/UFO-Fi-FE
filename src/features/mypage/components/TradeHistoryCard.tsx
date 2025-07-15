'use client';

import React from 'react';
import '@/styles/globals.css';

import { ICON_PATHS } from '@/constants/icons';
import { Badge } from '@/shared';
import { Icon } from '@/shared';

import { TradeHistoryCardProps } from '../types/TradeHistoryCard.types';

export const TradeHistoryCard = ({
  carrier,
  message,
  state,
  dataAmount,
  price,
}: TradeHistoryCardProps) => {
  return (
    <div className="relative w-full rounded-2xl px-4 py-3 text-white shadow-md overflow-hidden">
      <div
        className="absolute inset-0 w-full h-full rounded-2xl"
        style={{
          background: state === 'reported' ? 'var(--bg-trade-reported)' : 'var(--bg-trade-card)',
          opacity: 0.65,
        }}
      />
      <div
        className={`relative z-10 flex items-center justify-between w-full gap-3 ${
          state === 'reported' ? 'opacity-30' : 'opacity-100'
        }`}
      >
        <div className="flex items-start gap-2 w-full max-w-[70%]">
          {carrier && (
            <Icon
              src={ICON_PATHS[carrier as keyof typeof ICON_PATHS]}
              className="w-[16px] h-[13px] pt-1 shrink-0"
            />
          )}
          <div className="flex flex-col justify-center min-w-0 max-w-full">
            <span className="caption-12-semibold truncate text-white">
              {message || <span className="invisible">-</span>}
            </span>
            <span className="body-20-bold text-white">{dataAmount} GB</span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1 shrink-0">
          <Badge
            showIcon={true}
            state={state}
            className={`${state === 'reported' ? 'invisible' : ''}`}
          />
          <span
            className={`text-base body-20-bold ${
              state === 'timeout'
                ? 'text-white line-through'
                : state === 'reported'
                  ? 'text-gray-300'
                  : state
                    ? 'text-[var(--color-badge-text-cyan)]'
                    : 'text-gray-500'
            }`}
          >
            {state === 'sold' ? `+${price} ZET` : `${price} ZET`}
          </span>
        </div>
      </div>
    </div>
  );
};
