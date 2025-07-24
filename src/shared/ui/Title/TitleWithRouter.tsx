'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import { Title } from './Title';
import type { TitleProps } from './Title.types';

export const TitleWithRouter: React.FC<TitleProps> = (props) => {
  const router = useRouter();

  const handleIconClick = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (props.onIconClick) {
        props.onIconClick(e);
      } else if (props.iconVariant === 'back') {
        router.back();
      }
    },
    [props, router],
  );

  return <Title {...props} onIconClick={handleIconClick} />;
};
