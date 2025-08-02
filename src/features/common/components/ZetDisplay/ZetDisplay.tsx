import React, { ComponentProps } from 'react';

import { sizeVariants, unitVariants } from './ZetDisplayVariants';

type ZetDisplayProps = ComponentProps<'span'> & {
  amount?: number;
  showUnit?: boolean;
  size?: 'sm' | 'md' | 'lg';
};

export const formatZetAmount = (amount: number): string => {
  if (amount >= 99999) {
    return '99,999+';
  }
  return amount.toLocaleString();
};

export const ZetDisplay: React.FC<ZetDisplayProps> = (props) => {
  const { amount = 0, showUnit = true, size = 'md', ...rest } = props;

  const formattedAmount = formatZetAmount(amount);

  return (
    <span className={`${sizeVariants({ size })} ${rest.className || ''}`} {...rest}>
      {formattedAmount}
      {showUnit && <span className={unitVariants()}>ZET</span>}
    </span>
  );
};
