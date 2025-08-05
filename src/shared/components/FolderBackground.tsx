'use client';

import clsx from 'clsx';
import React from 'react';

import { Icon } from '../ui';

interface FolderBackgroundProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export const FolderBackground: React.FC<FolderBackgroundProps> = ({
  children,
  title,
  className = '',
}) => {
  return (
    <div className={clsx('relative w-[358px] h-[581px]', className)}>
      <svg
        viewBox="0 0 358 581"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute w-full h-full"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="folderGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#7CC2EF" stopOpacity="0.65" />
            <stop offset="56%" stopColor="#485BAC" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#7F6FC3" stopOpacity="0.65" />
          </linearGradient>
        </defs>
        <path
          d="M 20 0 H 141 C 150 0, 158 8, 158 17 V 40 C 158 49, 165 57, 175 57 H 338 C 348 57, 356 65, 356 74 V 561 C 356 571, 348 579, 338 579 H 20 C 9 579, 2 571, 2 561 V 18 C 2 8, 10 0, 20 0 Z"
          fill="url(#folderGradient)"
        />
      </svg>

      {title && (
        <div
          className="absolute z-20 gap-1"
          style={{
            left: '2%',
            top: '2%',
            width: '42%',
            height: '7%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}
        >
          <Icon name="FilePenLine" className="text-white mr-1" />
          <h2 className="text-white body-16-medium drop-shadow">{title}</h2>
        </div>
      )}

      <div className="absolute inset-0 z-10 px-4 pt-24 pb-6">{children}</div>
    </div>
  );
};
