'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import { Title } from './Title';
import type { TitleProps } from './Title.types';

export const TitleWithRouter: React.FC<TitleProps> = (props) => {
  const router = useRouter();
  const { onIconClick, iconVariant } = props;

  const handleIconClick = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (onIconClick) {
        onIconClick(e);
      } else if (iconVariant === 'back') {
        router.back();
      }
    },
    [onIconClick, iconVariant, router],
  );

  return <Title {...props} onIconClick={handleIconClick} />;
};
