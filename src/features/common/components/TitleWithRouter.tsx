'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import { Title } from '../../../shared/ui/Title/Title';
import type { TitleProps } from '../../../shared/ui/Title/Title.types';

export const TitleWithRouter: React.FC<TitleProps> = ({
  onIconClick,
  iconVariant,
  ...restProps
}) => {
  const router = useRouter();

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

  return <Title {...restProps} iconVariant={iconVariant} onIconClick={handleIconClick} />;
};
